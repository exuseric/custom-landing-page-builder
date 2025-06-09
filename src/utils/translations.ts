import navigationTranslations from './lang/navigation.json';
export const languages: Record<string, string> = {
	ke: "en-KE",
	cv: "pt-CV",
	mz: "pt-MZ",
	tz: "en-TZ",
	st: "pt-ST",
};
export function getLanguageFromCountry(country: string): 'en' | 'pt' {
    const ptCountries = ['cv', 'mz', 'st'];
    return ptCountries.includes(country) ? 'pt' : 'en';
}

export function translateNavItem(item: string, country: string): string {
    const lang = getLanguageFromCountry(country);
    const translations = navigationTranslations[lang].nav;
    return translations[item.toLowerCase() as keyof typeof translations] || item;
}

export function translateFooterItem(item: string, country: string): string {
    const lang = getLanguageFromCountry(country);
    const translations = navigationTranslations[lang].footer;
    return translations[item as keyof typeof translations] || item;
}