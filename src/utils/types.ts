// Keep existing types but enhance with strict typing
export type CountryCode = 'ke' | 'cv' | 'mz' | 'tz' | 'st';
export type Language = 'en' | 'pt';

// Enhance existing PageType
export type PageType = {
    title: string;
    url: string;
    meta_title: string;
    meta_description: string;
    theme_color: string;
    country: CountryCode;
    analytics_id: string;
    search_console: string;
    links: [string];
    nav_style: string;
    hero_title: string;
    hero_excerpt: string;
    hero_style: string;
    contact_title: string;
    contact_style: string;
    core_values?: string;
    footer_style: string;
    expand: {
        logo: {
            [key: string]: string;
        };
        hero_image: {
            [key: string]: string;
        };
        hero_cover: {
            [key: string]: string;
        };
        sections: {
            [key: string]: string;
        };
        contact_info: {
            [key: string]: string;
        };
        contact_location: {
            [key: string]: string;
        };
        social_links: {
            [key: string]: string;
        };
        operating_hours: {
            [key: string]: string;
        };
        hero_grid?: {
            icon: string;
            title: string;
        }[]
    }
}

export type ObjectType = {
    [key: string]: string;
}

export type HeroProps = {
    title: string;
    excerpt: string;
    type?: string;
    image: {
        [key: string]: string;
    };
    cover?: {
        [key: string]: string;
    };
    core_values?: string;
    cards?: {
        icon: string;
        title: string;
    }[];
}

export type CompanyType = {
    company: {
        url: string;
        companyName: string;
        rightsReserved: string;
    }
}

// Add new but compatible types
export type SectionType =
    | 'cta'
    | 'testimonial'
    | 'stats grid'
    | 'colorful stats'
    | 'two column stats';
