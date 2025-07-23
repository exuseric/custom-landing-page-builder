import type { SimpleTestimonialBlock, ContentWithGridBlock, Block, LexicalContent } from "./types";


// Helper function to extract text from a node's children
function extractTextFromNode(node: any): string {
  if (!node.children || node.children.length === 0) return "";

  return node.children
    .map((child: any) => child.text)
    .filter(Boolean)
    .join("");
}

// Helper function to process a single list item
function processListItem(listItem: any): string {
  const text = extractTextFromNode(listItem);
  return text.trim() ? `<li>${text}</li>` : "";
}

// Helper function to process a group of consecutive list items
function processListItems(listItems: any[]): string {
  const listContent = listItems
    .map(processListItem)
    .filter(Boolean)
    .join("\n");

  if (!listContent) return "";

  // Determine list type based on value property
  // If value is a number, it's likely an ordered list
  const isOrderedList = typeof listItems[0]?.value === "number";
  const listTag = isOrderedList ? "ol" : "ul";

  console.log(`<${listTag}>\n${listContent}\n</${listTag}>`)

  return `<${listTag}>\n${listContent}\n</${listTag}>`;
}

// Helper function to process non-list nodes (headings, paragraphs, etc.)
function processRegularNode(node: any): string {
  const text = extractTextFromNode(node);

  if (!text.trim()) return "";

  // Determine the appropriate HTML tag based on node type
  const nodeType = node.type;
  const tag = node.tag; // For heading elements like h3, h4, etc.

  if (nodeType === "heading" && tag) {
    // Use the specific heading tag (h1, h2, h3, etc.)
    return `<${tag}>${text}</${tag}>`;
  } else if (nodeType === "heading") {
    // Default to h2 if no specific tag is provided
    return `<h2>${text}</h2>`;
  } else if (nodeType === "paragraph" || !nodeType) {
    // Default to paragraph for regular text
    return `<p>${text}</p>`;
  } else {
    // For other types, wrap in paragraph as fallback
    return `<p>${text}</p>`;
  }
}

// Helper function to collect consecutive list items starting from a given index
function collectConsecutiveListItems(children: any[], startIndex: number): { listItems: any[], nextIndex: number } {
  const listItems: any[] = [];
  let i = startIndex;

  while (i < children.length && children[i].type === "listitem") {
    listItems.push(children[i]);
    i++;
  }

  console.log("Collected list items:", listItems);

  return { listItems, nextIndex: i };
}

// Main function to extract text from Lexical content with HTML wrapping
// export function extractLexicalText(lexicalContent: LexicalContent | null | undefined): string {
//   if (!lexicalContent?.root?.children) return "";
//   console.log("Extracting lexical text from content:", lexicalContent?.root?.children);
//   try {
//     const result: string[] = [];
//     const children = lexicalContent.root.children;
//     let i = 0;

//     while (i < children.length) {
//       const currentNode = children[i];

//       if (currentNode.type === "listitem") {
//         // Collect and process consecutive list items
//         const { listItems, nextIndex } = collectConsecutiveListItems(children, i);
//         const listHtml = processListItems(listItems);

//         if (listHtml) {
//           result.push(listHtml);
//         }

//         i = nextIndex;
//       } else {
//         // Process regular nodes (headings, paragraphs, etc.)
//         const nodeHtml = processRegularNode(currentNode);

//         if (nodeHtml) {
//           result.push(nodeHtml);
//         }

//         i++;
//       }
//     }

//     return result.join("\n");
//   } catch (error) {
//     console.warn('Failed to extract lexical text:', error);
//     return "";
//   }
// }


function extractTextNode(node: any): string {
  const tag = node.tag || 'h3';
  const text = node.children.map((node: any) => node.text || "").join("");

  if (node.type === "paragraph") {
    return `<p>${text}</p>`;
  } else if (node.type === "heading") {
    return `<${tag}>${text}</${tag}>`;
  } else {
    const tag = node.tag
    return `<${tag}>${text}</${tag}>`;
  }
}

function extractListItem(node: any): string {
  const tag = node.tag || 'ul';
  const listItems = node.children;
  console.log("List items:", listItems);
  
  const items = listItems.map((item: any) => {
    const listItemContent = item.children.map((child: any) => child.text).join('');
    console.log("List item text:", `<li>${listItemContent}</li>`);
    return `<li>${listItemContent}</li>`;
  }).join('');
  
  console.log("Extracted list items:", items);
  const result = `<${tag}>${items}</${tag}>`;
  console.log(result);
  return result;
}
// Helper function to extract text from Lexical content with HTML wrapping
export function extractLexicalText(lexicalContent: LexicalContent | null | undefined): string {
  if (!lexicalContent?.root?.children) return "";
  const children = lexicalContent.root.children;
  return children.map((child) => {
    // console.log("Child node:", child);
    if (child.type === "paragraph") {
      return extractTextNode(child)
    }

    if (child.type === "list") {
      // console.log("List item node:", child);
      return extractListItem(child);
    }
  }).filter(Boolean).join("\n")
  // try {
  //   return lexicalContent.root.children
  //     .map(paragraph => {
  //       if (!paragraph.children || paragraph.children.length === 0) return "";

  //       // Extract text from all child nodes
  //       const text = paragraph.children
  //         .map(node => node.text)
  //         .filter(Boolean)
  //         .join("");


  //       if (!text.trim()) return "";

  //       // Determine the appropriate HTML tag based on paragraph type
  //       const paragraphType = paragraph.type;
  //       const tag = paragraph.tag; // For heading elements like h3, h4, etc.

  //       if (paragraphType === "heading" && tag) {
  //         // Use the specific heading tag (h1, h2, h3, etc.)
  //         return `<${tag}>${text}</${tag}>`;
  //       } else if (paragraphType === "heading") {
  //         // Default to h2 if no specific tag is provided
  //         return `<h2>${text}</h2>`;
  //       } else if (paragraphType === "paragraph" || !paragraphType) {
  //         // Default to paragraph for regular text
  //         return `<p>${text}</p>`;
  //       } else {
  //         // For other types, wrap in paragraph as fallback
  //         return `<${tag}>${text}</${tag}>`;
  //       }
  //     })
  //     .filter(Boolean)
  //     .join("\n");
  // } catch (error) {
  //   console.warn('Failed to extract lexical text:', error);
  //   return "";
  // }
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
export function getTestimonialText(testimonialBlock: SimpleTestimonialBlock): string[] {
  return testimonialBlock.testimonies.map(t => extractLexicalText(t.testimony));
}

/**
 * Helper for getting testimonial data with titles and text
 * @param testimonialBlock - The testimonial block to extract data from
 * @returns Array of testimonial objects with title and text
 */
export function getTestimonialData(testimonialBlock: SimpleTestimonialBlock) {
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
export function getTestimonialSummary(testimonialBlock: SimpleTestimonialBlock) {
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