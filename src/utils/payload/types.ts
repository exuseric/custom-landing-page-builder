export type Media = {
  id?: number;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  focalX?: number;
  focalY?: number;
  thumbnailURL?: string | null;
  updatedAt?: string;
  createdAt?: string;
};

export type LexicalNode = {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: string;
  version: number;
};

export type LexicalParagraph = {
  children: LexicalNode[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
  textFormat?: number;
  textStyle?: string;
  tag?: string; // For heading elements like h3, h4, etc.
};

export type LexicalContent = {
  root: {
    children: LexicalParagraph[];
    direction: string;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
};

export type ContactInfo = {
  phone: Array<{
    id: string;
    number: string;
    type: "mobile" | "whatsapp" | "landline";
  }>;
  email: Array<{
    id: string;
    email: string;
  }>;
};

export type LocationInfo = {
  address: LexicalContent;
  iframe: string;
};

// Block type definitions based on actual API response
export type HeroBlock = {
  id: string;
  blockType: "simple-hero";
  heading: string;
  excerpt: string;
  cover: Media;
  type: string;
  blockName: string | null;
};

export type WhyChooseUsColumnBlock = {
  id: string;
  blockType: "why-choose-us-column";
  title: string;
  description: LexicalContent;
  image: Media;
  highlight?:boolean;
  blockName: string | null;
  options: Array<{
    id: string;
    title: string;
    description: LexicalContent;
  }>;
};

export type ContentBlock = {
  id: string;
  blockType: "content-with-media";
  title: string;
  "anchor id": string;
  body: LexicalContent;
  image: Media;
  "text position": "left" | "right";
  highlight: boolean;
  blockName: string | null;
};

// NEW: Content with Grid block type
export type ContentWithGridBlock = {
  id: string;
  blockType: "content-with-grid";
  title: string;
  "anchor id": string;
  body: LexicalContent;
  highlight: boolean;
  "card type": "basic" | string; // Add other card types as needed
  blockName: string | null;
  "card grid": Array<{
    id: string;
    image: Media;
    title: string;
    body: LexicalContent;
  }>;
};

export type BasicCard = {
    id: string;
    image: Media;
    title: string;
    body: LexicalContent;
}

export type CallToActionBlock = {
  id: string;
  blockType: "simple-call-to-action";
  heading: string;
  description: LexicalContent;
  buttonText: string;
  blockName: string | null;
};

// NEW: Testimonial block type
export type TestimonialBlock = {
  id: string;
  blockType: "simple-testimonial";
  title: string;
  description: LexicalContent;
  blockName: string | null;
  testimonies: Array<{
    id: string;
    testimony: LexicalContent;
    title: string;
  }>;
};

export type ContactBlock = {
  id: string;
  blockType: "simple-contact";
  title: string;
  direction: "vertical" | "horizontal";
  blockName: string | null;
  contact: ContactInfo;
  location: LocationInfo;
};

// Union type for all blocks - UPDATE THIS when adding new block types
export type Block = 
  | HeroBlock 
  | WhyChooseUsColumnBlock 
  | ContentBlock 
  | ContentWithGridBlock  // NEW
  | CallToActionBlock 
  | TestimonialBlock      // NEW
  | ContactBlock;

/*
 * GUIDE FOR ADDING NEW BLOCK TYPES:
 * 
 * When the CMS adds new block types, follow these steps:
 * 
 * 1. Create a new type definition following the pattern above:
 *    - Use the exact blockType string from the API
 *    - Include all properties from the API response
 *    - Use LexicalContent for rich text fields
 *    - Use Media for image/file fields
 * 
 * 2. Add the new type to the Block union type above
 * 
 * 3. Update handle-response.ts to process the new block sections
 *    if they come from separate API fields
 * 
 * 4. Consider adding helper functions in index.ts for the new block type
 * 
 * Example for a hypothetical "gallery" block:
 * 
 * export type GalleryBlock = {
 *   id: string;
 *   blockType: "gallery";
 *   title: string;
 *   images: Media[];
 *   blockName: string | null;
 * };
 * 
 * Then add GalleryBlock to the Block union type.
 */

export type SocialLink = {
  platform: string;
  url: string;
  icon?: string;
};

export type ParsedPage = {
  id: number;
  title: string;
  url: string;
  country: string;
  themeColor: string;
  coreValues: any;
  seo: {
    metaTitle: string;
    metaDescription: string;
    analytics: string;
    searchConsole: string;
  };
  navigation: {
    logo: Media;
    menuItems: Array<{
      id: string;
      name: string;
      anchorId: string;
      style: string;
    }>;
  };
  operatingHours: string;
  socialLinks: SocialLink[];
  blocks: Block[];
  footerStyle: string;
  updatedAt: string;
  createdAt: string;
};

// Raw API response type - matches the actual structure
export type RawPageData = {
  id: number;
  title: string;
  country: string;
  "theme color": string;
  "core values": any;
  url: string;
  "operating hours": LexicalContent;
  "social links": SocialLink[];
  seo: {
    "meta title": string;
    "meta description": string;
    "search console": string;
    analytics: string;
  };
  navigation: {
    logo: Media;
    menuItems: Array<{
      id: string;
      "anchor name": string;
      "anchor id": string;
      style: string;
    }>;
  };
  hero?: Block[];
  "why choose us"?: Block[];
  content?: Block[];
  "call to action"?: Block[];
  contact?: Block[];
  "footer style": string;
  updatedAt: string;
  createdAt: string;
};