// api/send-resume
// Purpose: Handle resume request submissions and send resume via email
// This endpoint validates the email and sends the resume PDF as an attachment

import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const { name, email } = req.body || {};

  // Validation
  if (!name || !email) {
    return res.status(400).json({ ok: false, error: 'Name and email are required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address' });
  }

  // Check for SMTP configuration
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
  } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
    return res.status(500).json({ 
      ok: false, 
      error: 'Email service not configured. Please try downloading directly.' 
    });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: Number(EMAIL_PORT) === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Read the resume PDF file
    const resumePath = join(process.cwd(), 'public', 'Muhammad-Zain-Resume.pdf');
    const resumeBuffer = readFileSync(resumePath);

    // Send email with resume attachment
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
              <h1>Thank You, ${name}!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
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
Hi ${name},

Thank you for your interest in my profile! I've attached my resume to this email for your review.

I'm a Software Engineering student at the University of Calgary with a passion for building innovative solutions. Feel free to reach out if you'd like to discuss potential opportunities or collaborations.

Connect with me:
- Email: muhammad.zain1@ucalgary.ca
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

    // Optionally notify yourself of the resume request
    try {
      await transporter.sendMail({
        from: `Portfolio System <${EMAIL_USER}>`,
        to: 'muhammadzain0476@gmail.com',
        subject: `Resume Request from ${name}`,
        text: `
Someone requested your resume!

Name: ${name}
Email: ${email}
Time: ${new Date().toISOString()}
        `,
      });
    } catch (_) {
      // Silent fail for notification
    }

    return res.status(200).json({ 
      ok: true, 
      message: 'Resume sent successfully! Please check your email.' 
    });

  } catch (error) {
    console.error('Error sending resume:', error);
    return res.status(500).json({ 
      ok: false, 
      error: 'Failed to send resume. Please try again later.' 
    });
  }
}

