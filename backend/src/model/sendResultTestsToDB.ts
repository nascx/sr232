import { db } from '../config/db'

export const sendResultsTestsToDB = async (id: string, name: string, date: string, result: string) => {
  try {
    const q = 'INSERT INTO results (registration, name, date, result) VALUES (?, ?, ?, ?)'
    const values = [id, name, date, result]
    await db.query(q, values)  // Use await here
    return { message: 'Data inserted successfully' }
  } catch (error) {
    console.error('Error inserting data:', error)
    throw error; // Re-throw the error for caller to handle
  }
}