import JobApplication from './jobApplicationModel';

export async function getJobApplications(userId) {
  try {
    console.log('Fetching job applications for user ID:', userId);
    const jobApplications = await JobApplication.find({ account_id: userId }).lean();

    // Convert date fields to strings
    jobApplications.forEach(job => {
      if (job.date_applied) {
        job.date_applied = job.date_applied.toISOString();
      }
    });

    console.log('Job applications:', jobApplications);
    return jobApplications;
  } catch (error) {
    console.error('Error decoding token or fetching job applications:', error);
    return [];
  }
}
