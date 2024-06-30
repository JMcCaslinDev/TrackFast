import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../mongodb/connect';
import User from '../mongodb/userModel';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  await connectToDatabase();

  const user = await User.findOne({ magicToken: token });
  if (!user) {
    return NextResponse.json({ success: false, message: 'Invalid or expired magic link' }, { status: 401 });
  }

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  user.magicToken = undefined;
  await user.save();

  const response = NextResponse.redirect('/dashboard');
  response.cookies.set('token', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600,
    path: '/',
  });

  return response;
}
