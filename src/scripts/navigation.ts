/**
 * Navigation-related utilities for navbar, mobile menu, and scroll effects
 */

// Initialize navbar scroll effect
export function initNavbarScroll() {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;
    
    const scrollHandler = () => {
      if (window.scrollY > 10) {
        navbar.classList.add('shadow-lg');
      } else {
        navbar.classList.remove('shadow-lg');
      }
    };
    
    window.addEventListener('scroll', scrollHandler);
    scrollHandler(); // Initial check
    
    // Return cleanup function for event listeners
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }
  
  // Initialize mobile menu functionality
  export function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuButton || !mobileMenu) return;
    
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
    
    // Return cleanup function for event listeners
    return () => {
      menuButton.removeEventListener('click', toggleMenu);
      document.removeEventListener('click', handleOutsideClick);
    };
  }
  
  // Handle smooth scroll for anchor links
  export function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
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
      });
    });
  }
  
  // Initialize active link highlighting based on scroll position
  export function initScrollSpy() {
    // Get all section elements
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length === 0) return;
    
    const navbar = document.getElementById('main-navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    // Scroll event handler
    const scrollHandler = () => {
      // Get current scroll position
      const scrollPosition = window.scrollY + navbarHeight + 10;
      
      // Check each section
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Find corresponding nav links
          document.querySelectorAll(`a[href="/#${sectionId}"], a[href="#${sectionId}"]`).forEach(link => {
            link.classList.add('active');
          });
        } else {
          document.querySelectorAll(`a[href="/#${sectionId}"], a[href="#${sectionId}"]`).forEach(link => {
            link.classList.remove('active');
          });
        }
      });
    };
    
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('load', scrollHandler);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('load', scrollHandler);
    };
  }
  
  // Initialize all navigation functionality
  export function initNavigation() {
    const cleanupNavbar = initNavbarScroll();
    const cleanupMobileMenu = initMobileMenu();
    initSmoothScroll();
    const cleanupScrollSpy = initScrollSpy();
    
    // Return a combined cleanup function
    return () => {
      if (cleanupNavbar) cleanupNavbar();
      if (cleanupMobileMenu) cleanupMobileMenu();
      if (cleanupScrollSpy) cleanupScrollSpy();
    };
  }