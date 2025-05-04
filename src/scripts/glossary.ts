/**
 * Glossary and wiki-style link functionality
 */

// Interface for glossary terms
interface GlossaryTerm {
    term: string;
    definition: string;
  }
  
  // Load glossary terms from a data source
  export async function loadGlossaryTerms(): Promise<Record<string, string>> {
    try {
      // TODO: Replace with actual data fetching logic from Obsidian or other source 
      // This is a simplified example that returns static data
      return {
        'astro': 'A modern static site builder with a focus on performance',
        'obsidian': 'A powerful knowledge base that works on top of a local folder of plain text Markdown files',
        'frontmatter': 'Metadata at the beginning of a Markdown file, written in YAML format',
        'tailwind': 'A utility-first CSS framework for rapidly building custom user interfaces',
        'markdown': 'A lightweight markup language with plain-text formatting syntax',
        'static site': 'A website that consists of pre-built HTML, CSS, and JavaScript files',
        'jamstack': 'A modern web development architecture based on JavaScript, APIs, and Markup',
      };
    } catch (error) {
      console.error('Error loading glossary terms:', error);
      return {};
    }
  }
  
  // Process text content for wiki-style links
  export async function processWikiLinks(container: HTMLElement): Promise<void> {
    if (!container) return;
    
    // Load glossary terms
    const terms = await loadGlossaryTerms();
    
    // Process explicit wiki-links: [[term]]
    const wikiLinkRegex = /\[\[(.*?)\]\]/g;
    
    // Get all text nodes
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip nodes in pre, code, and script elements
          const parentNodeName = node.parentNode?.nodeName.toUpperCase();
          if (['PRE', 'CODE', 'SCRIPT', 'STYLE'].includes(parentNodeName || '')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      },
      false
    );
    
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }
    
    // Process each text node for wiki links
    textNodes.forEach(textNode => {
      if (wikiLinkRegex.test(textNode.nodeValue || '')) {
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;
        
        // Reset regex to start from beginning
        wikiLinkRegex.lastIndex = 0;
        
        while ((match = wikiLinkRegex.exec(textNode.nodeValue || '')) !== null) {
          // Add text before the match
          if (match.index > lastIndex) {
            fragment.appendChild(
              document.createTextNode(textNode.nodeValue?.substring(lastIndex, match.index) || '')
            );
          }
          
          const termName = match[1].trim();
          const normalizedTerm = termName.toLowerCase();
          const definition = terms[normalizedTerm];
          
          if (definition) {
            // Create glossary term span
            const glossarySpan = document.createElement('span');
            glossarySpan.className = 'glossary-term';
            glossarySpan.setAttribute('data-term', termName);
            glossarySpan.setAttribute('tabindex', '0');
            glossarySpan.textContent = termName;
            
            // Create tooltip
            const tooltip = document.createElement('span');
            tooltip.className = 'glossary-tooltip';
            tooltip.textContent = definition;
            glossarySpan.appendChild(tooltip);
            
            fragment.appendChild(glossarySpan);
          } else {
            // If term not found, just add the text without wiki brackets
            fragment.appendChild(document.createTextNode(termName));
          }
          
          lastIndex = match.index + match[0].length;
        }
        
        // Add any remaining text
        if (lastIndex < (textNode.nodeValue?.length || 0)) {
          fragment.appendChild(
            document.createTextNode(textNode.nodeValue?.substring(lastIndex) || '')
          );
        }
        
        // Replace original text node with fragment
        if (textNode.parentNode) {
          textNode.parentNode.replaceChild(fragment, textNode);
        }
      }
    });
  }
  
  // Initialize glossary functionality
  export function initGlossary(): void {
    const glossaryContent = document.querySelector('.glossary-content');
    
    if (glossaryContent instanceof HTMLElement) {
      processWikiLinks(glossaryContent).catch(err => {
        console.error('Error processing wiki links:', err);
      });
    }
  }