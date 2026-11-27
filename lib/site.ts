export const SITE_URL = "https://guide.ntucpc.org"
export const SITE_NAME = "NTUCPC Guide"
export const SITE_DESCRIPTION =
    "由專業選手們撰寫的程式競賽教學講義，以帶領新手從零成為程式競賽高手為目標。"
export const SITE_PREVIEW_IMAGE = `${SITE_URL}/preview.png`

/** Open Graph fields shared by every page */
export const SITE_OPEN_GRAPH = {
    siteName: SITE_NAME,
    locale: "zh_TW",
    images: [SITE_PREVIEW_IMAGE],
}

export const ORGANIZATION = {
    name: "國立臺灣大學程式解題社",
    alternateName: ["NTU Competitive Programming Club", "NTUCPC"],
    url: "https://ntucpc.org/",
    logo: `${SITE_URL}/logo.png`,
}

export const LICENSE_URL = "https://creativecommons.org/licenses/by-sa/4.0/"

/**
 * Turn a site path into its canonical form, matching `trailingSlash: true`.
 * @param path e.g. "/chapters" or "Guide/importance"
 */
export function canonicalPath(path: string): string {
    const trimmed = path.replace(/^\/+|\/+$/g, "")
    return trimmed === "" ? "/" : `/${trimmed}/`
}

/** Absolute URL of a site path */
export function absoluteUrl(path: string): string {
    return `${SITE_URL}${canonicalPath(path)}`
}
