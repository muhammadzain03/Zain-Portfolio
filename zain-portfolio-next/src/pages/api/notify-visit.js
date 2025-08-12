// api/notify-visit
// Purpose: Fire-and-forget server endpoint to email a notification when a visitor opens the portfolio.
// Note: Requires SMTP credentials via env vars. This route responds quickly to avoid impacting UX.

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  // Basic bot/misuse guard (very lightweight)
  const ua = req.headers['user-agent'] || '';
  const referer = req.headers['referer'] || '';
  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  const { path, tz, lang } = (req.body || {});

  // Respond ASAP to keep Lighthouse fast
  res.status(200).json({ ok: true });

  // Skip sending if SMTP not configured
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_TO = 'muhammadzain0476@gmail.com',
  } = process.env;
  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: Number(EMAIL_PORT) === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const subject = `Portfolio opened${path ? `: ${path}` : ''}`;
    const text = [
      `A visitor opened your portfolio.`,
      `Path: ${path || '/'}
Referer: ${referer}
IP: ${ip}
User-Agent: ${ua}
Timezone: ${tz || 'unknown'}
Language: ${lang || 'unknown'}
Time: ${new Date().toISOString()}`,
    ].join('\n\n');

    await transporter.sendMail({
      from: `Portfolio Notifier <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject,
      text,
    });
  } catch (_) {
    // Silent fail — never affect user experience
  }
}


