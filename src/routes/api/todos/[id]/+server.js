import { json } from '@sveltejs/kit';
import { error as svelteError } from '@sveltejs/kit';

// GET single todo by ID
export async function GET({ params, platform }) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id) || id <= 0) {
      throw svelteError(400, 'Invalid todo ID');
    }
    
    const result = await platform.DB.prepare(
      `SELECT 
        id,
        description,
        done,
        datetime(created_at, 'localtime') as created_at,
        datetime(updated_at, 'localtime') as updated_at
       FROM todos 
       WHERE id = ?`
    ).bind(id).first();
    
    if (!result) {
      throw svelteError(404, 'Todo not found');
    }
    
    const todo = {
      id: result.id,
      description: result.description,
      done: Boolean(result.done),
      created_at: result.created_at,
      updated_at: result.updated_at
    };
    
    return json({ success: true, data: todo });
  } catch (error) {
    console.error(`GET todo ${params.id} error:`, error);
    
    // If it's a SvelteKit error, rethrow it
    if (error.status) {
      throw error;
    }
    
    return json({ 
      success: false, 
      error: 'Failed to fetch todo',
      details: error.message 
    }, { status: 500 });
  }
}

// PUT - Update todo
export async function PUT({ params, request, platform }) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    
    if (isNaN(id) || id <= 0) {
      throw svelteError(400, 'Invalid todo ID');
    }
    
    const { description, done } = data;
    
    // Validate input
    if (description !== undefined && (!description || description.trim() === '')) {
      return json({ 
        success: false, 
        error: 'Description cannot be empty' 
      }, { status: 400 });
    }
    
    // Check if todo exists
    const existing = await platform.DB.prepare(
      "SELECT id FROM todos WHERE id = ?"
    ).bind(id).first();
    
    if (!existing) {
      throw svelteError(404, 'Todo not found');
    }
    
    // Update todo
    const result = await platform.DB.prepare(
      `UPDATE todos 
       SET 
         description = COALESCE(?, description),
         done = COALESCE(?, done),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = ?
       RETURNING 
         id,
         description,
         done,
         datetime(created_at, 'localtime') as created_at,
         datetime(updated_at, 'localtime') as updated_at`
    ).bind(
      description ? description.trim() : null,
      done !== undefined ? (done ? 1 : 0) : null,
      id
    ).first();
    
    const updatedTodo = {
      id: result.id,
      description: result.description,
      done: Boolean(result.done),
      created_at: result.created_at,
      updated_at: result.updated_at
    };
    
    return json({ success: true, data: updatedTodo });
  } catch (error) {
    console.error(`PUT todo ${params.id} error:`, error);
    
    if (error.status) {
      throw error;
    }
    
    return json({ 
      success: false, 
      error: 'Failed to update todo',
      details: error.message 
    }, { status: 500 });
  }
}

// PATCH - Partial update (toggle done status)
export async function PATCH({ params, request, platform }) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id) || id <= 0) {
      throw svelteError(400, 'Invalid todo ID');
    }
    
    const data = await request.json();
    const { done } = data;
    
    if (done === undefined) {
      return json({ 
        success: false, 
        error: 'Done status is required for PATCH' 
      }, { status: 400 });
    }
    
    // Check if todo exists
    const existing = await platform.DB.prepare(
      "SELECT id FROM todos WHERE id = ?"
    ).bind(id).first();
    
    if (!existing) {
      throw svelteError(404, 'Todo not found');
    }
    
    // Update only the done status
    const result = await platform.DB.prepare(
      `UPDATE todos 
       SET done = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?
       RETURNING 
         id,
         description,
         done,
         datetime(created_at, 'localtime') as created_at,
         datetime(updated_at, 'localtime') as updated_at`
    ).bind(done ? 1 : 0, id).first();
    
    const updatedTodo = {
      id: result.id,
      description: result.description,
      done: Boolean(result.done),
      created_at: result.created_at,
      updated_at: result.updated_at
    };
    
    return json({ success: true, data: updatedTodo });
  } catch (error) {
    console.error(`PATCH todo ${params.id} error:`, error);
    
    if (error.status) {
      throw error;
    }
    
    return json({ 
      success: false, 
      error: 'Failed to update todo',
      details: error.message 
    }, { status: 500 });
  }
}

// DELETE - Remove todo
export async function DELETE({ params, platform }) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id) || id <= 0) {
      throw svelteError(400, 'Invalid todo ID');
    }
    
    // Check if todo exists
    const existing = await platform.DB.prepare(
      "SELECT id FROM todos WHERE id = ?"
    ).bind(id).first();
    
    if (!existing) {
      throw svelteError(404, 'Todo not found');
    }
    
    // Delete todo
    await platform.DB.prepare(
      "DELETE FROM todos WHERE id = ?"
    ).bind(id).run();
    
    return json({ 
      success: true, 
      message: 'Todo deleted successfully' 
    });
  } catch (error) {
    console.error(`DELETE todo ${params.id} error:`, error);
    
    if (error.status) {
      throw error;
    }
    
    return json({ 
      success: false, 
      error: 'Failed to delete todo',
      details: error.message 
    }, { status: 500 });
  }
}