<script>
    import { onMount } from 'svelte';
    import './app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { browser } from '$app/environment';

    const { children } = $props();

    // Dark mode state management
    let theme = $state('light');
    let isInitialized = $state(false);

    onMount(() => {
        // Check for saved theme preference or system preference
        const saved = browser ? localStorage.getItem('theme') : null;
        const systemDark = browser ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
        
        theme = saved || (systemDark ? 'dark' : 'light');
        
        if (browser) {
            document.documentElement.setAttribute('data-theme', theme);
        }
        
        isInitialized = true;
    });

    function toggleTheme() {
        theme = theme === 'light' ? 'dark' : 'light';
        
        if (browser) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }
</script>

<svelte:head>
    <!-- SEO -->
    <title>Callaback.com – Modern Callback Solution</title>
    <meta
        name="description"
        content="Callaback is a modern callback solution that transforms customer communication and support."
    />
    <meta name="keywords" content="callback, customer service, communication, support" />
    <meta name="author" content="Callaback" />

    <!-- Canonical -->
    <link rel="canonical" href="https://callaback.com/" />

    <!-- Icons -->
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png" />
    <link rel="apple-touch-icon" sizes="512x512" href="/icon-512.png" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Callaback – Modern Callback Solution" />
    <meta
        property="og:description"
        content="Transform your customer communication with seamless callback technology."
    />
    <meta property="og:url" content="https://callaback.com/" />
    <meta property="og:image" content="https://callaback.com/og-preview.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Callaback – Modern Callback Solution" />
    <meta
        name="twitter:description"
        content="Transform your customer communication with seamless callback technology."
    />
    <meta name="twitter:image" content="https://callaback.com/og-preview.png" />

    <!-- PWA / iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Callaback" />
    
    <!-- Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<!-- Theme toggle button -->
{#if isInitialized}
    <button
        on:click={toggleTheme}
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
    :global(*) {
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }
    
    /* Hide theme toggle on print */
    @media print {
        button {
            display: none !important;
        }
    }
</style>
