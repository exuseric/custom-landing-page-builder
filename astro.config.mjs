import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { getData } from './src/utils/pocketbase';
import { fetchPage } from './src/utils/payload';
const {url} = await fetchPage(1, ['url'])
// https://astro.build/config
export default defineConfig({
  output: "static",
  outDir: process.cwd() + '\\build\\' + url.slice(8),
  site: url,
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