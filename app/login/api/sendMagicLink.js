'use server';

import { connectToDatabase } from '../../mongodb/api/connect';
import Account from '../../mongodb/accountModel';
import { sendMail } from '../../mailgun/api/sendMail';
import crypto from 'crypto';

export async function sendMagicLink(email) {
  await connectToDatabase();

  const account = await Account.findOne({ email });
  if (!account) {
    return { success: false, message: 'Email not found' };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/login/api/verify?token=${token}`;

  account.loginToken = token;
  let numberOfHours = process.env.numberOfHoursForAuthExpiry;
  account.tokenExpiry = Date.now() + (3600000 * numberOfHours); // Token expiry set to 1 hour * numberOfHours
  await account.save();

  const emailContent = {
    from: 'TrackFast <no-reply@TrackFast.io>',
    to: email,
    subject: 'Your TrackFast Magic Link!',
    text: `Click the link to login: ${magicLink}`
  };

  await sendMail(emailContent);

  return { success: true };
}
