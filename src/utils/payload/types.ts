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

export type WhyChooseUsBlock = {
  id: string;
  blockType: "why-choose-us-column";
  title: string;
  description: string;
  image: Media;
  blockName: string | null;
  options: Array<{
    id: string;
    title: string;
    description: string | null;
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

export type CallToActionBlock = {
  id: string;
  blockType: "simple-call-to-action";
  heading: string;
  description: string;
  buttonText: string;
  blockName: string | null;
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

export type Block = HeroBlock | WhyChooseUsBlock | ContentBlock | CallToActionBlock | ContactBlock;

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