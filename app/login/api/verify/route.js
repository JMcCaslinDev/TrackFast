'use server';

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../../mongodb/api/connect';
import Account from '../../../mongodb/accountModel';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  console.log('Received token:', token);

  await connectToDatabase();
  console.log('Database connected');

  const currentTime = Date.now();
  console.log('Current time:', new Date(currentTime).toISOString());

  const account = await Account.findOne({ loginToken: token, tokenExpiry: { $gt: currentTime } });
  console.log('Account found:', account);

  if (!account) {
    console.log('No valid account found for token:', token);
    if (token) {
      const accountToUpdate = await Account.findOne({ loginToken: token });
      console.log('Account to update:', accountToUpdate);
      if (accountToUpdate) {
        accountToUpdate.loginToken = null;
        accountToUpdate.tokenExpiry = null;
        await accountToUpdate.save();
        console.log('Updated account with null token and expiry');
      }
    }
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
    response.cookies.set('error', 'Invalid or expired magic link', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 5 * 60, // 5 minutes
      path: '/',
    });
    console.log('Redirecting to /login');
    return response;
  }

  let numberOfHours = process.env.numberOfHoursForAuthExpiry || 1;
  const expirationTime = `${numberOfHours}h`; // Convert the hours to a string format with 'h' suffix
  console.log('Expiration time for JWT:', expirationTime);

  const jwtToken = jwt.sign({ userId: account._id }, process.env.JWT_SECRET, { expiresIn: expirationTime });
  console.log('Generated JWT token:', jwtToken);

  account.loginToken = null;
  account.tokenExpiry = null;
  await account.save();
  console.log('Cleared loginToken and tokenExpiry from account');

  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);

  // Set the main cookie for the web application
  response.cookies.set('token', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600 * numberOfHours,
    path: '/',
    sameSite: 'Lax',
  });

  // Set a secondary cookie for the Chrome extension (only if token is needed in both environments)
  response.cookies.set('extension_token', jwtToken, {
    httpOnly: false,  // Accessible to JavaScript
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600 * numberOfHours,
    path: '/',
    sameSite: 'Lax',  // or 'None' if you need to support cross-origin requests
  });

  console.log('Redirecting to /dashboard with JWT token in cookies');

  return response;
}