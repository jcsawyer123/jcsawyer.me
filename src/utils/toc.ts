/**
 * Table of Contents utilities - moved from utils to scripts for consistency
 */

// A reusable module for table of contents highlighting
export function initTableOfContents() {
  let observer: IntersectionObserver | null = null;
  let activeHeadings: Element[] = [];
  
  // Initialize TOC highlighting
  function init() {
    // Clean up existing observer
    cleanup();
    
    const toc = document.querySelector('.toc');
    if (!toc) return;
    
    // Cache all headings that should be observed
    activeHeadings = Array.from(document.querySelectorAll('article h2, article h3'));
    
    if (activeHeadings.length === 0) return;
    
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (!id) return;
            
            // Query only for active links
            const links = document.querySelectorAll('.toc-link');
            links.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
            if (activeLink) {
              activeLink.classList.add('active');
            }
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0.1 }
    );
    
    // Observe all headings
    activeHeadings.forEach(heading => {
      observer?.observe(heading);
    });
  }
  
  // Cleanup function to remove observer when needed
  function cleanup() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    activeHeadings = [];
  }
  
  // Initialize on page load
  init();
  
  // Return the cleanup function
  return cleanup;
}