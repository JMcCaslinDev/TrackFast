'use server';

import Job_Application from '../../mongodb/jobApplicationModel';
import { deleteEntry } from '../../mongodb/api/deleteEntry';

export async function deleteJobApplication(id) {
  try {
    const result = await deleteEntry(Job_Application, id);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}
