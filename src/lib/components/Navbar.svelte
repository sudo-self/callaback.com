<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { page } from '$app/stores';

  let windowWidth: number;
  let isMenuOpen = $state(false);
  let isScrolled = $state(false);

  onMount(() => {
    windowWidth = window.innerWidth;
    
    // Handle scroll effect
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleResize() {
    windowWidth = window.innerWidth;
    if (windowWidth >= 768) {
      isMenuOpen = false;
    }
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    // Prevent body scroll when menu is open
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

  function handleScroll() {
    isScrolled = window.scrollY > 10;
  }
</script>

<svelte:window
  onresize={handleResize}
  onscroll={handleScroll}
/>

<nav
  class="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 {isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700'}"
  role="navigation"
  aria-label="Main navigation"
>
  <div class="max-w-7xl mx-auto flex justify-between items-center">
    <!-- Logo -->
    <a
      href="/"
      class="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded-lg p-1 transition-transform hover:scale-105"
      aria-label="Callaback Home"
    >
      <img
        src="/Logo.png"
        alt="Callaback Logo"
        class="w-10 h-10 rounded-lg"
        width="40"
        height="40"
        loading="eager"
      />
      <span class="text-2xl font-bold text-white dark:text-white tracking-tight">
        callaback<span class="text-orange-200 dark:text-orange-300">.com</span>
      </span>
    </a>

    <!-- Desktop Navigation -->
    <ul class="hidden md:flex items-center space-x-6">
      <li>
        <a
          href="/"
          class="text-white/90 hover:text-white font-medium px-3 py-2 rounded-lg transition-colors hover:bg-white/10 {$page.url?.pathname === '/' ? 'bg-white/20 text-white' : ''}"
          aria-current={$page.url?.pathname === '/' ? 'page' : undefined}
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="/about"
          class="text-white/90 hover:text-white font-medium px-3 py-2 rounded-lg transition-colors hover:bg-white/10 {$page.url?.pathname === '/about' ? 'bg-white/20 text-white' : ''}"
          aria-current={$page.url?.pathname === '/about' ? 'page' : undefined}
        >
          About
        </a>
      </li>
      <li>
        <a
          href="/todo"
          class="text-white/90 hover:text-white font-medium px-3 py-2 rounded-lg transition-colors hover:bg-white/10 {$page.url?.pathname === '/todo' ? 'bg-white/20 text-white' : ''}"
          aria-current={$page.url?.pathname === '/todo' ? 'page' : undefined}
        >
          Todo
        </a>
      </li>
      <li>
        <a
          href="mailto:support@callaback.com"
          class="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-6 py-2.5 rounded-lg transition-all hover:shadow-lg hover:scale-105 active:scale-95"
        >
          Contact Us
        </a>
      </li>
    </ul>

    <!-- Mobile Menu Button -->
    <button
      class="md:hidden relative w-10 h-10 flex flex-col justify-center items-center group focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded-lg"
      onclick={toggleMenu}
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={isMenuOpen}
    >
      <span class="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
      <div class="space-y-1.5">
        <div class="w-6 h-0.5 bg-white transition-all duration-300 {isMenuOpen ? 'rotate-45 translate-y-2' : ''}"></div>
        <div class="w-6 h-0.5 bg-white transition-all duration-300 {isMenuOpen ? 'opacity-0' : ''}"></div>
        <div class="w-6 h-0.5 bg-white transition-all duration-300 {isMenuOpen ? '-rotate-45 -translate-y-2' : ''}"></div>
      </div>
    </button>
  </div>
</nav>

<!-- Mobile Menu Overlay -->
{#if isMenuOpen}
  <div
    class="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
    onclick={closeMenu}
    transition:fade={{ duration: 200 }}
    role="dialog"
    aria-modal="true"
  >
    <div
      class="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-orange-600 to-orange-700 dark:from-gray-900 dark:to-gray-800 shadow-2xl"
      onclick={(e) => e.stopPropagation()}
      transition:slide={{ duration: 300, easing: cubicOut }}
    >
      <div class="p-8 h-full flex flex-col">
        <!-- Mobile Menu Header -->
        <div class="flex items-center justify-between mb-10">
          <div class="flex items-center gap-3">
            <img
              src="/Logo.png"
              alt="Callaback Logo"
              class="w-12 h-12 rounded-lg"
              width="48"
              height="48"
            />
            <span class="text-2xl font-bold text-white">
              callaback<span class="text-orange-200">.com</span>
            </span>
          </div>
          <button
            onclick={closeMenu}
            class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close menu"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Links -->
        <ul class="space-y-2 flex-1">
          <li>
            <a
              href="/"
              onclick={closeMenu}
              class="flex items-center gap-3 text-white/90 hover:text-white text-lg font-medium px-4 py-3.5 rounded-lg hover:bg-white/10 transition-colors group {$page.url?.pathname === '/' ? 'bg-white/20 text-white' : ''}"
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
              href="/about"
              onclick={closeMenu}
              class="flex items-center gap-3 text-white/90 hover:text-white text-lg font-medium px-4 py-3.5 rounded-lg hover:bg-white/10 transition-colors group {$page.url?.pathname === '/about' ? 'bg-white/20 text-white' : ''}"
              aria-current={$page.url?.pathname === '/about' ? 'page' : undefined}
            >
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About
            </a>
          </li>
          <li>
            <a
              href="/todo"
              onclick={closeMenu}
              class="flex items-center gap-3 text-white/90 hover:text-white text-lg font-medium px-4 py-3.5 rounded-lg hover:bg-white/10 transition-colors group {$page.url?.pathname === '/todo' ? 'bg-white/20 text-white' : ''}"
              aria-current={$page.url?.pathname === '/todo' ? 'page' : undefined}
            >
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Todo
            </a>
          </li>
          <li class="mt-8 pt-6 border-t border-white/20">
            <a
              href="mailto:support@callaback.com"
              onclick={closeMenu}
              class="flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-semibold text-lg px-6 py-3.5 rounded-lg transition-all hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </a>
          </li>
        </ul>

        <!-- Mobile Menu Footer -->
        <div class="pt-6 mt-6 border-t border-white/20">
          <p class="text-white/70 text-sm">
            Everything you need to build, integrate, and scale with Callaback.
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Add some spacing after fixed nav -->
<div class="h-16 md:h-20"></div>

<style>
  /* Custom styles if needed */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .cubic-out {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
</style>
