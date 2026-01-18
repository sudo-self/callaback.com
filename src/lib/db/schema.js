// src/lib/db/schema.js

export async function initializeDatabase(db) {
  try {
    // todos table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY,
        description TEXT NOT NULL,
        done BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_todos_done ON todos(done);
      CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at);
      
      -- Trigger to update updated_at timestamp
      CREATE TRIGGER IF NOT EXISTS update_todos_timestamp 
      AFTER UPDATE ON todos 
      FOR EACH ROW 
      BEGIN
        UPDATE todos SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
      END;
    `);
    
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return false;
  }
}
