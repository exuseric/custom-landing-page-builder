// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
// import purgecss from 'astro-purgecss';
import { getData } from './src/utils/pocketbase';
const record = await getData();
// https://astro.build/config
export default defineConfig({
  output: "static",
  // outDir: process.cwd() + '\\build\\' + record.url.slice(8),
  outDir: process.cwd() + '\\build\\' + record.finalUrl.slice(8),
  site: record.url,
  build: {
    assets: 'assets',
    inlineStylesheets: 'never',
    
  },
  image: {
    domains: ["127.0.0.1"]
  },
  compressHTML: false,
  integrations: [sitemap(), icon()]
});