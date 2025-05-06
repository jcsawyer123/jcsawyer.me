/**
 * Main script initialization
 * This file serves as the entry point for all client-side scripts
 */

import { initTheme } from './theme';
import { initNavigation } from './navigation';
import { initTableOfContents } from './toc';

// Flag to track initialization state
let isInitialized = false;
let cleanupFunctions: Array<(() => void) | undefined> = [];

// Initialize all functionality
function init() {
  // Prevent multiple initializations
  if (isInitialized) {
    return;
  }
  
  isInitialized = true;
  
  // Clean up any previous functions
  cleanup();
  
  // Store cleanup functions
  cleanupFunctions = [
    initTheme(),
    initNavigation(),
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

// Export the init and cleanup functions for explicit usage
export { init, cleanup };