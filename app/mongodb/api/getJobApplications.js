'use server';

import JobApplication from '../jobApplicationModel';

// Utility function to truncate strings
function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

// Utility function to convert to plain object
function toPlainObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export async function getJobApplications(userId) {
  try {
    console.log('Fetching job applications for user ID:', userId);
    const jobApplications = await JobApplication.find({ account_id: userId }).lean();

    // Convert date fields to strings and truncate long descriptions
    const processedApplications = jobApplications.map(job => {
      const plainJob = toPlainObject(job);

      if (plainJob.date_applied && plainJob.date_applied instanceof Date) {
        plainJob.date_applied = plainJob.date_applied.toISOString();
      } else {
        plainJob.date_applied = new Date(plainJob.date_applied).toISOString();
      }

      if (plainJob.job_description) {
        plainJob.job_description = truncateString(plainJob.job_description, 100); // Adjust the length as needed
      }

      return plainJob;
    });

    console.log('Job applications:', processedApplications);
    return processedApplications;
  } catch (error) {
    console.error('Error fetching job applications:', error);
    return [];
  }
}
