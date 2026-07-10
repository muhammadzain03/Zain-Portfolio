// api/send-resume
// Purpose: Handle resume request submissions and send resume via email
// This endpoint validates the email and sends the resume PDF as an attachment

import nodemailer from 'nodemailer';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function loadResumeBuffer(req) {
  const fileName = 'Muhammad-Zain-Resume.pdf';
  const candidates = [
    join(process.cwd(), 'public', fileName),
    join(process.cwd(), fileName),
    join(process.cwd(), '.next', 'server', 'public', fileName),
  ];

  for (const filePath of candidates) {
    try {
      if (existsSync(filePath)) {
        return readFileSync(filePath);
      }
    } catch (_) {
      // Try next candidate
    }
  }

  // Vercel serverless functions often cannot read public/ from disk.
  // Fall back to fetching the statically served PDF over HTTPS.
  const proto = (req.headers['x-forwarded-proto'] || 'https').toString().split(',')[0].trim();
  const host = (
    req.headers['x-forwarded-host'] ||
    req.headers.host ||
    'muhammadzain.app'
  )
    .toString()
    .split(',')[0]
    .trim();

  const resumeUrl = `${proto}://${host}/${fileName}`;
  const response = await fetch(resumeUrl);

  if (!response.ok) {
    throw new Error(`Unable to load resume PDF from ${resumeUrl} (${response.status})`);
  }

  return Buffer.from(await response.arrayBuffer());
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ ok: false, error: 'Name and email are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address' });
  }

  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
  } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
    return res.status(500).json({
      ok: false,
      error: 'Email service not configured. Please try downloading directly.',
    });
  }

  try {
    const port = Number(EMAIL_PORT);
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    const resumeBuffer = await loadResumeBuffer(req);
    const safeName = escapeHtml(name.trim());

    await transporter.sendMail({
      from: `Muhammad Zain <${EMAIL_USER}>`,
      to: email,
      subject: 'Muhammad Zain - Resume',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #B63E96 0%, #58E6D9 100%);
                color: white;
                padding: 30px;
                border-radius: 10px;
                text-align: center;
                margin-bottom: 30px;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 10px;
                margin-bottom: 20px;
              }
              .footer {
                text-align: center;
                color: #666;
                font-size: 14px;
                padding: 20px;
              }
              a {
                color: #B63E96;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Thank You, ${safeName}!</h1>
            </div>
            <div class="content">
              <p>Hi ${safeName},</p>
              <p>Thank you for your interest in my profile! I've attached my resume to this email for your review.</p>
              <p>I'm a Software Engineering student at the University of Calgary with a passion for building innovative solutions. Feel free to reach out if you'd like to discuss potential opportunities or collaborations.</p>
              <p><strong>Connect with me:</strong></p>
              <ul>
                <li>Email: <a href="mailto:muhammadzain0476@gmail.com">muhammadzain0476@gmail.com</a></li>
                <li>Portfolio: <a href="https://muhammadzain.app/">View my work</a></li>
              </ul>
            </div>
            <div class="footer">
              <p>Best regards,<br><strong>Muhammad Zain</strong></p>
              <p>Software Engineering Student | University of Calgary</p>
            </div>
          </body>
        </html>
      `,
      text: `
Hi ${name.trim()},

Thank you for your interest in my profile! I've attached my resume to this email for your review.

I'm a Software Engineering student at the University of Calgary with a passion for building innovative solutions. Feel free to reach out if you'd like to discuss potential opportunities or collaborations.

Connect with me:
- Email: muhammadzain0476@gmail.com
- Portfolio: https://muhammadzain.app/

Best regards,
Muhammad Zain
Software Engineering Student | University of Calgary
      `,
      attachments: [
        {
          filename: 'Muhammad-Zain-Resume.pdf',
          content: resumeBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    try {
      await transporter.sendMail({
        from: `Portfolio System <${EMAIL_USER}>`,
        to: 'muhammadzain0476@gmail.com',
        subject: `Resume Request from ${name.trim()}`,
        text: `
Someone requested your resume!

Name: ${name.trim()}
Email: ${email}
Time: ${new Date().toISOString()}
        `,
      });
    } catch (_) {
      // Silent fail for notification
    }

    return res.status(200).json({
      ok: true,
      message: 'Resume sent successfully! Please check your email.',
    });
  } catch (error) {
    console.error('Error sending resume:', error?.message || error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to send resume. Please try again later.',
      // Temporary diagnostic detail for production debugging (remove after fix)
      detail: error?.message || String(error),
      code: error?.code || null,
    });
  }
}
