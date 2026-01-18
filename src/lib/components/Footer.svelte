<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  let currentYear = $state(2024);
  
  onMount(() => {
    currentYear = new Date().getFullYear();
  });
  
  // Social media links
  const socialLinks = [
    { icon: 'twitter', url: 'https://twitter.com/callaback', label: 'Twitter' },
    { icon: 'github', url: 'https://github.com/1900geek', label: 'GitHub' },
    { icon: 'linkedin', url: 'https://www.linkedin.com/in/dweipert', label: 'LinkedIn' }
  ];
  
  // Footer navigation links
  const footerLinks = {
    company: [
      { name: 'About', url: '/about' },
      { name: 'Todo', url: '/todo' },
      { name: 'Home', url: '/' },
    ],
    support: [
      { name: 'Help Center', url: '/help' },
      { name: 'Contact Us', url: 'mailto:support@callaback.com' },
      { name: 'Status', url: '/status' },
      { name: 'Community', url: '/community' }
    ],
    legal: [
      { name: 'Privacy Policy', url: '/privacy' },
      { name: 'Terms of Service', url: '/terms' },
      { name: 'Cookie Policy', url: '/cookies' },
      { name: 'Security', url: '/security' }
    ]
  };
  
  // Function to get social icon SVG
  function getSocialIcon(icon: string) {
    switch (icon) {
      case 'twitter':
        return {
          path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
          viewBox: '0 0 24 24'
        };
      case 'github':
        return {
          path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
          viewBox: '0 0 24 24'
        };
      case 'linkedin':
        return {
          path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
          viewBox: '0 0 24 24'
        };
      default:
        return {
          path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
          viewBox: '0 0 24 24'
        };
    }
  }
</script>

<footer
  class="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200"
  role="contentinfo"
  aria-label="Site footer"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
    <!-- Main Footer Content - Centered 4-column layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      <!-- Brand Column - Full width on mobile, 2 columns on desktop -->
      <div class="lg:col-span-2">
        <div class="flex flex-col space-y-4">
          <div class="flex items-center gap-3">
            <img
              src="/Logo.png"
              alt="Callaback Logo"
              class="w-12 h-12"
              width="48"
              height="48"
              loading="lazy"
            />
            <div>
              <span class="text-2xl font-bold text-gray-900 tracking-tight">
                callaback<span class="text-orange-500">.com</span>
              </span>
              <p class="text-sm text-gray-600 mt-1">
                The modern callback solution
              </p>
            </div>
          </div>
          
          <p class="text-gray-600 text-lg leading-relaxed max-w-md">
            Transform your customer communication with seamless callback technology.
            Faster response times, higher satisfaction.
          </p>
          
          <!-- Social Links -->
          <div class="flex items-center space-x-4 pt-2">
            <span class="text-sm font-medium text-gray-700">
              Follow us:
            </span>
            <div class="flex items-center space-x-3">
              {#each socialLinks as link}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  aria-label={`Follow us on ${link.label}`}
                  title={link.label}
                >
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox={getSocialIcon(link.icon).viewBox}
                    aria-hidden="true"
                  >
                    <path d={getSocialIcon(link.icon).path} />
                  </svg>
                </a>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <!-- Company Links -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Company
        </h3>
        <ul class="space-y-3">
          {#each footerLinks.company as link}
            <li>
              <a
                href={link.url}
                class="text-gray-600 hover:text-orange-600 transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded px-1"
              >
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Support Links -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Support
        </h3>
        <ul class="space-y-3">
          {#each footerLinks.support as link}
            <li>
              <a
                href={link.url}
                class="text-gray-600 hover:text-orange-600 transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded px-1"
              >
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Divider -->
    <div class="mt-12 pt-8 border-t border-gray-300">
      <!-- Centered copyright and legal links -->
      <div class="flex flex-col items-center space-y-6">
        <!-- Copyright - Centered -->
        <div class="text-center">
          <p class="text-gray-600 text-sm">
            &copy; {currentYear} Invariant Ego, LLC. All rights reserved.
          </p>
        </div>

        <!-- Legal Links - Centered with consistent spacing -->
        <div class="flex flex-wrap justify-center gap-6">
          {#each footerLinks.legal as link}
            <a
              href={link.url}
              class="text-sm text-gray-500 hover:text-orange-600 transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded px-1"
            >
              {link.name}
            </a>
          {/each}
        </div>

        <!-- Trust badges and language selector - Centered stack -->
        <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full max-w-3xl">
          <!-- Trust badges - Centered -->
          <div class="flex items-center justify-center space-x-4">
            <div class="flex items-center space-x-2 text-sm text-gray-500">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Certificate of Fact of Good Standing</span>
            </div>
          </div>
          
          <!-- Language Selector - Centered -->
          <div class="flex items-center justify-center space-x-2">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <select
              class="bg-transparent text-sm text-gray-600 border-none focus:outline-none focus:ring-0 cursor-pointer"
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Smooth transitions */
  footer {
    transition: all 0.3s ease;
  }
  
  /* Hover effects */
  a, button {
    transition: all 0.2s ease;
  }
  
  /* Focus styles */
  :focus-visible {
    outline: 2px solid #f97316;
    outline-offset: 2px;
  }
  
  /* Ensure proper centering */
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  
  /* Responsive grid adjustments */
  @media (max-width: 1024px) {
    .grid-cols-4 {
      grid-template-columns: repeat(2, 1fr);
    }
    .lg\\:col-span-2 {
      grid-column: span 2;
    }
  }
  
  @media (max-width: 640px) {
    .grid-cols-2 {
      grid-template-columns: 1fr;
    }
    .lg\\:col-span-2 {
      grid-column: span 1;
    }
  }
</style>
