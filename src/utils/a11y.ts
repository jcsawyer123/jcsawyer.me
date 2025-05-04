/**
 * Accessibility utility functions
 */

// Generate screen-reader-only attributes
export function getSrOnly(text: string) {
    return {
      class: 'sr-only',
      'aria-label': text,
    };
  }
  
  // Generate ARIA attributes for interactive elements
  export function getAriaExpanded(expanded: boolean, controlsId: string) {
    return {
      'aria-expanded': expanded ? 'true' : 'false',
      'aria-controls': controlsId,
    };
  }
  
  // Generate attributes for tabs
  export function getTabAttributes(isSelected: boolean, panelId: string, tabId: string) {
    return {
      role: 'tab',
      id: tabId,
      'aria-selected': isSelected ? 'true' : 'false',
      'aria-controls': panelId,
      tabIndex: isSelected ? 0 : -1,
    };
  }
  
  // Generate attributes for tab panels
  export function getTabPanelAttributes(isSelected: boolean, panelId: string, tabId: string) {
    return {
      role: 'tabpanel',
      id: panelId,
      'aria-labelledby': tabId,
      tabIndex: 0,
      hidden: !isSelected,
    };
  }
  
  // Generate attributes for accordions
  export function getAccordionHeadingAttributes(isExpanded: boolean, headingId: string, panelId: string) {
    return {
      id: headingId,
      'aria-expanded': isExpanded ? 'true' : 'false',
      'aria-controls': panelId,
    };
  }
  
  // Generate attributes for accordion panels
  export function getAccordionPanelAttributes(isExpanded: boolean, panelId: string, headingId: string) {
    return {
      id: panelId,
      role: 'region',
      'aria-labelledby': headingId,
      hidden: !isExpanded,
    };
  }
  
  // Focus management utilities
  export function trapFocus(element: HTMLElement) {
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Setup focus trap
    element.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        // If shift + tab and on first element, wrap to last
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // If tab and on last element, wrap to first
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
    
    // Return a function to remove the event listener
    return () => {
      element.removeEventListener('keydown', () => {});
    };
  }
  
  // Helper to create a unique ID for ARIA attributes
  export function generateId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
  }