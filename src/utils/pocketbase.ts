import PocketBase from 'pocketbase';

interface LandingPage {
    [key: string]: {
        [key: string]: any
    }
}

const pb = new PocketBase('http://127.0.0.1:8090');
const landingPageId = 'kw4xvhjrb3fvy1i'

const getImageUrl = ({ collection, filename }: { collection: any, filename: string }) => pb.files.getUrl(collection, filename)
const authenticate = async () => {
    await pb.admins.authWithPassword('eric.gathoni@yellowpageskenya.com', 'CDz5pFLmm3thaFZ');
}

async function getPage(): Promise<LandingPage> {
    await pb.admins.authWithPassword('eric.gathoni@yellowpageskenya.com', 'CDz5pFLmm3thaFZ');

    const record = await pb.collection("landing_page").getOne<LandingPage>(landingPageId, { expand: 'style, site_details, hero, hero.image,hero.multiple_content, pages, pages.page_image, pages.card_grid, pages.card_grid.image, pages.multiple_content,pages.multiple_content.image,pages.multiple_content.card_grid,pages.multiple_content.card_grid.image' });

    const newRecord = { hero: record.expand.hero, site_details: record.expand.site_details, pages: record.expand.pages, title: record.title };

    return newRecord;
}

async function getSiteDetails() {
    await authenticate();
    const site_details = await pb.collection("landing_page").getOne<LandingPage>(landingPageId, { expand: 'site_details' });
    return site_details.expand.site_details;
}

async function getHero() {
    await authenticate();
    const hero = await pb.collection("landing_page").getOne<LandingPage>(landingPageId, { expand: 'hero, hero.image,hero.multiple_content' });
    return hero.expand.hero;
}

async function getPages() {
    await authenticate();
    const pages = await pb.collection("landing_page").getOne<LandingPage>(landingPageId, { expand: 'pages, pages.page_image, pages.card_grid, pages.card_grid.image, pages.multiple_content,pages.multiple_content.image,pages.multiple_content.card_grid,pages.multiple_content.card_grid.image' });
    return pages.expand.pages;
}

export { getImageUrl, getPage, getSiteDetails, getHero, getPages }