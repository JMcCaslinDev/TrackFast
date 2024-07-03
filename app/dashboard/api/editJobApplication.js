'use server';

import Job_Application from '../../mongodb/jobApplicationModel';
import { editEntry } from '../../mongodb/api/editEntry';

export async function editJobApplication(id, data) {
  try {
    const result = await editEntry(Job_Application, id, data);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}
