'use server';

import Job_Application from '../../mongodb/jobApplicationModel';
import { addEntry } from '../../mongodb/api/addEntry';

export async function addJobApplication(data) {
  try {
    const result = await addEntry(Job_Application, data);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}
