import { json } from '@sveltejs/kit';

// GET all todos
export async function GET({ platform }) {
  try {
    // Get all todos ordered by creation date (newest first)
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
    
    // Convert SQLite boolean (0/1) to JavaScript boolean
    const todos = results.map(todo => ({
      id: todo.id,
      description: todo.description,
      done: Boolean(todo.done),
      created_at: todo.created_at,
      updated_at: todo.updated_at
    }));
    
    return json({ success: true, data: todos });
  } catch (error) {
    console.error('GET todos error:', error);
    return json({ 
      success: false, 
      error: 'Failed to fetch todos',
      details: error.message 
    }, { status: 500 });
  }
}

// POST - Create new todo
export async function POST({ request, platform }) {
  try {
    const data = await request.json();
    const { description, done = false } = data;
    
    // Validate input
    if (!description || description.trim() === '') {
      return json({ 
        success: false, 
        error: 'Description is required' 
      }, { status: 400 });
    }
    
    // Get next ID
    const { results: maxResult } = await platform.DB.prepare(
      "SELECT COALESCE(MAX(id), 0) as max_id FROM todos"
    ).first();
    
    const nextId = maxResult.max_id + 1;
    
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
    
    const newTodo = {
      id: result.id,
      description: result.description,
      done: Boolean(result.done),
      created_at: result.created_at,
      updated_at: result.updated_at
    };
    
    return json({ success: true, data: newTodo }, { status: 201 });
  } catch (error) {
    console.error('POST todo error:', error);
    return json({ 
      success: false, 
      error: 'Failed to create todo',
      details: error.message 
    }, { status: 500 });
  }
}

// DELETE all completed todos
export async function DELETE({ platform }) {
  try {
    // Delete all completed todos
    await platform.DB.prepare(
      "DELETE FROM todos WHERE done = 1"
    ).run();
    
    // Get remaining todos
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
    
    const remainingTodos = results.map(todo => ({
      id: todo.id,
      description: todo.description,
      done: Boolean(todo.done),
      created_at: todo.created_at,
      updated_at: todo.updated_at
    }));
    
    return json({ 
      success: true, 
      message: 'Completed todos cleared',
      data: remainingTodos 
    });
  } catch (error) {
    console.error('DELETE completed todos error:', error);
    return json({ 
      success: false, 
      error: 'Failed to clear completed todos',
      details: error.message 
    }, { status: 500 });
  }
}
