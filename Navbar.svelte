<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { cubicOut } from 'svelte/easing';
  import { theme } from '$lib/stores/theme.js';

  let windowWidth;
  let isMenuOpen = $state(false);
  let isScrolled = $state(false);

  onMount(() => {
    windowWidth = window.innerWidth;
    
    const handleScroll = () => {
      isScrolled = window.scrollY > 10;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleResize() {
    windowWidth = window.innerWidth;
    if (windowWidth >= 768) {
      isMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeMenu() {
    isMenuOpen = false;
    document.body.style.overflow = '';
  }

  function handleKeydown(event) {
    if (event.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  }
</script>

<svelte:window
  onresize={handleResize}
  onkeydown={handleKeydown}
/>

<nav
  class="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 {isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700'}"
  role="navigation"
  aria-label="Main navigation"
>
  <div class="max-w-7xl mx-auto flex justify-between items-center">
    <a
      href="/"
      class="flex items-center gap-2 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded-lg p-1 transition-transform hover:scale-105"
      aria-label="Callaback Home"
      onclick={closeMenu}
    >
      <img
        src="/Logo.png"
        alt="Callaback Logo"
        class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg"
        width="40"
        height="40"
        loading="eager"
      />
      <span class="text-lg sm:text-2xl font-bold text-white dark:text-white tracking-tight">
        callaback<span class="text-orange-200 dark:text-orange-300">.com</span>
      </span>
    </a>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center space-x-6">
      <ul class="flex items-center space-x-6">
        <li>
          <a
            href="/LLM"
            class="text-white/90 hover:text-white font-medium px-3 py-2 rounded-lg transition-colors hover:bg-white/10 {$page.url?.pathname === '/LLM' ? 'bg-white/20 text-white' : ''}"
            aria-current={$page.url?.pathname === '/LLM' ? 'page' : undefined}
          >
            LLM
          </a>
        </li>
        <li>
          <a
            href="/todo"
            class="text-white/90 hover:text-white font-medium px-3 py-2 rounded-lg transition-colors hover:bg-white/10 {$page.url?.pathname === '/todo' ? 'bg-white/20 text-white' : ''}"
            aria-current={$page.url?.pathname === '/todo' ? 'page' : undefined}
          >
            TODOs
          </a>
        </li>
      </ul>

      <div class="h-6 w-px bg-white/30"></div>

      <div class="flex items-center space-x-4">
        <a
          href="https://customer.callaback.com/"
          class="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-6 py-2.5 rounded-lg transition-all hover:shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          Contact Us
        </a>

        <button
          onclick={() => theme.toggle()}
          class="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={$theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          type="button"
        >
          {#if $theme === 'dark'}
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          {:else}
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile Controls -->
    <div class="md:hidden flex items-center space-x-2">
      <button
        onclick={() => theme.toggle()}
        class="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label={$theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
        type="button"
      >
        {#if $theme === 'dark'}
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        {:else}
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        {/if}
      </button>

      <button
        class="relative w-10 h-10 flex flex-col justify-center items-center group focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded-lg"
        onclick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        type="button"
      >
        <span class="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
        <div class="space-y-1.5">
          <div class="w-6 h-0.5 bg-white transition-all duration-300 {isMenuOpen ? 'rotate-45 translate-y-2' : ''}"></div>
          <div class="w-6 h-0.5 bg-white transition-all duration-300 {isMenuOpen ? 'opacity-0' : ''}"></div>
          <div class="w-6 h-0.5 bg-white transition-all duration-300 {isMenuOpen ? '-rotate-45 -translate-y-2' : ''}"></div>
        </div>
      </button>
    </div>
  </div>
</nav>

<!-- Mobile Menu -->
{#if isMenuOpen}
  <div
    class="mobile-menu md:hidden fixed inset-0 z-40"
    onclick={(e) => { if (e.target === e.currentTarget) closeMenu(); }}
    transition:fade={{ duration: 200 }}
    role="dialog"
    aria-modal="true"
    aria-label="Mobile navigation menu"
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
    
    <!-- Menu Panel -->
    <div
      class="absolute right-0 top-0 h-full w-full max-w-sm bg-gradient-to-b from-orange-600 to-orange-700 dark:from-gray-900 dark:to-gray-800 shadow-2xl overflow-y-auto"
      onclick={(e) => e.stopPropagation()}
      transition:slide={{ duration: 300, easing: cubicOut, axis: 'x' }}
    >
      <div class="p-6 sm:p-8 min-h-full flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <img
              src="/Logo.png"
              alt="Callaback Logo"
              class="w-10 h-10 rounded-lg"
              width="40"
              height="40"
            />
            <span class="text-xl sm:text-2xl font-bold text-white">
              callaback<span class="text-orange-200">.com</span>
            </span>
          </div>
          <button
            onclick={closeMenu}
            class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close menu"
            type="button"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1">
          <ul class="space-y-2">
            <li>
              <a
                href="/"
                onclick={closeMenu}
                class="flex items-center gap-3 text-white/90 hover:text-white text-lg font-medium px-4 py-3 rounded-lg hover:bg-white/10 transition-all group {$page.url?.pathname === '/' ? 'bg-white/20 text-white' : ''}"
                aria-current={$page.url?.pathname === '/' ? 'page' : undefined}
              >
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <a
                href="/LLM"
                onclick={closeMenu}
                class="flex items-center gap-3 text-white/90 hover:text-white text-lg font-medium px-4 py-3 rounded-lg hover:bg-white/10 transition-all group {$page.url?.pathname === '/LLM' ? 'bg-white/20 text-white' : ''}"
                aria-current={$page.url?.pathname === '/LLM' ? 'page' : undefined}
              >
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                LLM
              </a>
            </li>
            <li>
              <a
                href="/todo"
                onclick={closeMenu}
                class="flex items-center gap-3 text-white/90 hover:text-white text-lg font-medium px-4 py-3 rounded-lg hover:bg-white/10 transition-all group {$page.url?.pathname === '/todo' ? 'bg-white/20 text-white' : ''}"
                aria-current={$page.url?.pathname === '/todo' ? 'page' : undefined}
              >
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                TODOs
              </a>
            </li>
          </ul>

          <!-- CTA Button -->
          <div class="mt-6 pt-6 border-t border-white/20">
            <a
              href="https://customer.callaback.com/"
              onclick={closeMenu}
              class="flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-semibold text-lg px-6 py-3.5 rounded-lg transition-all hover:shadow-lg active:scale-95 w-full"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </a>
          </div>
        </nav>

        <!-- Footer -->
        <div class="pt-6 mt-6 border-t border-white/20">
          <p class="text-white/70 text-sm leading-relaxed">
            Everything you need to build, integrate, and scale with Callaback.
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Spacer -->
<div class="h-16 md:h-20"></div>

<style>
  .mobile-menu {
    touch-action: none;
  }

  /* Prevent scroll jumping on mobile */
  :global(body.menu-open) {
    position: fixed;
    width: 100%;
    overflow: hidden;
  }

  /* Smooth transitions for theme changes */
  * {
    transition-property: background-color, border-color, color, opacity, transform;
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Ensure menu items are tappable on mobile */
  a, button {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  /* Fix iOS safe area */
  @supports (padding: env(safe-area-inset-top)) {
    nav {
      padding-top: max(0.75rem, env(safe-area-inset-top));
    }
    
    .mobile-menu > div > div {
      padding-top: max(1.5rem, env(safe-area-inset-top));
      padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
    }
  }
</style>
