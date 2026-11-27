/**
 * Inject JSON-LD structured data into the page.
 * `<` is escaped so that the content cannot close the script tag.
 */
export function JsonLd({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data).replace(/</g, "\\u003c"),
            }}
        />
    )
}
