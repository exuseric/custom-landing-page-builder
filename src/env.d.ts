/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly POCKETBASE_URL: string;
    readonly POCKETBASE_EMAIL: string;
    readonly POCKETBASE_PASSWORD: string;
    readonly LANDING_PAGE_ID: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}