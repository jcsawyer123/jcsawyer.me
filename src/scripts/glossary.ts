/**
 * Glossary and wiki-style link functionality
 */

// Interface for glossary terms
interface GlossaryTerm {
  term: string;
  definition: string;
}

// Cache for glossary terms to avoid repeated fetches
let cachedTerms: Record<string, string> | null = null;

// Load glossary terms from a data source
export async function loadGlossaryTerms(): Promise<Record<string, string>> {
  // Return cached terms if available
  if (cachedTerms) {
    return cachedTerms;
  }
  
  try {
    // TODO: Replace with actual data fetching logic from Obsidian or other source 
    // This is a simplified example that returns static data
    cachedTerms = {
      'astro': 'A modern static site builder with a focus on performance',
      'obsidian': 'A powerful knowledge base that works on top of a local folder of plain text Markdown files',
      'frontmatter': 'Metadata at the beginning of a Markdown file, written in YAML format',
      'tailwind': 'A utility-first CSS framework for rapidly building custom user interfaces',
      'markdown': 'A lightweight markup language with plain-text formatting syntax',
      'static site': 'A website that consists of pre-built HTML, CSS, and JavaScript files',
      'jamstack': 'A modern web development architecture based on JavaScript, APIs, and Markup',
    };
    
    return cachedTerms;
  } catch (error) {
    console.error('Error loading glossary terms:', error);
    return {};
  }
}

// Create a document fragment with glossary spans
function createGlossaryFragment(
  textContent: string,
  match: RegExpExecArray,
  lastIndex: number,
  termName: string,
  definition: string | undefined
): { fragment: DocumentFragment; newLastIndex: number } {
  const fragment = document.createDocumentFragment();
  
  // Add text before the match
  if (match.index > lastIndex) {
    fragment.appendChild(
      document.createTextNode(textContent.substring(lastIndex, match.index))
    );
  }
  
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
  
  return { 
    fragment, 
    newLastIndex: match.index + match[0].length 
  };
}

// Process text content for wiki-style links
export async function processWikiLinks(container: HTMLElement): Promise<void> {
  if (!container) return;
  
  // Load glossary terms
  const terms = await loadGlossaryTerms();
  
  // Process explicit wiki-links: [[term]]
  const wikiLinkRegex = /\[\[(.*?)\]\]/g;
  
  // Use a more efficient TreeWalker configuration - only process nodes that might contain wiki links
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
        
        // Quick test for bracket pattern before running full regex
        if ((node.nodeValue || '').includes('[[')) {
          return NodeFilter.FILTER_ACCEPT;
        }
        
        return NodeFilter.FILTER_SKIP;
      }
    },
    false
  );
  
  // Process matching text nodes
  let textNode: Text | null;
  const nodesToProcess: Array<{ node: Text, replacements: DocumentFragment }> = [];
  
  // First pass: collect all nodes needing processing
  while ((textNode = walker.nextNode() as Text)) {
    const nodeValue = textNode.nodeValue || '';
    const matches = nodeValue.match(wikiLinkRegex);
    
    if (!matches) continue;
    
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    
    // Reset regex to start from beginning
    wikiLinkRegex.lastIndex = 0;
    
    // Process each match in this text node
    while ((match = wikiLinkRegex.exec(nodeValue)) !== null) {
      const termName = match[1].trim();
      const normalizedTerm = termName.toLowerCase();
      const definition = terms[normalizedTerm];
      
      const { fragment: termFragment, newLastIndex } = createGlossaryFragment(
        nodeValue, match, lastIndex, termName, definition
      );
      
      fragment.appendChild(termFragment);
      lastIndex = newLastIndex;
    }
    
    // Add any remaining text
    if (lastIndex < nodeValue.length) {
      fragment.appendChild(document.createTextNode(nodeValue.substring(lastIndex)));
    }
    
    // Store for later batch processing
    nodesToProcess.push({ node: textNode, replacements: fragment });
  }
  
  // Second pass: perform all DOM updates (batch to minimize reflows)
  nodesToProcess.forEach(({ node, replacements }) => {
    if (node.parentNode) {
      node.parentNode.replaceChild(replacements, node);
    }
  });
}

// Initialize glossary functionality
export function initGlossary() {
  const glossaryContent = document.querySelector('.glossary-content');
  
  if (glossaryContent instanceof HTMLElement) {
    processWikiLinks(glossaryContent).catch(err => {
      console.error('Error processing wiki links:', err);
    });
  }
  
  // Return no-op cleanup function
  return () => {
    // No active listeners to clean up
    // Reset cache on cleanup for fresh data on next init
    cachedTerms = null;
  };
}