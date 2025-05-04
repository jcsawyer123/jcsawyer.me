/**
 * Theme management utilities
 */

// Store the theme key in a constant for consistency
const THEME_STORAGE_KEY = 'theme-preference';

// Function to update icon visibility based on current theme
export function updateThemeIcons(theme: string) {
  const lightIcon = document.getElementById('theme-toggle-light-icon');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  
  if (!lightIcon || !darkIcon) {
    console.warn('Theme icons not found in the DOM');
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
  // Delay execution slightly to ensure DOM is fully loaded
  setTimeout(() => {
    const themeToggleButton = document.getElementById('theme-toggle');
    
    if (!themeToggleButton) {
      console.warn('Theme toggle button not found in the DOM');
      return;
    }
    
    // Set initial icon
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
    
    // Add click listener
    themeToggleButton.addEventListener('click', () => {
      toggleTheme();
    });
    
    // Make the button visible now that it's functional
    themeToggleButton.classList.remove('opacity-0');
    themeToggleButton.classList.add('opacity-100');
    
    console.log('Theme toggle initialized with theme:', currentTheme);
  }, 50);
}