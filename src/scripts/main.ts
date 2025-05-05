/**
 * Main script initialization
 * This file serves as the entry point for all client-side scripts
 */

import { initThemeToggle, setTheme, getCurrentTheme } from './theme';
import { initNavigation } from './navigation';
import { initGlossary } from './glossary';
import { initTableOfContentsHighlighting } from '../utils/toc';

// Flag to track initialization state
let isInitialized = false;
let cleanupFunctions: Array<(() => void) | null> = [];

// Initialize accessibility features
function initAccessibility() {
  // Add skip-to-content link for keyboard users
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400';
  skipLink.textContent = 'Skip to main content';
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Ensure main content is marked for screen readers
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.id = 'main-content';
    mainContent.setAttribute('tabindex', '-1');
  }
  
  // No cleanup needed
  return null;
}

// Initialize table of contents highlighting
function initTableOfContents() {
  const tocHighlighting = initTableOfContentsHighlighting();
  tocHighlighting.init();
  
  return () => {
    tocHighlighting.cleanup();
  };
}

// Main initialization function
function init() {
  // Prevent multiple initializations
  if (isInitialized) {
    // Just update theme without re-initializing everything
    const theme = getCurrentTheme();
    setTheme(theme);
    return;
  }
  
  isInitialized = true;
  
  // Initialize theme first to avoid flicker
  const theme = getCurrentTheme();
  setTheme(theme);
  
  // Clean up any previous functions
  cleanupFunctions.forEach(cleanup => {
    if (typeof cleanup === 'function') {
      cleanup();
    }
  });
  
  // Store cleanup functions
  cleanupFunctions = [
    initThemeToggle(),
    initNavigation(),
    initGlossary(),
    initAccessibility(),
    initTableOfContents()
  ];
  
  // Initialize any page-specific features
  const pageInit = window.__pageInit;
  if (typeof pageInit === 'function') {
    pageInit();
  }
}

// Handle cleanup on page transitions
function cleanup() {
  cleanupFunctions.forEach(cleanup => {
    if (typeof cleanup === 'function') {
      cleanup();
    }
  });
  cleanupFunctions = [];
  isInitialized = false;
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);

// Re-initialize on page transitions (for Astro View Transitions)
document.addEventListener('astro:after-swap', init);

// Cleanup before page transitions
document.addEventListener('astro:before-swap', cleanup);

// Type declaration for global namespace
declare global {
  interface Window {
    __pageInit?: () => void;
  }
}