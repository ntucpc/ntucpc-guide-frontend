import { Metadata } from "next"

/**
 * Generate customized metadata according to individual page information.
 * Note that omitted fields will be inherited from @/app/layout.tsx.
 * @param title Displayed page title in browser tab
 */
export function composeMetadata(title: string): Metadata {
    return {
        title: `${title} - NTUCPC Guide`,
    }
}
