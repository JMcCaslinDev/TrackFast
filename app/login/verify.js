import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../mongodb/connect';
import Account from '../mongodb/accountModel';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  await connectToDatabase();

  const account = await Account.findOne({ loginToken: token, tokenExpiry: { $gt: Date.now() } });
  if (!account) {
    return NextResponse.json({ success: false, message: 'Invalid or expired magic link' }, { status: 401 });
  }

  const jwtToken = jwt.sign({ userId: account._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  account.loginToken = undefined;
  account.tokenExpiry = undefined;
  await account.save();

  const response = NextResponse.redirect('/dashboard');
  response.cookies.set('token', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600,
    path: '/',
  });

  return response;
}
