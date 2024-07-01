import jwt from 'jsonwebtoken';
import JobApplication from './jobApplicationModel';

export async function getJobApplications(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Adjust this according to your JWT payload structure
    console.log('Fetching job applications for user ID:', userId);
    const jobApplications = await JobApplication.find({ userId }).lean();
    console.log('Job applications:', jobApplications);
    return jobApplications;
  } catch (error) {
    console.error('Error decoding token or fetching job applications:', error);
    return [];
  }
}
