/// <reference types="vitest/config" />

import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        reporters: ['default', 'html'],
        include: ['./src/test/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        outputFile: './test_out/seo-test.html'
    },
})