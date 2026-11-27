import { Metadata } from "next"
import { SITE_DESCRIPTION, SITE_NAME, SITE_PREVIEW_IMAGE } from "@/lib/site"

type MetadataOptions = {
    /** Page summary; may contain Markdown / LaTeX, which is stripped */
    description?: string
    /** Open Graph type */
    type?: "website" | "article"
    /** Article authors */
    authors?: string[]
    robots?: Metadata["robots"]
}

/**
 * Turn a description written in Markdown / LaTeX into plain text.
 * Returns undefined for placeholder or empty descriptions.
 */
export function plainDescription(text: string | undefined): string | undefined {
    if (!text) return undefined
    const plain = text
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links
        .replace(/<[^>]+>/g, "") // HTML / MDX tags
        .replace(/\$\$?([^$]*)\$\$?/g, "$1") // math delimiters
        .replace(
            /\\(?:mathcal|mathbb|mathrm|text|operatorname)\{([^}]*)\}/g,
            "$1"
        )
        .replace(/\\([a-zA-Z]+)/g, "$1") // remaining LaTeX commands
        .replace(/[`*_~#>]/g, "") // Markdown markers
        .replace(/\s+/g, " ")
        .trim()
    if (plain === "" || /^\?+$/.test(plain)) return undefined
    return plain
}

/**
 * Generate customized metadata according to individual page information.
 * Note that omitted fields will be inherited from @/app/layout.tsx,
 * except openGraph, which is replaced as a whole and therefore rebuilt here.
 * @param title Displayed page title in browser tab
 */
export function composeMetadata(
    title: string,
    options: MetadataOptions = {}
): Metadata {
    const fullTitle = `${title} - ${SITE_NAME}`
    const description =
        plainDescription(options.description) ?? SITE_DESCRIPTION
    const type = options.type ?? "website"
    const authors = options.authors?.filter((author) => author !== "")

    return {
        title: fullTitle,
        description,
        ...(authors && authors.length > 0
            ? { authors: authors.map((name) => ({ name })) }
            : {}),
        ...(options.robots ? { robots: options.robots } : {}),
        openGraph: {
            siteName: SITE_NAME,
            images: [SITE_PREVIEW_IMAGE],
            title: fullTitle,
            description,
            ...(type === "article"
                ? { type: "article", authors: authors ?? [] }
                : { type: "website" }),
        },
    }
}
