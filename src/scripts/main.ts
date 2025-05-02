/**
 * Main script initialization
 * This file serves as the entry point for all client-side scripts
 */

import { initThemeToggle, setTheme, getCurrentTheme } from './theme';
import { initNavigation } from './navigation';
import { initGlossary } from './glossary';

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
}

// Initialize table of contents highlighting
function initTableOfContents() {
  const toc = document.querySelector('.toc');
  if (!toc) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          document.querySelectorAll('.toc-link').forEach((link) => {
            link.classList.remove('active');
          });
          document
            .querySelector(`.toc-link[href="#${id}"]`)
            ?.classList.add('active');
        }
      });
    },
    { rootMargin: '0px 0px -80% 0px', threshold: 0.1 }
  );
  
  // Observe all headings
  document.querySelectorAll('article h2, article h3').forEach((heading) => {
    observer.observe(heading);
  });
}

// Main initialization function
function init() {
  // Initialize theme first to avoid flicker
  const theme = getCurrentTheme();
  setTheme(theme);
  
  // Initialize UI components
  initThemeToggle();
  initNavigation();
  initGlossary();
  initAccessibility();
  initTableOfContents();
  
  // Initialize any page-specific features
  const pageInit = window.__pageInit;
  if (typeof pageInit === 'function') {
    pageInit();
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);

// Re-initialize on page transitions (for Astro View Transitions)
document.addEventListener('astro:page-load', init);

// Cleanup before page transitions
document.addEventListener('astro:before-swap', () => {
  // Any cleanup needed before page transition
});

// Type declaration for global namespace
declare global {
  interface Window {
    __pageInit?: () => void;
  }
}