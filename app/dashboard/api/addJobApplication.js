'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Job_Application from '../../mongodb/jobApplicationModel';
import { addEntry } from '../../mongodb/api/addEntry';

export async function addJobApplication(data) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new Error('Unauthorized: Token not found');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Unauthorized: Invalid token');
  }

  const userId = decoded.userId;

  try {
    const result = await addEntry(Job_Application, { ...data, account_id: userId });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}
