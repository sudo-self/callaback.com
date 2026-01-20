// src/lib/stores/theme.js

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createThemeStore() {
  const { subscribe, set, update } = writable('light');

  // Initialize theme
  if (browser) {
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = saved || (systemDark ? 'dark' : 'light');
    
    set(initialTheme);
    
    // Apply initial theme
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return {
    subscribe,
    toggle: () => {
      update(current => {
        const newTheme = current === 'light' ? 'dark' : 'light';
        
        if (browser) {
          localStorage.setItem('theme', newTheme);
          
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        
        return newTheme;
      });
    }
  };
}

export const theme = createThemeStore();
