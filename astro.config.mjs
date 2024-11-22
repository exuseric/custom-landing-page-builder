// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import purgecss from 'astro-purgecss';
import { getSiteDetails } from './src/utils/pocketbase';
const { url } = await getSiteDetails();
// https://astro.build/config
export default defineConfig({
  output: "static",
  outDir: process.cwd() + '\\build\\' + url.slice(8),
  site: url,
  build: {
    assets: 'assets',
    inlineStylesheets: 'never'
  },
  image: {
    domains: ["127.0.0.1"]
  },
  compressHTML: false,
  integrations: [sitemap(), icon(), purgecss()]
});