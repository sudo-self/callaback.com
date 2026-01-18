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

    // Todo state
    let todos = $state([]);
    let isLoading = $state(true);
    let error = $state(null);

    // API base URL
    const API_BASE = '/api';

    // Load todos from Cloudflare D1 API
    async function loadTodos() {
        try {
            error = null;
            const response = await fetch(`${API_BASE}/todos`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Failed to load todos');
            }
            
            todos = result.data || [];
            
            // If no todos in DB, initialize with default ones
            if (todos.length === 0) {
                await initializeDefaultTodos();
            }
        } catch (err) {
            console.error('Failed to load todos:', err);
            error = err.message;
            // Fallback to local state if API fails
            todos = getDefaultTodos();
        }
    }

    // Initialize default todos
    async function initializeDefaultTodos() {
        const defaultTodos = getDefaultTodos();
        
        try {
            for (const todo of defaultTodos) {
                await saveTodo(todo);
            }
            todos = defaultTodos;
        } catch (err) {
            console.error('Failed to initialize default todos:', err);
            todos = defaultTodos;
        }
    }

    // Get default todos
    function getDefaultTodos() {
        return [
            { id: 1, done: false, description: 'write some docs' },
            { id: 2, done: false, description: 'finish cloudflare integration' },
            { id: 3, done: true, description: 'add a billing account' },
            { id: 4, done: false, description: 'create a svelte page' },
            { id: 5, done: false, description: 'create logins' },
            { id: 6, done: false, description: 'establish r2 bucket' }
        ];
    }

    // Save todo to API
    async function saveTodo(todo) {
        try {
            const method = todo.id ? 'PUT' : 'POST';
            const url = todo.id ? `${API_BASE}/todos/${todo.id}` : `${API_BASE}/todos`;
            
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    description: todo.description,
                    done: todo.done
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Failed to save todo');
            }
            
            return result.data;
        } catch (err) {
            console.error('Failed to save todo:', err);
            throw err;
        }
    }

    // Delete todo from API
    async function deleteTodo(id) {
        try {
            const response = await fetch(`${API_BASE}/todos/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Failed to delete todo');
            }
            
            return result;
        } catch (err) {
            console.error('Failed to delete todo:', err);
            throw err;
        }
    }

    // Clear all completed todos
    async function clearAllCompleted() {
        try {
            const response = await fetch(`${API_BASE}/todos`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Failed to clear completed todos');
            }
            
            todos = result.data || [];
        } catch (err) {
            console.error('Failed to clear completed todos:', err);
            throw err;
        }
    }

    // Initialize on mount
    onMount(async () => {
        await loadTodos();
        isLoading = false;
    });

    // Add new todo
    async function add(event) {
        const input = event.target;
        const description = input.value.trim();
        
        if (!description) return;

        try {
            error = null;
            const newTodo = {
                description,
                done: false
            };
            
            const savedTodo = await saveTodo(newTodo);
            todos = [savedTodo, ...todos];
            input.value = '';
        } catch (err) {
            console.error('Failed to add todo:', err);
            error = err.message;
        }
    }

    // Remove todo
    async function remove(todo) {
        try {
            error = null;
            await deleteTodo(todo.id);
            todos = todos.filter((t) => t.id !== todo.id);
        } catch (err) {
            console.error('Failed to remove todo:', err);
            error = err.message;
        }
    }

    // Toggle todo status
    async function toggleTodo(todo) {
        try {
            error = null;
            const updatedTodo = {
                ...todo,
                done: !todo.done
            };
            
            // Use PATCH for toggling done status
            const response = await fetch(`${API_BASE}/todos/${todo.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: updatedTodo.done })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Failed to update todo');
            }
            
            // Update local state with the response
            todos = todos.map(t => t.id === todo.id ? result.data : t);
        } catch (err) {
            console.error('Failed to toggle todo:', err);
            error = err.message;
            
            // Revert the UI change
            todos = [...todos];
        }
    }

    // Clear completed todos
    async function clearCompleted() {
        try {
            error = null;
            await clearAllCompleted();
        } catch (err) {
            console.error('Failed to clear completed todos:', err);
            error = err.message;
        }
    }

    // Get next available ID (client-side, for fallback)
    function getNextId() {
        if (todos.length === 0) return 1;
        const maxId = Math.max(...todos.map(t => t.id));
        return maxId + 1;
    }
