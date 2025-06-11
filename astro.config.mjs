import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { imageService } from "@unpic/astro/service";

import { fetchPage } from './src/utils/payload';
const { url } = await fetchPage(1, ['url'])
// https://astro.build/config
export default defineConfig({
  output: "static",
  outDir: process.cwd() + '\\build\\' + url.slice(8),
  site: url,
  // experimental: {
  //   responsiveImages: true
  // },
  build: {
    assets: 'assets',
    inlineStylesheets: 'never',

  },
  image: {
    domains: ["127.0.0.1"],
    // experimentalLayout: 'constrained',
    service: imageService({
      placeholder: "blurhash",
    }),

  },
  compressHTML: false,
  integrations: [sitemap(), icon()]
});