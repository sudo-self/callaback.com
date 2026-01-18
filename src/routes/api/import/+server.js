import { json } from '@sveltejs/kit';

export async function POST({ request, platform }) {
  try {
    // Get form data (for file upload)
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return json({ 
        success: false, 
        error: 'No file provided' 
      }, { status: 400 });
    }
    
    // Read file content
    const fileContent = await file.text();
    let importedData;
    
    try {
      importedData = JSON.parse(fileContent);
    } catch (parseError) {
      return json({ 
        success: false, 
        error: 'Invalid JSON file' 
      }, { status: 400 });
    }
    
    // Handle different JSON structures
    const importedTodos = importedData.data || importedData.todos || importedData;
    
    if (!Array.isArray(importedTodos)) {
      return json({ 
        success: false, 
        error: 'Invalid file format. Expected array of todos.' 
      }, { status: 400 });
    }
    
    // Get overwrite option
    const overwrite = formData.get('overwrite') === 'true';
    
    let importedCount = 0;
    let errors = [];
    
    // If overwrite is true, clear existing todos first
    if (overwrite) {
      await platform.DB.prepare("DELETE FROM todos").run();
    }
    
    // Get current max ID
    const { results: maxResult } = await platform.DB.prepare(
      "SELECT COALESCE(MAX(id), 0) as max_id FROM todos"
    ).first();
    
    let nextId = maxResult.max_id + 1;
    
    // Import each todo
    for (const todo of importedTodos) {
      try {
        // Validate todo
        if (!todo.description || typeof todo.description !== 'string') {
          throw new Error('Invalid todo description');
        }
        
        // Use existing ID or assign new one
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
          todo: todo.description || 'Unknown todo',
          error: importError.message
        });
      }
    }
    
    return json({
      success: true,
      message: `Imported ${importedCount} todos from file`,
      imported_count: importedCount,
      errors: errors.length > 0 ? errors : undefined
    });
    
  } catch (error) {
    console.error('File import error:', error);
    return json({ 
      success: false, 
      error: 'Failed to import todos from file',
      details: error.message 
    }, { status: 500 });
  }
}
