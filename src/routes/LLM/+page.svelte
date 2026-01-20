<script>
  import { fly } from 'svelte/transition';
  import { theme } from '$lib/stores/theme';
  import { onMount, onDestroy } from 'svelte';

  let messages = [];
  let input = '';
  let loading = false;
  let bottom;

  // Twilio Sync state
  let sessionId = 'session123';
  let identity = '';
  let isLoggedIn = false;
  let syncClient = null;
  let syncList = null;

  // Typing animation state
  let typingDots = '';
  let typingInterval;

  onMount(() => {
    // Check for identity in query string
    const params = new URLSearchParams(window.location.search);
    const queryIdentity = params.get('identity');
    if (queryIdentity) {
      identity = queryIdentity;
    }

    // Set page theme class
    if ($theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  });

  onDestroy(() => {
    clearInterval(typingInterval);
    if (syncClient) {
      syncClient.shutdown();
    }
  });

  // Scroll to bottom
  $: if (bottom) bottom.scrollIntoView({ behavior: 'smooth' });

  // Animate typing dots safely
  $: {
    if (loading) {
      typingDots = '';
      clearInterval(typingInterval);
      typingInterval = setInterval(() => {
        typingDots = typingDots.length < 3 ? typingDots + '.' : '';
      }, 400);
    } else {
      clearInterval(typingInterval);
      typingDots = '';
    }
  }

  async function login() {
    if (!identity.trim() || !sessionId.trim()) return;

    loading = true;

    try {
      // Get Twilio Sync token from your backend
      // Replace this URL with your actual token endpoint
      const tokenResponse = await fetch('/api/twilio-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity, sessionId })
      });

      if (!tokenResponse.ok) throw new Error('Failed to get token');

      const { token } = await tokenResponse.json();

      // Initialize Twilio Sync Client
      // You'll need to include the Twilio Sync SDK in your project
      // Add this to your app.html: https://media.twiliocdn.com/sdk/js/sync/v4/twilio-sync.min.js
      syncClient = new Twilio.Sync.Client(token);

      // Open or create a Sync List for messages
      syncList = await syncClient.list(`chat-${sessionId}`);

      // Load existing messages
      const page = await syncList.getItems();
      messages = page.items.map(item => ({
        role: item.data.identity === identity ? 'user' : 'assistant',
        content: item.data.message,
        identity: item.data.identity,
        timestamp: item.dateCreated
      }));

      // Listen for new messages
      syncList.on('itemAdded', (event) => {
        const newMessage = {
          role: event.item.data.identity === identity ? 'user' : 'assistant',
          content: event.item.data.message,
          identity: event.item.data.identity,
          timestamp: event.item.dateCreated
        };
        messages = [...messages, newMessage];
      });

      isLoggedIn = true;

      // Add welcome message
      messages = [
        ...messages,
        {
          role: 'assistant',
          content: `📞 ${identity} joined the chat!`,
          identity: 'system'
        }
      ];

    } catch (err) {
      console.error('Twilio Sync error:', err);
      alert('Failed to connect to chat. Please try again.');
    } finally {
      loading = false;
    }
  }

  function logout() {
    if (syncClient) {
      syncClient.shutdown();
    }
    isLoggedIn = false;
    messages = [];
    syncClient = null;
    syncList = null;
  }

  async function sendMessage() {
    if (!input.trim() || loading || !syncList) return;

    const userMessage = input;
    input = '';

    try {
      // Add message to Sync List
      await syncList.push({
        identity: identity,
        message: userMessage,
        timestamp: new Date().toISOString()
      });

    } catch (err) {
      console.error('Error sending message:', err);
      messages = [...messages, {
        role: 'assistant',
        content: '⚠️ Failed to send message.'
      }];
    }
  }
</script>

