import PocketBase from 'pocketbase';

interface LandingPage {
    title: string;
    url: string;
    meta_title: string;
    meta_description: string;
    theme_color: string;
    country: string;
    analytics_id: string;
    search_console: string;
    links: [string];
    nav_style: string;
    hero_title: string;
    hero_excerpt: string;
    hero_style: string;
    contact_title: string;
    contact_style: string;
    core_values: string;
    footer_style: string;
    expand: {
        logo: {
            [key: string]: string;
        };
        hero_image: {
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
    }
}
const pb = new PocketBase('http://127.0.0.1:8090');
const pageId = 'sdv06887x54om9i'

const parentUrls: Record<string, string> = {
    ke: 'https://www.yellowpageskenya.com/',
    cv: 'https://www.paginasamarelas.cv/',
    mz: 'https://www.paginasamarelas.co.mz/',
    tz: 'https://www.yellow.co.tz/',
    st: 'https://www.paginasamarelas.st/',
};

const parentSites: Record<string, string> = {
    ke: 'Yellow Pages Kenya',
    cv: 'Páginas Amarelas de Cabo Verde',
    mz: 'Páginas Amarelas Moçambique',
    tz: 'Yellow Tanzania',
    st: 'Yellow Pages São Tomé',
};


const getImageUrl = ({ collection, filename }: { collection: any, filename: string }) => pb.files.getUrl(collection, filename)

const getData = async () => {
    await pb.collection("_superusers").authWithPassword('eric.gathoni@yellowpageskenya.com', 'CDz5pFLmm3thaFZ');
    const data = await pb.collection("landing_page").getOne<LandingPage>(pageId, {expand: 'logo,hero_image,sections, sections.image, sections.section_grid, sections.section_grid.image, contact_info, contact_location'})
    
    const company = {
        url: parentUrls[data.country],
        name: parentSites[data.country],
    }
    const record = { ...data, company }
    return record
}

export { getImageUrl, getData}