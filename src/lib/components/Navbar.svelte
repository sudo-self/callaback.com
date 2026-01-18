<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { page } from '$app/stores';

  let windowWidth: number;
  let isMenuOpen = $state(false);
  let isScrolled = $state(false);
  let darkMode = $state(false);

  onMount(() => {
    windowWidth = window.innerWidth;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      darkMode = true;
      document.documentElement.classList.add('dark');
    }
    
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

  function toggleTheme() {
    darkMode = !darkMode;
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  function handleMobileLinkClick(event: MouseEvent) {
    event.preventDefault();
    const target = event.currentTarget as HTMLAnchorElement;
    const href = target.getAttribute('href');
    
    closeMenu();
    
    setTimeout(() => {
      if (href && href.startsWith('/')) {
        window.location.href = href;
      } else if (href && href.startsWith('mailto:')) {
        window.location.href = href;
      }
    }, 150);
  }

  function handleBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('mobile-backdrop')) {
      closeMenu();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  }

  function handleCloseClick(event: MouseEvent) {
    event.stopPropagation();
    closeMenu();
  }
</script>

<svelte:window
  onresize={handleResize}
  onscroll={handleScroll}
  on:keydown={handleKeydown}
/>

<nav
  class="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 {isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700'}"
  role="navigation"
  aria-label="Main navigation"
>
  <div class="max-w-7xl mx-auto flex justify-between items-center">
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

    <div class="hidden md:flex items-center space-x-6">
      <ul class="flex items-center space-x-6">
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
      </ul>

      <div class="h-6 w-px bg-white/30"></div>

      <div class="flex items-center space-x-4">
        <a
          href="mailto:support@callaback.com"
          class="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-6 py-2.5 rounded-lg transition-all hover:shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          Contact Us
        </a>

        <button
          onclick={toggleTheme}
          class="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          type="button"
        >
          <svg
            class="w-5 h-5 text-white transition-all duration-300 absolute {darkMode ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          
          <svg
            class="w-5 h-5 text-white transition-all duration-300 absolute {darkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>
    </div>

    <div class="md:hidden flex items-center space-x-4">
      <button
        onclick={toggleTheme}
        class="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        type="button"
      >
        <svg
          class="w-5 h-5 text-white transition-all duration-300 absolute {darkMode ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        
        <svg
          class="w-5 h-5 text-white transition-all duration-300 absolute {darkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
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

{#if isMenuOpen}
  <div
    class="mobile-backdrop md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
    onclick={handleBackdropClick}
    transition:fade={{ duration: 200 }}
    role="dialog"
    aria-modal="true"
    aria-label="Mobile navigation menu"
  >
    <div
      class="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-orange-600 to-orange-700 dark:from-gray-900 dark:to-gray-800 shadow-2xl"
      onclick={(e) => e.stopPropagation()}
      transition:slide={{ duration: 300, easing: cubicOut }}
    >
      <div class="p-8 h-full flex flex-col">
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
            onclick={handleCloseClick}
            class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close menu"
            type="button"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul class="space-y-2 flex-1">
          <li>
            <a
              href="/about"
              onclick={handleMobileLinkClick}
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
              onclick={handleMobileLinkClick}
              class="flex items-center gap-3 text-white/90 hover:text-white text-lg font-medium px-4 py-3.5 rounded-lg hover:bg-white/10 transition-colors group {$page.url?.pathname === '/todo' ? 'bg-white/20 text-white' : ''}"
              aria-current={$page.url?.pathname === '/todo' ? 'page' : undefined}
            >
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Todo
            </a>
          </li>
          
          <li class="mt-6 pt-6 border-t border-white/20">
            <button
              onclick={() => {
                toggleTheme();
                closeMenu();
              }}
              class="flex items-center justify-between w-full px-4 py-3.5 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              type="button"
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {#if darkMode}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  {:else}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  {/if}
                </svg>
                <span class="text-lg font-medium text-white">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </div>
              <span class="text-white/70 text-sm">
                {darkMode ? 'Switch to light' : 'Switch to dark'}
              </span>
            </button>
          </li>

          <li class="mt-4">
            <a
              href="mailto:support@callaback.com"
              onclick={handleMobileLinkClick}
              class="flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-semibold text-lg px-6 py-3.5 rounded-lg transition-all hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </a>
          </li>
        </ul>

        <div class="pt-6 mt-6 border-t border-white/20">
          <p class="text-white/70 text-sm">
            Everything you need to build, integrate, and scale with Callaback.
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}

<div class="h-16 md:h-20"></div>

<style>
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .cubic-out {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  body.menu-open {
    overflow: hidden;
  }

  * {
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
</style>
