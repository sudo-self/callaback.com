import { json } from '@sveltejs/kit';

// GET all todos
export async function GET({ platform }) {
  try {
    console.log('API: Getting todos from D1 database');
    
    // Use platform.env.DB (not platform.DB)
    const db = platform?.env?.DB;
    
    if (!db) {
      console.error('ERROR: D1 database not available. Check wrangler.toml binding.');
      console.log('Platform:', platform);
      console.log('Platform.env:', platform?.env);
      return json({ 
        success: false, 
        error: 'Database connection not configured',
        details: 'platform.env.DB is undefined'
      }, { status: 500 });
    }
    
    // First, try to create table if it doesn't exist
    try {
      await db.exec(`
        CREATE TABLE IF NOT EXISTS todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          description TEXT NOT NULL,
          done BOOLEAN DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('D1: Table checked/created');
    } catch (createError) {
      console.error('D1: Table creation error:', createError);
    }
    
    // Get all todos
    const stmt = db.prepare(`
      SELECT 
        id,
        description,
        done,
        datetime(created_at, 'localtime') as created_at,
        datetime(updated_at, 'localtime') as updated_at
      FROM todos 
      ORDER BY created_at DESC
    `);
    
    const { results } = await stmt.all();
    console.log(`D1: Found ${results?.length || 0} todos`);
    
    const todos = (results || []).map(todo => ({
      id: todo.id,
      description: todo.description,
      done: Boolean(todo.done),
      created_at: todo.created_at,
      updated_at: todo.updated_at
    }));
    
    return json({ 
      success: true, 
      data: todos,
      count: todos.length,
      message: 'Todos loaded successfully'
    });
    
  } catch (error) {
    console.error('API GET Error:', error);
    console.error('Error stack:', error.stack);
    return json({ 
      success: false, 
      error: 'Failed to fetch todos',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// POST - Create new todo
export async function POST({ request, platform }) {
  try {
    console.log('API: Creating new todo');
    
    const db = platform?.env?.DB;
    if (!db) {
      return json({ 
        success: false, 
        error: 'Database not available'
      }, { status: 500 });
    }
    
    const data = await request.json();
    const { description, done = false } = data;
    
    // Validate
    if (!description || description.trim() === '') {
      return json({ 
        success: false, 
        error: 'Description is required'
      }, { status: 400 });
    }
    
    // Insert todo (ID auto-increments)
    const stmt = db.prepare(`
      INSERT INTO todos (description, done) 
      VALUES (?, ?)
      RETURNING 
        id,
        description,
        done,
        datetime(created_at, 'localtime') as created_at,
        datetime(updated_at, 'localtime') as updated_at
    `).bind(description.trim(), done ? 1 : 0);
    
    const result = await stmt.first();
    
    if (!result) {
      throw new Error('Failed to insert todo');
    }
    
    const newTodo = {
      id: result.id,
      description: result.description,
      done: Boolean(result.done),
      created_at: result.created_at,
      updated_at: result.updated_at
    };
    
    return json({ 
      success: true, 
      data: newTodo,
      message: 'Todo created successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('API POST Error:', error);
    return json({ 
      success: false, 
      error: 'Failed to create todo',
      details: error.message
    }, { status: 500 });
  }
}

// DELETE - Clear completed todos
export async function DELETE({ platform }) {
  try {
    console.log('API: Clearing completed todos');
    
    const db = platform?.env?.DB;
    if (!db) {
      return json({ 
        success: false, 
        error: 'Database not available'
      }, { status: 500 });
    }
    
    // Delete completed todos
    await db.prepare("DELETE FROM todos WHERE done = 1").run();
    
    // Get remaining todos
    const { results } = await db.prepare(`
      SELECT 
        id,
        description,
        done,
        datetime(created_at, 'localtime') as created_at,
        datetime(updated_at, 'localtime') as updated_at
      FROM todos 
      ORDER BY created_at DESC
    `).all();
    
    const remainingTodos = (results || []).map(todo => ({
      id: todo.id,
      description: todo.description,
      done: Boolean(todo.done),
      created_at: todo.created_at,
      updated_at: todo.updated_at
    }));
    
    return json({ 
      success: true, 
      data: remainingTodos,
      message: 'Completed todos cleared'
    });
    
  } catch (error) {
    console.error('API DELETE Error:', error);
    return json({ 
      success: false, 
      error: 'Failed to clear completed todos',
      details: error.message
    }, { status: 500 });
  }
}
