<script>
    import { onMount } from 'svelte';
    import './app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';

    const { children } = $props();

    // Dark mode state management
    let theme = 'light';
    let isInitialized = $state(false);

    onMount(() => {
        // Check for saved theme preference or system preference
        const saved = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        theme = saved || (systemDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
        isInitialized = true;
    });

    function toggleTheme() {
        theme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
</script>

<!-- Theme toggle button (optional, can be placed in Navbar instead) -->
{#if isInitialized}
    <button
        onclick={toggleTheme}
        class="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 z-50 group"
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
        {#if theme === 'light'}
            <svg class="w-5 h-5 text-gray-700 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        {:else}
            <svg class="w-5 h-5 text-gray-300 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        {/if}
    </button>
{/if}

<div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <Navbar {theme} {toggleTheme} />
    
    <main class="flex-1">
        {@render children()}
    </main>
    
    <Footer />
</div>

<style>
    /* Smooth theme transitions */
    * {
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }
    
    /* Hide theme toggle on print */
    @media print {
        button {
            display: none !important;
        }
    }
</style>
