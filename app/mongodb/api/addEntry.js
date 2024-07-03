import { connectToDatabase } from './connect';

export async function addEntry(model, data) {
  await connectToDatabase();

  try {
    const newEntry = new model(data);
    await newEntry.save();
    return { message: 'Entry added successfully', data: newEntry };
  } catch (error) {
    console.error('Error adding entry:', error);
    throw new Error('Failed to add entry');
  }
}
