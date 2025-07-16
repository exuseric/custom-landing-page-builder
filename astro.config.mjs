import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { AstroPurgeCssPlugin } from 'astro-purgecss-static';
import favicons from "astro-favicons";

// import { imageService } from "@unpic/astro/service";
import { fetchPage } from './src/utils/payload';
const { url, title } = await fetchPage(['url', 'title']);
// https://astro.build/config
export default defineConfig({
  output: "static",
  outDir: process.cwd() + '\\build\\' + url.slice(8),
  site: url,
  env: {
    schema: {
      PAGE_ID: envField.string({
        context: 'server', 
        description: 'The ID of the page to fetch from Payload CMS', 
        default: '1',
        access: 'secret'
      }),
      DATABASE_URL: envField.string({
        context: 'server', 
        description: 'The URL of the Payload CMS instance',
        access: 'secret'
      }),
    }
  },
  // experimental: {
  //   responsiveImages: true
  // },
  build: {
    assets: 'assets',
    inlineStylesheets: 'never',
  },
  image: {
    domains: ["127.0.0.1", "landing-cms-payload.onrender.com"],
    responsiveStyles: true,
    layout: 'constrained'
    // experimentalLayout: 'responsive',
    // service: imageService({
    //   placeholder: "blurhash",
    // }),

  },
  compressHTML: false,
  integrations: [sitemap(), icon(),favicons({
    input: {
      favicons: [
        "public/yellow-pages-logo.webp"
      ]
    },
    name: title,
    short_name: title,
  }),AstroPurgeCssPlugin()]
});