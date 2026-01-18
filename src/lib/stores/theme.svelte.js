// src/lib/stores/theme.svelte.js
import { browser } from '$app/environment';

class ThemeStore {
  current = $state('light');
  
  constructor() {
    if (browser) {
      // Initialize from localStorage or system preference
      const saved = localStorage.getItem('theme');
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.current = saved || (systemDark ? 'dark' : 'light');
      this.apply();
    }
  }
  
  toggle() {
    this.current = this.current === 'light' ? 'dark' : 'light';
    this.apply();
  }
  
  apply() {
    if (!browser) return;
    
    if (this.current === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}

export const themeStore = new ThemeStore();
