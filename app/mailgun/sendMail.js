import mailgun from 'mailgun-js';

const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

export async function sendMail(emailContent) {
  await mg.messages().send(emailContent);
}
