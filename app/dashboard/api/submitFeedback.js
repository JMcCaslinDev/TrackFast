'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../mongodb/api/connect';
import Feedback from '../../mongodb/feedbackModel';

export async function submitFeedback(feedback_text) {
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

  if (!feedback_text) {
    console.error('Missing required fields');
    throw new Error('Missing required fields');
  }

  await connectToDatabase();
  const feedback = new Feedback({ userId, feedback_text });
  await feedback.save();

  return { success: true, message: 'Feedback submitted successfully' };
}
