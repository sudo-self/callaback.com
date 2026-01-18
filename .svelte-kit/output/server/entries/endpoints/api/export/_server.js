import { json } from "@sveltejs/kit";
async function GET({ platform }) {
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
    const todos = results.map((todo) => ({
      id: todo.id,
      description: todo.description,
      done: Boolean(todo.done),
      created_at: todo.created_at,
      updated_at: todo.updated_at,
      exported_at: (/* @__PURE__ */ new Date()).toISOString()
    }));
    const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const filename = `todos-backup-${currentDate}.json`;
    return new Response(JSON.stringify({
      success: true,
      count: todos.length,
      exported_at: (/* @__PURE__ */ new Date()).toISOString(),
      data: todos
    }, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Access-Control-Expose-Headers": "Content-Disposition"
      }
    });
  } catch (error) {
    console.error("Export error:", error);
    return json({
      success: false,
      error: "Failed to export todos",
      details: error.message
    }, { status: 500 });
  }
}
async function POST({ request, platform }) {
  try {
    const data = await request.json();
    const { todos: importedTodos, overwrite = false } = data;
    if (!Array.isArray(importedTodos)) {
      return json({
        success: false,
        error: "Invalid data format. Expected array of todos."
      }, { status: 400 });
    }
    const validTodos = importedTodos.filter(
      (todo) => todo.description && typeof todo.description === "string"
    );
    if (validTodos.length === 0) {
      return json({
        success: false,
        error: "No valid todos found in import data"
      }, { status: 400 });
    }
    let importedCount = 0;
    let errors = [];
    if (overwrite) {
      await platform.DB.prepare("DELETE FROM todos").run();
    }
    const { results: maxResult } = await platform.DB.prepare(
      "SELECT COALESCE(MAX(id), 0) as max_id FROM todos"
    ).first();
    let nextId = maxResult.max_id + 1;
    for (const todo of validTodos) {
      try {
        const todoId = todo.id && !overwrite ? todo.id : nextId++;
        await platform.DB.prepare(
          `INSERT OR REPLACE INTO todos (id, description, done) 
           VALUES (?, ?, ?)`
        ).bind(
          todoId,
          todo.description.trim(),
          todo.done ? 1 : 0
        ).run();
        importedCount++;
      } catch (importError) {
        errors.push({
          todo: todo.description,
          error: importError.message
        });
      }
    }
    const { results: updatedResults } = await platform.DB.prepare(
      "SELECT COUNT(*) as count FROM todos"
    ).first();
    return json({
      success: true,
      message: `Imported ${importedCount} todos successfully`,
      imported_count: importedCount,
      total_count: updatedResults.count,
      errors: errors.length > 0 ? errors : void 0
    });
  } catch (error) {
    console.error("Import error:", error);
    return json({
      success: false,
      error: "Failed to import todos",
      details: error.message
    }, { status: 500 });
  }
}
export {
  GET,
  POST
};
