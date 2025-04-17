import PocketBase from 'pocketbase';
import type { ObjectType, PageType } from "@utils/types"
// import { usePageData } from '../store/store';
const pb = new PocketBase('http://127.0.0.1:8090');
const pageId = '9b9712kf4vk27wt'
// const {setPageData} = usePageData()

const parentUrls: ObjectType = {
    ke: 'https://www.yellowpageskenya.com/',
    cv: 'https://www.paginasamarelas.cv/',
    mz: 'https://www.paginasamarelas.co.mz/',
    tz: 'https://www.yellow.co.tz/',
    st: 'https://www.paginasamarelas.st/',
};

const parentDomains: ObjectType = {
    ke: 'yellowpageskenya.com',
    cv: 'paginasamarelas.cv',
    mz: 'paginasamarelas.co.mz',
    tz: 'yellow.co.tz',
    st: 'paginasamarelas.st',
}

const companyNames: ObjectType = {
    ke: 'Yellow Pages Kenya',
    cv: 'Páginas Amarelas de Cabo Verde',
    mz: 'Páginas Amarelas Moçambique',
    tz: 'Yellow Tanzania',
    st: 'Páginas Amarelas São Tomé',
};

const enLang = ["ke, tz"]

const getImageUrl = ({ collection, filename }: { collection: any, filename: string }) => pb.files.getUrl(collection, filename)

const getData = async () => {
    await pb.collection("_superusers").authWithPassword('eric.gathoni@yellowpageskenya.com', 'CDz5pFLmm3thaFZ');
    const data = await pb.collection("landing_page").getOne<PageType>(pageId, {expand: 'logo,hero_image, hero_cover, hero_grid,sections, sections.image, sections.section_grid, sections.section_grid.image, contact_info, contact_location'})
    
    const company = {
        url: parentUrls[data.country],
        companyName: companyNames[data.country],
        rightsReserved: enLang.includes(data.country) ? 'All rights reserved' : 'Todos os direitos reservados',
    }
    const finalUrl = `https://${data.title.split(' ').join('').toLocaleLowerCase()}.${parentDomains[data.country]}`
    console.log(finalUrl)
    const record = { ...data, company, finalUrl }
    // setPageData(record)
    return record
}

export { getImageUrl, getData}