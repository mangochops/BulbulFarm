import { initializeSchema } from './db';

export async function initializeDatabase() {
  await initializeSchema();
}
