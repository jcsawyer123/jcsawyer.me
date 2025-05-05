/**
 * Theme management utilities
 */

// Store the theme key in a constant for consistency
const THEME_STORAGE_KEY = 'theme-preference';

// Cache element references for performance
let lightIcon: HTMLElement | null = null;
let darkIcon: HTMLElement | null = null;
let themeToggleButton: HTMLElement | null = null;

// Function to update icon visibility based on current theme
export function updateThemeIcons(theme: string) {
  // Get elements only if not already cached
  if (!lightIcon) lightIcon = document.getElementById('theme-toggle-light-icon');
  if (!darkIcon) darkIcon = document.getElementById('theme-toggle-dark-icon');
  
  if (!lightIcon || !darkIcon) {
    return;
  }
  
  if (theme === 'dark') {
    lightIcon.classList.remove('hidden'); // Show sun when dark
    darkIcon.classList.add('hidden');
  } else {
    lightIcon.classList.add('hidden');
    darkIcon.classList.remove('hidden'); // Show moon when light
  }
}

// Function to get the current theme
export function getCurrentTheme(): string {
  // Check localStorage first
  if (typeof localStorage !== 'undefined' && localStorage.getItem(THEME_STORAGE_KEY)) {
    return localStorage.getItem(THEME_STORAGE_KEY) as string;
  }
  
  // Check user preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  // Default to light
  return 'light';
}

// Function to set the theme
export function setTheme(theme: string) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Save to localStorage
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  
  // Update icons if they exist
  updateThemeIcons(theme);
}

// Function to toggle the theme
export function toggleTheme() {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Set the new theme
  setTheme(newTheme);
  
  return newTheme;
}

// Initialize theme toggle functionality
export function initThemeToggle() {
  // Clear cached elements to ensure fresh references
  lightIcon = null;
  darkIcon = null;
  
  // Cache the button element
  themeToggleButton = document.getElementById('theme-toggle');
  
  if (!themeToggleButton) {
    return null;
  }
  
  // Set initial icon
  const currentTheme = getCurrentTheme();
  setTheme(currentTheme);
  
  // Create a bound event handler for the toggle
  const toggleHandler = () => {
    toggleTheme();
  };
  
  // Add click listener
  themeToggleButton.addEventListener('click', toggleHandler);
  
  // Make the button visible now that it's functional
  themeToggleButton.classList.remove('opacity-0');
  themeToggleButton.classList.add('opacity-100');
  
  // Return cleanup function
  return () => {
    if (themeToggleButton) {
      themeToggleButton.removeEventListener('click', toggleHandler);
    }
  };
}

// Add listener for system theme changes
export function initSystemThemeListener() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const systemThemeChangeHandler = (e: MediaQueryListEvent) => {
    // Only apply if no user preference is stored
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  };
  
  mediaQuery.addEventListener('change', systemThemeChangeHandler);
  
  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', systemThemeChangeHandler);
  };
}