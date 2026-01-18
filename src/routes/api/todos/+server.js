import { json } from '@sveltejs/kit';

export async function GET({ platform }) {
  try {
    console.log('API: Getting todos from D1');
    
    // Check if platform.DB exists
    if (!platform || !platform.DB) {
      console.error('API Error: platform.DB is not available');
      return json({
        success: false,
        error: 'Database not available',
        platform: !!platform,
        db: !!platform?.DB
      }, { status: 500 });
    }

    try {
      const { results } = await platform.DB.prepare(
        `SELECT 
          id,
          description,
          done,
          datetime(created_at, 'localtime') as created_at,
          datetime(updated_at, 'localtime') as updated_at
         FROM todos 
         ORDER BY created_at DESC`
      ).all();
      
      console.log(`API: Found ${results?.length || 0} todos`);
      
      // Convert SQLite boolean (0/1) to JavaScript boolean
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
        count: todos.length
      });
    } catch (dbError) {
      console.error('Database query error:', dbError);
      
      // Try to create table if it doesn't exist
      try {
        await platform.DB.exec(`
          CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY,
            description TEXT NOT NULL,
            done BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
        
        console.log('Created todos table');
        return json({ success: true, data: [], count: 0, tableCreated: true });
      } catch (createError) {
        console.error('Failed to create table:', createError);
        return json({
          success: false,
          error: 'Database error',
          details: createError.message
        }, { status: 500 });
      }
    }
  } catch (error) {
    console.error('API GET todos error:', error);
    return json({
      success: false,
      error: 'Server error',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function POST({ request, platform }) {
  try {
    console.log('API: Creating new todo');
    
    if (!platform || !platform.DB) {
      return json({
        success: false,
        error: 'Database not available'
      }, { status: 500 });
    }

    const data = await request.json();
    const { description, done = false } = data;
    
    console.log('API: Received data:', data);
    
    // Validate input
    if (!description || description.trim() === '') {
      return json({
        success: false,
        error: 'Description is required'
      }, { status: 400 });
    }
    
    // Get next ID
    const maxResult = await platform.DB.prepare(
      "SELECT COALESCE(MAX(id), 0) as max_id FROM todos"
    ).first();
    
    const nextId = (maxResult?.max_id || 0) + 1;
    console.log('API: Next ID:', nextId);
    
    // Insert new todo
    const result = await platform.DB.prepare(
      `INSERT INTO todos (id, description, done) 
       VALUES (?, ?, ?) 
       RETURNING 
         id,
         description,
         done,
         datetime(created_at, 'localtime') as created_at,
         datetime(updated_at, 'localtime') as updated_at`
    ).bind(nextId, description.trim(), done ? 1 : 0).first();
    
    console.log('API: Insert result:', result);
    
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
    console.error('API POST error:', error);
    return json({
      success: false,
      error: 'Failed to create todo',
      details: error.message
    }, { status: 500 });
  }
}

// For debugging - simple endpoint to test DB connection
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
