import type { TestimonialBlock, ContentWithGridBlock, Block, LexicalContent } from "./types";

// Helper function to extract text from Lexical content
export function extractLexicalText(lexicalContent: LexicalContent | null | undefined): string {
  if (!lexicalContent?.root?.children) return "";
  
  try {
    return lexicalContent.root.children
      .flatMap(paragraph => 
        paragraph.children?.map(node => node.text) || []
      )
      .filter(Boolean)
      .join("\n\n");
  } catch (error) {
    console.warn('Failed to extract lexical text:', error);
    return "";
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

/**
 * Helper for getting testimonial content as plain text
 * @param testimonialBlock - The testimonial block to extract text from
 * @returns Array of testimonial texts as strings
 */
export function getTestimonialText(testimonialBlock: TestimonialBlock): string[] {
  return testimonialBlock.testimonies.map(t => extractLexicalText(t.testimony));
}

/**
 * Helper for getting testimonial data with titles and text
 * @param testimonialBlock - The testimonial block to extract data from
 * @returns Array of testimonial objects with title and text
 */
export function getTestimonialData(testimonialBlock: TestimonialBlock) {
  return testimonialBlock.testimonies.map(testimony => ({
    id: testimony.id,
    title: testimony.title,
    text: extractLexicalText(testimony.testimony)
  }));
}

/**
 * Helper for getting card grid content
 * @param contentGridBlock - The content grid block to extract items from
 * @returns Array of card objects with title, text, and image
 */
export function getCardGridItems(contentGridBlock: ContentWithGridBlock) {
  return contentGridBlock["card grid"].map(card => ({
    id: card.id,
    title: card.title,
    text: extractLexicalText(card.body),
    image: card.image
  }));
}

/**
 * Helper for getting card grid content with additional metadata
 * @param contentGridBlock - The content grid block to extract data from
 * @returns Object with grid metadata and card items
 */
export function getCardGridData(contentGridBlock: ContentWithGridBlock) {
  return {
    id: contentGridBlock.id,
    title: contentGridBlock.title,
    anchorId: contentGridBlock["anchor id"],
    body: extractLexicalText(contentGridBlock.body),
    highlight: contentGridBlock.highlight,
    cardType: contentGridBlock["card type"],
    cards: getCardGridItems(contentGridBlock)
  };
}

/**
 * Helper for getting testimonial block summary
 * @param testimonialBlock - The testimonial block to summarize
 * @returns Object with block metadata and testimonial count
 */
export function getTestimonialSummary(testimonialBlock: TestimonialBlock) {
  return {
    id: testimonialBlock.id,
    title: testimonialBlock.title,
    description: extractLexicalText(testimonialBlock.description),
    testimonialCount: testimonialBlock.testimonies.length,
    testimonials: getTestimonialData(testimonialBlock)
  };
}

/*
 * HELPER FUNCTIONS FOR NEW BLOCK TYPES:
 * 
 * When adding new block types, consider adding specific helper functions:
 * 
 * // Helper for getting testimonial content
 * export function getTestimonialText(testimonialBlock: TestimonialBlock): string[] {
 *   return testimonialBlock.testimonies.map(t => extractLexicalText(t.testimony));
 * }
 * 
 * // Helper for getting card grid content
 * export function getCardGridItems(contentGridBlock: ContentWithGridBlock) {
 *   return contentGridBlock["card grid"].map(card => ({
 *     title: card.title,
 *     text: extractLexicalText(card.body),
 *     image: card.image
 *   }));
 * }
 */