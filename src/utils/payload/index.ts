import type { ParsedPage, Block } from "./types";
import { parsePage } from "./handle-response";
import type { PageKey } from "./page-keys";

export class LandingPageError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'LandingPageError';
  }
}

/**
 * Fetches and parses a landing page from the API, returning only the specified keys.
 * 
 * @param pageId - The Id to fetch the page data for
 * @param keys - Array of page keys to include in the response
 * @returns Promise resolving to an object containing only the requested page properties
 * 
 * @example
 * ```typescript
 * const pageData = await fetchPage(
 *   1,
 *   ['title', 'seo', 'blocks', 'navigation']
 * );
 * ```
 */
export async function fetchPage<T extends PageKey>(
  pageId: number | string,
  keys: T[]
): Promise<Pick<ParsedPage, T>> {
  try {
    const res = await fetch(`http://localhost:3000/api/page/${pageId}?depth=2&draft=false&locale=undefined`);
    
    if (!res.ok) {
      throw new LandingPageError(
        `Failed to fetch landing page: ${res.status} ${res.statusText}`,
        res.status
      );
    }
    
    const json = await res.json();
    const parsed = parsePage(json);

    // Build result object with only requested keys
    const result = {} as Pick<ParsedPage, T>;
    for (const key of keys) {
      result[key] = parsed[key];
    }
    
    return result;
  } catch (error) {
    if (error instanceof LandingPageError) {
      throw error;
    }
    throw new LandingPageError(`Network or parsing error: ${error}`);
  }
}

// Helper functions for working with blocks
export function getBlocksByType<T extends Block['blockType']>(
  blocks: Block[],
  blockType: T
): Extract<Block, { blockType: T }>[] {
  return blocks.filter(block => block.blockType === blockType) as Extract<Block, { blockType: T }>[];
}

export function getBlockById(blocks: Block[], id: string): Block | undefined {
  return blocks.find(block => block.id === id);
}


// Usage examples:
/*
// Fetch specific page data
const pageData = await fetchPage(
  'https://api.example.com/page/1',
  ['title', 'seo', 'blocks', 'navigation']
);

// Work with specific block types
const heroBlocks = getBlocksByType(pageData.blocks, 'simple-hero');
const contactBlocks = getBlocksByType(pageData.blocks, 'simple-contact');

// Access typed block properties
heroBlocks.forEach(hero => {
  console.log(hero.heading); // ✅ TypeScript knows this exists
  console.log(hero.cover.alt); // ✅ TypeScript knows this exists
});

// Extract text from lexical content in content blocks
const contentBlocks = getBlocksByType(pageData.blocks, 'content-with-media');
contentBlocks.forEach(content => {
  const text = extractLexicalText(content.body);
  console.log(text); // Plain text extracted from lexical format
});
*/