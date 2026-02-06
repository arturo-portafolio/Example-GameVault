
// Minimal in-memory storage mock to satisfy server requirements
// without needing a real database connection.

export interface IStorage {
  // No methods needed for this specific frontend-only MVP
}

export class MemStorage implements IStorage {
  constructor() {}
}

export const storage = new MemStorage();
