/**
 * Theme management utilities - Simplified and consolidated
 */

// Store the theme key in a constant for consistency
const THEME_STORAGE_KEY = 'theme';

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
  updateIcons(theme);
}

// Function to update icon visibility based on current theme
function updateIcons(theme: string) {
  const lightIcon = document.getElementById('theme-toggle-light-icon');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  
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

// Function to toggle the theme
export function toggleTheme() {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Set the new theme
  setTheme(newTheme);
  
  return newTheme;
}

// Initialize theme handling
export function initTheme() {
  // Set initial theme
  const currentTheme = getCurrentTheme();
  setTheme(currentTheme);
  
  // Add toggle button handler
  const themeToggleButton = document.getElementById('theme-toggle');
  
  if (themeToggleButton) {
    const toggleHandler = () => {
      toggleTheme();
    };
    
    themeToggleButton.addEventListener('click', toggleHandler);
    
    // Return cleanup function
    return () => {
      themeToggleButton.removeEventListener('click', toggleHandler);
    };
  }
  
  // Add system theme change handler
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const systemThemeChangeHandler = (e: MediaQueryListEvent) => {
    // Only apply if no user preference is stored
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  };
  
  mediaQuery.addEventListener('change', systemThemeChangeHandler);
  
  // Return combined cleanup function
  return () => {
    if (themeToggleButton) {
      themeToggleButton.removeEventListener('click', toggleHandler);
    }
    mediaQuery.removeEventListener('change', systemThemeChangeHandler);
  };
}