</script>

<div class="board">
    {#if isLoading}
        <div class="loading">Loading todos from Cloudflare D1...</div>
    {:else if error}
        <div class="error">
            <strong>Error:</strong> {error}
            <button onclick={() => { error = null; loadTodos(); }} class="retry-btn">
                Retry
            </button>
        </div>
    {/if}

    <div class="controls">
        <input
            class="new-todo"
            placeholder="what needs to be done?"
            onkeydown={(event) => event.key === 'Enter' && add(event)}
            disabled={isLoading}
        />
        
        <div class="action-buttons">
            <button
                onclick={clearCompleted}
                class="secondary"
                disabled={!todos.some(t => t.done) || isLoading}
            >
                Clear Completed
            </button>
        </div>
    </div>

    <div class="columns">
        <div class="left">
            <h2>todo ({todos.filter(t => !t.done).length})</h2>
            {#each todos.filter((t) => !t.done) as todo (todo.id)}
                <label
                    in:receive={{ key: todo.id }}
                    out:send={{ key: todo.id }}
                    animate:flip
                >
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
                <label
                    in:receive={{ key: todo.id }}
                    out:send={{ key: todo.id }}
                    animate:flip
                >
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
            <span class="db-status"> {isLoading ? 'Loading...' : 'Connected to Cloudflare D1'}</span>
        </small>
    </div>
</div>

<style>
    .loading {
        text-align: center;
        padding: 2em;
        color: #666;
        background: #f8f9fa;
        border-radius: 6px;
        margin-bottom: 1em;
    }

    .error {
        text-align: center;
        padding: 1em;
        color: #dc3545;
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        border-radius: 6px;
        margin-bottom: 1em;
    }

    .error .retry-btn {
        margin-left: 1em;
        padding: 0.25em 0.5em;
        font-size: 0.8em;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .error .retry-btn:hover {
        background: #c82333;
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
        border: 1px solid #ced4da;
        border-radius: 4px;
        transition: border-color 0.15s ease-in-out;
    }

    .new-todo:focus {
        outline: none;
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    .new-todo:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: #e9ecef;
    }

    .action-buttons {
        display: flex;
        gap: 0.5em;
        flex-wrap: wrap;
    }

    button {
        padding: 0.5em 1em;
        border: 1px solid #ccc;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9em;
        transition: all 0.2s ease;
    }

    button:hover:not(:disabled) {
        background: #f5f5f5;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    .secondary {
        background: #f0f0f0;
        color: #333;
    }

    .board {
        max-width: 36em;
        margin: 0 auto;
        padding: 1em;
    }

    .columns {
        display: flex;
        gap: 2em;
        margin-top: 1em;
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
        padding-bottom: 0.5em;
        border-bottom: 2px solid #e9ecef;
    }

    label {
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
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
        width: 1.2em;
        height: 1.2em;
    }

    .description {
        flex: 1;
        margin: 0 0.5em;
    }

    .right label {
        background-color: rgba(180, 240, 100, 0.15);
        border-color: rgba(180, 240, 100, 0.3);
    }

    .right label:hover {
        background-color: rgba(180, 240, 100, 0.25);
    }

    label button {
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
        margin: 0;
    }

    label button:hover:not(:disabled) {
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
        font-size: 0.9em;
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
        
        button {
            width: 100%;
        }
        
        .board {
            padding: 0.5em;
        }
    }
</style>
