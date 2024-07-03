'use server';

import { connectToDatabase } from '../../mongodb/api/connect';
import Account from '../../mongodb/accountModel';
import { sendMail } from '../../mailgun/api/sendMail';
import crypto from 'crypto';

export async function sendMagicLink(email) {
  await connectToDatabase();

  const account = await Account.findOne({ email });

  if (account) {
    const token = crypto.randomBytes(32).toString('hex');
    const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/login/api/verify?token=${token}`;

    account.loginToken = token;
    account.tokenExpiry = Date.now() + (900*1000); // Token expiry set to 900 seconds * 1000 milliseconds its tracked in
    await account.save();

    const emailContent = {
      from: 'TrackFast <no-reply@TrackFast.io>',
      to: email,
      subject: 'Your TrackFast Magic Link!',
      text: `Click the link to login: ${magicLink}`
    };

    await sendMail(emailContent);
  }

  // Always return a generic success message regardless of whether the email was found or not
  return { success: true, message: 'If an account with that email exists, a magic link has been sent.' };
}
