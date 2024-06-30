import { NextResponse } from 'next/server';
import { connectToDatabase } from '../mongodb/connect';
import { findUserByEmail } from '../mongodb/findUserByEmail';
import { sendMail } from '../mailgun/sendMail';
import crypto from 'crypto';

export async function POST(request) {
  const { email } = await request.json();
  await connectToDatabase();

  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Email not found' }, { status: 404 });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/login/verify?token=${token}`;

  user.magicToken = token;
  await user.save();

  await sendMail(email, magicLink);

  return NextResponse.json({ success: true });
}
