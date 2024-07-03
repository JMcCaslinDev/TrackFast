'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../mongodb/api/connect';
import { getJobApplications } from '../../mongodb/api/getJobApplications';

export async function getJobApplicationsFromServer() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  console.log('Token from cookies:', token); // Debug log

  if (!token) {
    throw new Error('Unauthorized: Token not found');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debug log
  } catch (error) {
    console.error('Error decoding token:', error);
    throw new Error('Unauthorized: Invalid token');
  }

  const userId = decoded.userId;
  console.log('User ID from token:', userId); // Debug log

  await connectToDatabase();
  console.log('About to call getJobApplications');
  const jobEntries = await getJobApplications(userId);

  console.log('About to return jobEntries');
  return jobEntries;
}
