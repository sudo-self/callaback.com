<script>
  import { confetti } from '@neoconfetti/svelte'
  import { tick } from 'svelte'
  import { fade, fly } from 'svelte/transition'

  let isVisible = false
  let clickCount = 0
  let isAnimating = false

  const confettiColors = [
    '#FF3E00', '#FF8A00', '#40B3FF', '#2DD4BF', '#FFD700'
  ]

  async function fireConfetti() {
    if (isAnimating) return
    
    isAnimating = true
    clickCount++
    
    isVisible = false
    await tick()
    
    isVisible = true
    
    setTimeout(() => {
      isVisible = false
      isAnimating = false
    }, 3000)
  }

  let showCounter = false
  $: if (clickCount > 0) {
    showCounter = true
  }
</script>

<section class="docs-hero" transition:fly={{ y: 20, duration: 400, delay: 100 }}>
  <div class="hero-content">
    <div class="title-wrapper">
      <h1
        class="clickable-title"
        onclick={fireConfetti}
        class:clicked={isAnimating}
        aria-label="Click for confetti celebration"
      >
        <span class="brand-gradient">callaback</span>
        <span class="domain text-gray-700 dark:text-gray-300">.com</span>
        {#if showCounter}
          <span
            class="click-counter"
            transition:fade={{ duration: 300 }}
            onoutroend={() => showCounter = false}
          >
            +{clickCount}
          </span>
        {/if}
      </h1>
      
      <div class="subtitle text-gray-500 dark:text-gray-400">
        <svg class="sparkle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L14.5 8.5L21 12L14.5 15.5L12 22L9.5 15.5L3 12L9.5 8.5L12 2Z"
                fill="currentColor" stroke="currentColor" stroke-width="1"/>
        </svg>
        <span>tap the domain name to celebrate!</span>
      </div>
    </div>

    {#if isVisible}
      <div
        class="confetti-layer"
        transition:fade={{ duration: 300 }}
      >
        <div
          use:confetti={{
            particleCount: 250,
            spread: 80,
            startVelocity: 50,
            colors: confettiColors,
            gravity: 0.8,
            scalar: 1.2,
            ticks: 300,
            decay: 0.94
          }}
        />
      </div>
    {/if}

    <div class="content-grid">
      <p class="lead text-gray-900 dark:text-gray-100" transition:fade={{ delay: 200 }}>
        Everything you need to build, integrate, and scale with Callaback.
      </p>

      <div class="feature-highlight bg-gradient-to-br from-orange-50/50 to-blue-50/50 dark:from-orange-900/10 dark:to-blue-900/10 border border-gray-200 dark:border-gray-800" transition:fade={{ delay: 400 }}>
        <div class="tech-badges">
          <span class="badge bg-white/30 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FF3E00"/>
              <path d="M2 17L12 22L22 17" stroke="#FF3E00" stroke-width="2"/>
              <path d="M2 12L12 17L22 12" stroke="#FF3E00" stroke-width="2"/>
            </svg>
            @sveltejs/package
          </span>
          <span class="badge bg-white/30 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#40B3FF" stroke-width="2"/>
              <path d="M12 2V22" stroke="#40B3FF" stroke-width="2"/>
              <path d="M2 12H22" stroke="#40B3FF" stroke-width="2"/>
            </svg>
            SvelteKit
          </span>
        </div>
        <p class="text-gray-700 dark:text-gray-300">
          Built with modern tooling for a fast, efficient workflow that delivers
          exceptional performance and developer experience.
        </p>
      </div>

      <div class="cta-section" transition:fade={{ delay: 600 }}>
        <p class="links">
          <a
            href="https://svelte.dev"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-link"
          >
            <span class="cta-text">build with Svelte</span>
            <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </a>
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .docs-hero {
    position: relative;
    max-width: 840px;
    margin: 6rem auto 8rem;
    padding: 0 2rem;
  }

  .hero-content {
    position: relative;
  }

  .title-wrapper {
    margin-bottom: 3.5rem;
    position: relative;
  }

  h1 {
    font-size: clamp(3rem, 6vw, 4.5rem);
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1;
    margin: 0;
    display: inline-flex;
    align-items: baseline;
    gap: 0.25rem;
    cursor: pointer;
    position: relative;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  h1:hover {
    transform: translateY(-2px);
  }

  h1.clicked {
    animation: pulse 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .brand-gradient {
    background: linear-gradient(
      135deg,
      #FF3E00 0%,
      #FF6B00 25%,
      #FF8A00 50%,
      #FFAA00 75%,
      #FFD700 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-size: 200% auto;
    animation: shimmer 3s ease-in-out infinite;
    font-weight: 900;
  }

  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .click-counter {
    font-size: 0.75rem;
    background: linear-gradient(135deg, #40B3FF, #2DD4BF);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    margin-left: 0.5rem;
    animation: bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.5) translateY(10px);
    }
    70% {
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .subtitle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    font-size: 0.9rem;
    opacity: 0;
    animation: fadeIn 0.5s ease-out 1s forwards;
  }

  .sparkle-icon {
    color: #FFD700;
    animation: sparkle 2s ease-in-out infinite;
  }

  @keyframes sparkle {
    0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
    50% { opacity: 0.6; transform: scale(1.1) rotate(10deg); }
  }

  .confetti-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1000;
  }

  .content-grid {
    display: grid;
    gap: 2.5rem;
  }

  .lead {
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: 500;
    max-width: 40ch;
    margin: 0;
  }

  .feature-highlight {
    border-radius: 1.5rem;
    padding: 2rem;
  }

  .feature-highlight p {
    line-height: 1.65;
    margin: 0;
  }

  .tech-badges {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .badge:hover {
    transform: translateY(-2px);
    border-color: #FF3E00 !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .cta-section {
    margin-top: 1rem;
  }

  .links {
    margin: 0;
  }

  .cta-link {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #FF3E00, #FF8A00);
    color: white;
    text-decoration: none;
    border-radius: 3rem;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 4px 20px rgba(255, 62, 0, 0.2);
  }

  .cta-link:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 30px rgba(255, 62, 0, 0.3);
    gap: 1rem;
  }

  .cta-text {
    font-size: 1.1rem;
  }

  .arrow-icon {
    transition: transform 0.3s ease;
  }

  .cta-link:hover .arrow-icon {
    transform: translateX(4px);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 768px) {
    .docs-hero {
      margin: 4rem auto 6rem;
      padding: 0 1.5rem;
    }
    
    h1 {
      font-size: clamp(2.5rem, 8vw, 3.5rem);
    }
    
    .lead {
      font-size: 1.25rem;
    }
    
    .feature-highlight {
      padding: 1.5rem;
    }
    
    .cta-link {
      width: 100%;
      justify-content: center;
    }
  }
</style>
