import { set } from "astro:schema"
import { create } from "zustand"
import type { PageType } from "@utils/types"

interface PageStore {
    pageData: PageType;
    setPageData: (data: PageType) => void;
}
export const usePageData = create<PageStore>((set) => ({
    pageData: {} as PageType,
    setPageData: (data: PageType) => set({ pageData: data })
}))