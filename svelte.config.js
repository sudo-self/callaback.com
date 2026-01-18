import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Add preprocessor for CSS, TypeScript, etc.
    preprocess: vitePreprocess(),
    
    kit: {
        adapter: adapter({
            // Simple configuration - let it auto-detect
            // Or you can specify:
            // routes: {
            //     include: ['/*'],
            //     exclude: ['<all>']
            // },
            // fallback: null // or '200.html' for SPA mode
        })
    }
};

export default config;
