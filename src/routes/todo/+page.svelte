<script>
    import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { onMount } from 'svelte';

    const [send, receive] = crossfade({
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: (t) => `
                    transform: ${transform} scale(${t});
                    opacity: ${t}
                `
            };
        }
    });

    
    let db = null;
    const DB_NAME = 'TodoAppDB';
    const DB_VERSION = 1;
    const STORE_NAME = 'todos';

    // Todo state
    let todos = $state([]);
    let isLoading = $state(true);

    // Initialize IndexedDB
    async function initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                db = request.result;
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create object store if it doesn't exist
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                    store.createIndex('done', 'done', { unique: false });
                    store.createIndex('description', 'description', { unique: false });
                }
            };
        });
    }

    // Load todos from IndexedDB
    async function loadTodos() {
        if (!db) await initDB();
        
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                const todosFromDB = request.result;
                
                // If no todos in DB, initialize with default ones
                if (todosFromDB.length === 0) {
                    const defaultTodos = [
                        { id: 1, done: false, description: 'write some docs' },
                        { id: 2, done: false, description: 'finish cloudflare integration' },
                        { id: 3, done: true, description: 'add a billing account' },
                        { id: 4, done: false, description: 'create a svelte page' },
                        { id: 5, done: false, description: 'create logins' },
                        { id: 6, done: false, description: 'establish r2 bucket' }
                    ];
                    
                    // Save default todos to DB
                    saveTodos(defaultTodos).then(() => {
                        todos = defaultTodos;
                        resolve(defaultTodos);
                    });
                } else {
                    todos = todosFromDB;
                    resolve(todosFromDB);
                }
            };
        });
    }

    // Save todos to IndexedDB
    async function saveTodos(todosToSave) {
        if (!db) await initDB();
        
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            
            // Clear existing todos
            store.clear();
            
            // Add all todos
            todosToSave.forEach(todo => {
                store.put(todo);
            });

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    // Save a single todo to IndexedDB
    async function saveTodo(todo) {
        if (!db) await initDB();
        
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(todo);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    // Delete a todo from IndexedDB
    async function deleteTodo(todoId) {
        if (!db) await initDB();
        
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(todoId);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    // Get next ID from IndexedDB
    async function getNextId() {
        if (!db) await initDB();
        
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                const todos = request.result;
                if (todos.length === 0) {
                    resolve(1);
                } else {
                    const maxId = Math.max(...todos.map(t => t.id));
                    resolve(maxId + 1);
                }
            };
        });
    }

    // Initialize on mount
    onMount(async () => {
        try {
            await initDB();
            await loadTodos();
            isLoading = false;
        } catch (error) {
            console.error('Failed to initialize database:', error);
            // Fallback to local state if IndexedDB fails
            todos = [
                { id: 1, done: false, description: 'write some docs' },
                { id: 2, done: false, description: 'finish cloudflare integration' },
                { id: 3, done: true, description: 'add a billing account' },
                { id: 4, done: false, description: 'create a svelte page' },
                { id: 5, done: false, description: 'create logins' },
                { id: 6, done: false, description: 'establish r2 bucket' }
            ];
            isLoading = false;
        }
    });


    $effect(() => {
        if (!isLoading && db && todos.length > 0) {
            saveTodos(todos).catch(error => {
                console.error('Failed to save todos:', error);
            });
        }
    });

    async function add(event) {
        const input = event.target;
        const nextId = await getNextId();
        const todo = {
            id: nextId,
            done: false,
            description: input.value.trim(),
            createdAt: new Date().toISOString()
        };

        if (!todo.description) return;

        try {
            await saveTodo(todo);
            todos = [todo, ...todos];
            input.value = '';
        } catch (error) {
            console.error('Failed to add todo:', error);
        }
    }

    async function remove(todo) {
        try {
            await deleteTodo(todo.id);
            todos = todos.filter((t) => t.id !== todo.id);
        } catch (error) {
            console.error('Failed to remove todo:', error);
        }
    }

    // Handle todo toggle with immediate DB save
    async function toggleTodo(todo) {
        todo.done = !todo.done;
        todo.updatedAt = new Date().toISOString();
        
        try {
            await saveTodo(todo);
            // Update the todos array to trigger reactivity
            todos = [...todos];
        } catch (error) {
            console.error('Failed to update todo:', error);
            // Revert the change if save fails
            todo.done = !todo.done;
        }
    }

    // Clear all completed todos
    async function clearCompleted() {
        const completedTodos = todos.filter(t => t.done);
        
        try {
            // Delete all completed todos from DB
            await Promise.all(completedTodos.map(todo => deleteTodo(todo.id)));
            
            // Update local state
            todos = todos.filter(t => !t.done);
        } catch (error) {
            console.error('Failed to clear completed todos:', error);
        }
    }

    // Export database (for backup)
    async function exportDB() {
        const blob = new Blob([JSON.stringify(todos, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todos-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Import database (from backup)
    async function importDB(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const importedTodos = JSON.parse(e.target.result);
                
                // Validate the imported data
                if (!Array.isArray(importedTodos)) {
                    throw new Error('Invalid todo data format');
                }

                // Add IDs if missing
                const todosWithIds = importedTodos.map((todo, index) => ({
                    ...todo,
                    id: todo.id || Date.now() + index,
                    updatedAt: new Date().toISOString()
                }));

                // Save to IndexedDB
                await saveTodos(todosWithIds);
                todos = todosWithIds;
                
                alert('Todos imported successfully!');
            } catch (error) {
                console.error('Failed to import todos:', error);
                alert('Failed to import todos. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
</script>

<div class="board">
    {#if isLoading}
        <div class="loading">Loading todos...</div>
    {/if}

    <div class="controls">
        <input
            class="new-todo"
            placeholder="what needs to be done?"
            onkeydown={(event) => event.key === 'Enter' && add(event)}
            disabled={isLoading}
        />
        
        <div class="action-buttons">
            <button onclick={clearCompleted} class="secondary" disabled={!todos.some(t => t.done) || isLoading}>
                Clear Completed
            </button>
            <button onclick={exportDB} class="secondary" disabled={isLoading}>
                Export
            </button>
            <label class="import-btn secondary" disabled={isLoading}>
                Import
                <input type="file" accept=".json" onchange={importDB} style="display: none;" />
            </label>
        </div>
    </div>

    <div class="columns">
        <div class="left">
            <h2>todo ({todos.filter(t => !t.done).length})</h2>
            {#each todos.filter((t) => !t.done) as todo (todo.id)}
                <label in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip>
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onchange={() => toggleTodo(todo)}
                        disabled={isLoading}
                    />
                    <span class="description">{todo.description}</span>
                    <button onclick={() => remove(todo)} disabled={isLoading}>x</button>
                </label>
            {:else}
                <div class="empty-state">All done! 🎉</div>
            {/each}
        </div>

        <div class="right">
            <h2>done ({todos.filter(t => t.done).length})</h2>
            {#each todos.filter((t) => t.done) as todo (todo.id)}
                <label in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip>
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onchange={() => toggleTodo(todo)}
                        disabled={isLoading}
                    />
                    <span class="description">{todo.description}</span>
                    <button onclick={() => remove(todo)} disabled={isLoading}>x</button>
                </label>
            {:else}
                <div class="empty-state">Nothing completed yet</div>
            {/each}
        </div>
    </div>

    <div class="stats">
        <small>
            Total: {todos.length} |
            Todo: {todos.filter(t => !t.done).length} |
            Done: {todos.filter(t => t.done).length} |
            <span class="db-status"> {isLoading ? 'Loading...' : 'Saved to IndexedDB'}</span>
        </small>
    </div>
</div>

<style>
    .loading {
        text-align: center;
        padding: 2em;
        color: #666;
    }

    .controls {
        margin-bottom: 1.5em;
    }

    .new-todo {
        font-size: 1.4em;
        width: 100%;
        margin: 0 0 1em 0;
        padding: 0.5em;
        box-sizing: border-box;
    }

    .new-todo:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .action-buttons {
        display: flex;
        gap: 0.5em;
        flex-wrap: wrap;
    }

    button, .import-btn {
        padding: 0.5em 1em;
        border: 1px solid #ccc;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9em;
    }

    button:hover:not(:disabled), .import-btn:hover:not(:disabled) {
        background: #f5f5f5;
    }

    button:disabled, .import-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .import-btn {
        display: inline-block;
        text-align: center;
    }

    .secondary {
        background: #f0f0f0;
        color: #333;
    }

    .board {
        max-width: 36em;
        margin: 0 auto;
    }

    .columns {
        display: flex;
        gap: 2em;
    }

    .left,
    .right {
        flex: 1;
        padding: 0 1em 0 0;
        box-sizing: border-box;
    }

    h2 {
        font-size: 1.5em;
        font-weight: 600;
        user-select: none;
        margin-bottom: 1em;
        color: #333;
    }

    label {
        top: 0;
        left: 0;
        display: block;
        font-size: 1em;
        line-height: 1;
        padding: 0.75em;
        margin: 0 auto 0.5em auto;
        border-radius: 6px;
        background-color: #f8f9fa;
        user-select: none;
        color: #333;
        border: 1px solid #e9ecef;
        transition: all 0.2s ease;
    }

    label:hover {
        background-color: #e9ecef;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    input[type="checkbox"] {
        margin: 0 0.5em 0 0;
        cursor: pointer;
    }

    .description {
        flex: 1;
    }

    .right label {
        background-color: rgba(180, 240, 100, 0.2);
        border-color: rgba(180, 240, 100, 0.3);
    }

    .right label:hover {
        background-color: rgba(180, 240, 100, 0.3);
    }

    button {
        float: right;
        height: 1.5em;
        width: 1.5em;
        box-sizing: border-box;
        padding: 0;
        line-height: 1;
        background-color: transparent;
        border: none;
        color: #dc3545;
        opacity: 0;
        transition: opacity 0.2s;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    button:hover:not(:disabled) {
        background-color: rgba(220, 53, 69, 0.1);
        opacity: 1;
    }

    label:hover button {
        opacity: 0.7;
    }

    .empty-state {
        text-align: center;
        padding: 2em;
        color: #6c757d;
        font-style: italic;
        background: #f8f9fa;
        border-radius: 6px;
        border: 1px dashed #dee2e6;
    }

    .stats {
        margin-top: 2em;
        padding-top: 1em;
        border-top: 1px solid #dee2e6;
        text-align: center;
        color: #6c757d;
    }

    .db-status {
        color: #198754;
        font-weight: 500;
    }

    @media (max-width: 768px) {
        .columns {
            flex-direction: column;
            gap: 1em;
        }
        
        .left,
        .right {
            padding: 0;
            width: 100%;
        }
        
        .action-buttons {
            flex-direction: column;
        }
        
        button, .import-btn {
            width: 100%;
        }
    }
</style>
