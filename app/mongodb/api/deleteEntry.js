import { connectToDatabase } from './connect';

export async function deleteEntry(model, id) {
  await connectToDatabase();

  try {
    await model.findByIdAndDelete(id);
    return { message: 'Entry deleted successfully' };
  } catch (error) {
    console.error('Error deleting entry:', error);
    throw new Error('Failed to delete entry');
  }
}
