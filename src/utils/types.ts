export type SupportedLanguage = 'en' | 'pt';
export type CountryCode = 'ke' | 'cv' | 'mz' | 'tz' | 'st';

export interface NavigationTranslations {
  home: string;
  about: string;
  services: string;
  products: string;
  contact: string;
}

export interface FooterTranslations {
  copyright: string;
  designed_by: string;
}

export interface Translations {
  nav: NavigationTranslations;
  footer: FooterTranslations;
}

export interface TranslationData {
  en: Translations;
  pt: Translations;
}