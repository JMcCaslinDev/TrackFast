import mailgun from 'mailgun-js';

const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

export async function sendMail(email, magicLink) {
  const data = {
    from: 'YourApp <no-reply@yourapp.com>',
    to: email,
    subject: 'Your Magic Link',
    text: `Click the link to login: ${magicLink}`
  };

  await mg.messages().send(data);
}
