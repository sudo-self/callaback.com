<script>
  import { fly } from 'svelte/transition';
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';

  let messages = [];
  let input = '';
  let loading = false;
  let bottom;

  // Typing animation state
  let typingDots = '';
  let typingInterval;

  // Initial message
  onMount(() => {
    messages = [
      { role: 'assistant', content: '📞 Hi! I’m callaback AI. Ask me anything.' }
    ];

    // Set page theme class
    if ($theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
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

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input;
    input = '';
    loading = true;

    messages = [...messages, { role: 'user', content: userMessage }];

    try {
      const res = await fetch('https://llm.callaback.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      if (!res.ok) throw new Error('Worker error: ' + res.status);

      const data = await res.json();

      const reply = data?.response?.response || 'No response from AI.';

      messages = [...messages, { role: 'assistant', content: reply }];
    } catch (err) {
      console.error('AI fetch error:', err);
      messages = [...messages, {
        role: 'assistant',
        content: '⚠️ Something went wrong talking to the AI.'
      }];
    } finally {
      loading = false;
    }
  }
</script>

<section class="chat-page" class:dark={$theme === 'dark'}>
  <header class="chat-header">
    <h1><span class="brand-gradient">llm.callaback</span></h1>
    <p class="subtitle">Talk to the Callaback assistant</p>
  </header>

  <div class="chat-shell">
    <div class="chat-messages">
      {#each messages as msg}
        <div
          class="message {msg.role}"
          in:fly={{ y: 8, opacity: 0, duration: 180 }}
        >
          {msg.content}
        </div>
      {/each}

      {#if loading}
        <div class="message assistant typing">
          Thinking{typingDots}
        </div>
      {/if}

      <div bind:this={bottom}></div>
    </div>

    <form class="chat-input" on:submit|preventDefault={sendMessage}>
      <input
        placeholder="Ask something…"
        bind:value={input}
        disabled={loading}
        autocomplete="off"
      />
      <button disabled={loading || !input.trim()}>Send</button>
    </form>
  </div>
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
  }
</style>