<section class="chat-page" class:dark={$theme === 'dark'}>
  <header class="chat-header">
    <h1><span class="brand-gradient">Twilio Sync Chat</span></h1>
    <p class="subtitle">Real-time collaborative chat powered by Twilio</p>
    {#if isLoggedIn}
      <button class="logout-btn" on:click={logout}>Logout</button>
    {/if}
  </header>

  {#if !isLoggedIn}
    <!-- Login Form -->
    <div class="login-container">
      <div class="login-card">
        <h3>Session ID</h3>
        <p class="card-subtitle">Provide a unique session ID for the chat room</p>
        <input
          type="text"
          placeholder="Session ID"
          bind:value={sessionId}
          class="login-input"
        />
      </div>

      <div class="login-card">
        <h3>Identity</h3>
        <p class="card-subtitle">Enter your username to join the chat</p>
        <div class="login-input-group">
          <input
            type="text"
            placeholder="Username"
            bind:value={identity}
            class="login-input"
            on:keydown={(e) => e.key === 'Enter' && login()}
          />
          <button
            class="login-button"
            on:click={login}
            disabled={!identity.trim() || !sessionId.trim() || loading}
          >
            {loading ? 'Connecting...' : 'Join Chat'}
          </button>
        </div>
      </div>
    </div>
  {:else}
    <!-- Chat Interface -->
    <div class="chat-shell">
      <div class="chat-messages">
        {#each messages as msg}
          <div
            class="message {msg.role}"
            in:fly={{ y: 8, opacity: 0, duration: 180 }}
          >
            {#if msg.identity && msg.identity !== identity && msg.identity !== 'system'}
              <span class="message-author">{msg.identity}</span>
            {/if}
            {msg.content}
          </div>
        {/each}

        {#if loading}
          <div class="message assistant typing">
            Connecting{typingDots}
          </div>
        {/if}

        <div bind:this={bottom}></div>
      </div>

      <form class="chat-input" on:submit|preventDefault={sendMessage}>
        <input
          placeholder="Type a message…"
          bind:value={input}
          disabled={loading}
          autocomplete="off"
        />
        <button disabled={loading || !input.trim()}>Send</button>
      </form>
    </div>
  {/if}
</section>

<style>
  .chat-page {
    max-width: 900px;
    margin: 6rem auto 8rem;
    padding: 1rem 2rem;
    color: #111827;
    transition: color 0.3s, background 0.3s;
  }
  .chat-page.dark {
    background: #111827;
    color: #f3f4f6;
  }

  .chat-header {
    margin-bottom: 3rem;
    position: relative;
  }
  h1 {
    font-size: clamp(2.75rem, 6vw, 3.75rem);
    font-weight: 900;
    letter-spacing: -0.03em;
    margin: 0;
    line-height: 1;
  }
  .brand-gradient {
    background: linear-gradient(135deg, #ff3e00, #ff6b00, #ff8a00, #ffd700);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .subtitle {
    margin-top: 0.75rem;
    font-size: 1rem;
    color: #6b7280;
  }
  .chat-page.dark .subtitle {
    color: #d1d5db;
  }

  .logout-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.6rem 1.5rem;
    border-radius: 999px;
    border: none;
    background: linear-gradient(135deg, #ff3e00, #ff8a00);
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .logout-btn:hover {
    opacity: 0.9;
  }

  /* Login Form Styles */
  .login-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .login-card {
    border: 1px solid #e5e7eb;
    border-radius: 1.5rem;
    background: white;
    padding: 2rem;
    transition: background 0.3s, border-color 0.3s;
  }
  .chat-page.dark .login-card {
    border-color: #374151;
    background: #1f2937;
  }

  .login-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .card-subtitle {
    margin: 0 0 1.5rem 0;
    font-size: 0.9rem;
    color: #6b7280;
  }
  .chat-page.dark .card-subtitle {
    color: #9ca3af;
  }

  .login-input {
    width: 100%;
    padding: 0.9rem 1.2rem;
    border-radius: 0.75rem;
    border: 1px solid #d1d5db;
    font-size: 1rem;
    outline: none;
    transition: background 0.3s, border-color 0.3s, color 0.3s;
    background: white;
    color: #111827;
    box-sizing: border-box;
  }
  .chat-page.dark .login-input {
    background: #111827;
    border-color: #4b5563;
    color: #f3f4f6;
  }
  .login-input:focus {
    border-color: #ff3e00;
  }

  .login-input-group {
    display: flex;
    gap: 0.75rem;
  }

  .login-button {
    padding: 0.9rem 2rem;
    border-radius: 0.75rem;
    border: none;
    background: linear-gradient(135deg, #ff3e00, #ff8a00);
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    white-space: nowrap;
  }
  .login-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .login-button:hover:not(:disabled) {
    opacity: 0.9;
  }

  /* Chat Styles */
  .chat-shell {
    border: 1px solid #e5e7eb;
    border-radius: 1.5rem;
    background: white;
    overflow: hidden;
    padding: 1rem;
    transition: background 0.3s, border-color 0.3s;
  }
  .chat-page.dark .chat-shell {
    border-color: #374151;
    background: #1f2937;
  }

  .chat-messages {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 500px;
    overflow-y: auto;
  }
  .message {
    max-width: 80%;
    padding: 0.9rem 1.2rem;
    border-radius: 1rem;
    line-height: 1.45;
    font-size: 1rem;
    white-space: pre-wrap;
    transition: background 0.3s, color 0.3s;
  }
  .message-author {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    opacity: 0.7;
  }
  .message.user {
    align-self: flex-end;
    background: linear-gradient(135deg, #ff3e00, #ff8a00);
    color: white;
    border-bottom-right-radius: 0.25rem;
  }
  .message.assistant {
    align-self: flex-start;
    background: #f3f4f6;
    color: #111827;
    border-bottom-left-radius: 0.25rem;
  }
  .chat-page.dark .message.assistant {
    background: #374151;
    color: #f3f4f6;
  }
  .typing {
    opacity: 0.6;
    font-style: italic;
  }

  .chat-input {
    display: flex;
    gap: 0.75rem;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background: #fafafa;
    transition: background 0.3s, border-color 0.3s;
  }
  .chat-page.dark .chat-input {
    border-color: #4b5563;
    background: #111827;
  }
  .chat-input input {
    flex: 1;
    padding: 0.9rem 1.2rem;
    border-radius: 999px;
    border: 1px solid #d1d5db;
    font-size: 1rem;
    outline: none;
    transition: background 0.3s, border-color 0.3s, color 0.3s;
    background: white;
    color: #111827;
  }
  .chat-page.dark .chat-input input {
    background: #1f2937;
    border-color: #4b5563;
    color: #f3f4f6;
  }
  .chat-input input:focus {
    border-color: #ff3e00;
  }
  .chat-input button {
    padding: 0 1.5rem;
    border-radius: 999px;
    border: none;
    background: linear-gradient(135deg, #ff3e00, #ff8a00);
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .chat-input button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .chat-page {
      margin: 4rem auto 6rem;
      padding: 0 1.5rem;
    }
    .message {
      max-width: 85%;
    }
    .logout-btn {
      position: static;
      margin-top: 1rem;
      width: 100%;
    }
    .login-input-group {
      flex-direction: column;
    }
  }
</style>
