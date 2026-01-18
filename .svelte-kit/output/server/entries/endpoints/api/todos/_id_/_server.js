import { json } from "@sveltejs/kit";
async function GET({ params, platform }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id) || id <= 0) {
      return json({
        success: false,
        error: "Invalid todo ID"
      }, { status: 400 });
    }
    const db = platform?.env?.DB;
    if (!db) {
      return json({
        success: false,
        error: "Database not available"
      }, { status: 500 });
    }
    const stmt = db.prepare(`
      SELECT 
        id,
        description,
        done,
        datetime(created_at, 'localtime') as created_at,
        datetime(updated_at, 'localtime') as updated_at
      FROM todos 
      WHERE id = ?
    `).bind(id);
    const result = await stmt.first();
    if (!result) {
      return json({
        success: false,
        error: "Todo not found"
      }, { status: 404 });
    }
    const todo = {
      id: result.id,
      description: result.description,
      done: Boolean(result.done),
      created_at: result.created_at,
      updated_at: result.updated_at
    };
    return json({
      success: true,
      data: todo
    });
  } catch (error) {
    console.error("API GET [id] Error:", error);
    return json({
      success: false,
      error: "Failed to fetch todo",
      details: error.message
    }, { status: 500 });
  }
}
async function PUT({ params, request, platform }) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    if (isNaN(id) || id <= 0) {
      return json({
        success: false,
        error: "Invalid todo ID"
      }, { status: 400 });
    }
    const { description, done } = data;
    const db = platform?.env?.DB;
    if (!db) {
      return json({
        success: false,
        error: "Database not available"
      }, { status: 500 });
    }
    const existing = await db.prepare("SELECT id FROM todos WHERE id = ?").bind(id).first();
    if (!existing) {
      return json({
        success: false,
        error: "Todo not found"
      }, { status: 404 });
    }
    const stmt = db.prepare(`
      UPDATE todos 
      SET 
        description = ?,
        done = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING 
        id,
        description,
        done,
        datetime(created_at, 'localtime') as created_at,
        datetime(updated_at, 'localtime') as updated_at
    `).bind(description.trim(), done ? 1 : 0, id);
    const result = await stmt.first();
    const updatedTodo = {
      id: result.id,
      description: result.description,
      done: Boolean(result.done),
      created_at: result.created_at,
      updated_at: result.updated_at
    };
    return json({
      success: true,
      data: updatedTodo,
      message: "Todo updated successfully"
    });
  } catch (error) {
    console.error("API PUT Error:", error);
    return json({
      success: false,
      error: "Failed to update todo",
      details: error.message
    }, { status: 500 });
  }
}
async function PATCH({ params, request, platform }) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    if (isNaN(id) || id <= 0) {
      return json({
        success: false,
        error: "Invalid todo ID"
      }, { status: 400 });
    }
    const { done } = data;
    if (done === void 0) {
      return json({
        success: false,
        error: "Done status is required"
      }, { status: 400 });
    }
    const db = platform?.env?.DB;
    if (!db) {
      return json({
        success: false,
        error: "Database not available"
      }, { status: 500 });
    }
    const stmt = db.prepare(`
      UPDATE todos 
      SET 
        done = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING 
        id,
        description,
        done,
        datetime(created_at, 'localtime') as created_at,
        datetime(updated_at, 'localtime') as updated_at
    `).bind(done ? 1 : 0, id);
    const result = await stmt.first();
    if (!result) {
      return json({
        success: false,
        error: "Todo not found"
      }, { status: 404 });
    }
    const updatedTodo = {
      id: result.id,
      description: result.description,
      done: Boolean(result.done),
      created_at: result.created_at,
      updated_at: result.updated_at
    };
    return json({
      success: true,
      data: updatedTodo,
      message: "Todo status updated"
    });
  } catch (error) {
    console.error("API PATCH Error:", error);
    return json({
      success: false,
      error: "Failed to update todo status",
      details: error.message
    }, { status: 500 });
  }
}
async function DELETE({ params, platform }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id) || id <= 0) {
      return json({
        success: false,
        error: "Invalid todo ID"
      }, { status: 400 });
    }
    const db = platform?.env?.DB;
    if (!db) {
      return json({
        success: false,
        error: "Database not available"
      }, { status: 500 });
    }
    const { success } = await db.prepare("DELETE FROM todos WHERE id = ?").bind(id).run();
    if (!success) {
      return json({
        success: false,
        error: "Todo not found"
      }, { status: 404 });
    }
    return json({
      success: true,
      message: "Todo deleted successfully"
    });
  } catch (error) {
    console.error("API DELETE [id] Error:", error);
    return json({
      success: false,
      error: "Failed to delete todo",
      details: error.message
    }, { status: 500 });
  }
}
export {
  DELETE,
  GET,
  PATCH,
  PUT
};
