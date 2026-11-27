/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Fallback alt text when the author didn't give one:
 * a readable form of the file name, e.g. "linked_list-1.png" -> "linked list 1"
 */
function fallbackAlt(src: unknown): string {
    if (typeof src !== "string") return ""
    const name = decodeURIComponent(src.split(/[?#]/)[0].split("/").pop() ?? "")
    return name
        .replace(/\.[^.]+$/, "")
        .replace(/[_-]+/g, " ")
        .trim()
}

export function Figure(props: any) {
    // Figures are drawn for a white background (some are transparent), so keep it white in dark mode
    return (
        <img
            className="mx-auto my-2 dark:bg-white dark:rounded-md"
            loading="lazy"
            decoding="async"
            {...props}
            alt={props.alt ?? fallbackAlt(props.src)}
        />
    )
}
