<script>
    import './app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { themeStore } from '$lib/stores/theme.svelte.js';

    const { children } = $props();
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

<div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <Navbar />
    
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
</style>
