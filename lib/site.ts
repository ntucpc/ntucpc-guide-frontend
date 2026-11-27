export const SITE_URL = "https://guide.ntucpc.org"
export const SITE_NAME = "NTUCPC Guide"
export const SITE_DESCRIPTION =
    "由專業選手們撰寫的程式競賽教學講義，以帶領新手從零成為程式競賽高手為目標。"

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
