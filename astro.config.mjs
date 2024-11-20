// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import purgecss from 'astro-purgecss';
import { getPage } from './src/utils/pocketbase';
const data = await getPage();
const url = ""
// https://astro.build/config
export default defineConfig({
  output: "static",
  // outDir: process.cwd() + '\\build\\' + url.slice(8),
  // site: url,
  build: {
    assets: 'assets',
    inlineStylesheets: 'never'
  },
  integrations: [sitemap(), icon(), purgecss({
    content: [
      process.cwd() + '/src/**/*.{astro,css}',

    ],
    keyframes: true,
    fontFace: true,
    variables: true
  })]
});