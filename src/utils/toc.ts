/**
 * Table of Contents utilities
 */

export function initTableOfContentsHighlighting() {
    let observer: IntersectionObserver | null = null;
    let activeHeadings: Element[] = [];
    
    return {
      init() {
        // Clean up existing observer
        this.cleanup();
        
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
                
                // Use more efficient selector - query only for active links
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
      },
      
      cleanup() {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
        activeHeadings = [];
      }
    };
  }