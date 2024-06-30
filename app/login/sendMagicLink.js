import { NextResponse } from 'next/server';
import { connectToDatabase } from '../mongodb/connect';
import Account from '../mongodb/accountModel';
import { sendMail } from '../mailgun/sendMail';
import crypto from 'crypto';

export async function sendMagicLink(email) {
  await connectToDatabase();

  const account = await Account.findOne({ email });
  if (!account) {
    return { success: false, message: 'Email not found' };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/login/verify?token=${token}`;

  account.loginToken = token;
  account.tokenExpiry = Date.now() + 3600000; // Token expiry set to 1 hour
  await account.save();

  const emailContent = {
    from: 'YourApp <no-reply@yourapp.com>',
    to: email,
    subject: 'Your Magic Link',
    text: `Click the link to login: ${magicLink}`
  };

  await sendMail(emailContent);

  return { success: true };
}
