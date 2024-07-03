'use server';

import Job_Application from '../../mongodb/jobApplicationModel';
import { connectToDatabase } from '../../mongodb/api/connect';

export async function editJobApplication(id, newData) {
  try {
    await connectToDatabase();

    // Fetch the current document
    const currentDocument = await Job_Application.findById(id);

    if (!currentDocument) {
      throw new Error('Document not found');
    }

    // Compare fields and prepare the update object
    const updatedFields = {};
    Object.keys(newData).forEach(key => {
      if (newData[key] !== currentDocument[key]) {
        updatedFields[key] = newData[key];
      }
    });

    // If no fields have changed, return the current document
    if (Object.keys(updatedFields).length === 0) {
      return { message: 'No fields were updated', data: currentDocument };
    }

    // Update only the changed fields
    const updatedDocument = await Job_Application.findByIdAndUpdate(id, updatedFields, { new: true });

    return { message: 'Entry updated successfully', data: updatedDocument };
  } catch (error) {
    throw new Error(error.message);
  }
}
