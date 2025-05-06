/**
 * Navigation-related utilities for navbar, mobile menu, and scroll effects
 * Streamlined to remove duplicated functionality with inline scripts
 */

// Initialize navbar scroll effect
function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return null;
  
  const scrollHandler = () => {
    if (window.scrollY > 10) {
      navbar.classList.add('shadow-lg');
    } else {
      navbar.classList.remove('shadow-lg');
    }
  };
  
  window.addEventListener('scroll', scrollHandler);
  scrollHandler(); // Initial check
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', scrollHandler);
  };
}

// Initialize mobile menu functionality
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuButton || !mobileMenu) return null;
  
  // Toggle menu visibility
  const toggleMenu = (e: Event) => {
    e.stopPropagation(); // Prevent closing immediately if clicking outside
    
    const isExpanded = mobileMenu.classList.toggle('hidden') === false;
    menuButton.setAttribute('aria-expanded', isExpanded.toString());
  };
  
  // Close menu if clicking outside
  const handleOutsideClick = (event: Event) => {
    const navbar = document.getElementById('main-navbar');
    if (navbar && 
        !navbar.contains(event.target as Node) && 
        !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  };
  
  menuButton.addEventListener('click', toggleMenu);
  document.addEventListener('click', handleOutsideClick);
  
  // Return cleanup function
  return () => {
    menuButton.removeEventListener('click', toggleMenu);
    document.removeEventListener('click', handleOutsideClick);
  };
}

// Handle smooth scroll for anchor links
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  const cleanupFunctions: Array<() => void> = [];
  
  anchorLinks.forEach(link => {
    const clickHandler = (e: Event) => {
      const targetId = link.getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');
      
      if (targetElement) {
        e.preventDefault();
        
        // Account for fixed header height
        const navbar = document.getElementById('main-navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update URL without reload
        history.pushState(null, '', `#${targetId}`);
      }
    };
    
    link.addEventListener('click', clickHandler);
    cleanupFunctions.push(() => {
      link.removeEventListener('click', clickHandler);
    });
  });
  
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
}

// Initialize all navigation functionality
export function initNavigation() {
  // Collect all cleanup functions that are returned
  const cleanupFunctions = [
    initNavbarScroll(),
    initMobileMenu(),
    initSmoothScroll()
  ].filter(Boolean) as Array<() => void>;
  
  // Return a combined cleanup function
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
} 