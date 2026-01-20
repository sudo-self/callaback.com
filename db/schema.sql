-- schema.sql
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY,
  description TEXT NOT NULL,
  done BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--indexes
CREATE INDEX IF NOT EXISTS idx_done ON todos(done);
CREATE INDEX IF NOT EXISTS idx_created ON todos(created_at);
