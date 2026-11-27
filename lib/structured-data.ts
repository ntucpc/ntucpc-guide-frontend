import { getChapter } from "@/lib/structure/chapters"
import { getTopic } from "@/lib/structure/topics"
import { Article } from "@/lib/structure/type"
import {
    absoluteUrl,
    LICENSE_URL,
    ORGANIZATION,
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_PREVIEW_IMAGE,
    SITE_URL,
} from "@/lib/site"
import { articleDescription } from "@/lib/page-info"

const WEBSITE_ID = `${SITE_URL}/#website`
const ORGANIZATION_ID = `${SITE_URL}/#organization`

/** WebSite and Organization, for the home page */
export function homeStructuredData() {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": WEBSITE_ID,
                url: absoluteUrl("/"),
                name: SITE_NAME,
                description: SITE_DESCRIPTION,
                inLanguage: "zh-TW",
                publisher: { "@id": ORGANIZATION_ID },
            },
            {
                "@type": "Organization",
                "@id": ORGANIZATION_ID,
                ...ORGANIZATION,
            },
        ],
    }
}

/** TechArticle and BreadcrumbList, for article pages */
export function articleStructuredData(article: Article) {
    const url = absoluteUrl(`/${article.code}`)
    const chapter = article.chapter ? getChapter(article.chapter) : undefined
    const topic = getTopic(article.topic)

    const breadcrumbs = [
        { name: SITE_NAME, path: "/" },
        ...(chapter
            ? [
                  {
                      name: `Chapter ${chapter.number}. ${chapter.title}`,
                      path: `/chapter/${chapter.code}`,
                  },
              ]
            : []),
        { name: topic.title, path: `/${topic.code}` },
        { name: article.title, path: `/${article.code}` },
    ]

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "TechArticle",
                "@id": `${url}#article`,
                url,
                mainEntityOfPage: url,
                headline: article.title,
                description: articleDescription(article),
                author: article.authors.map((name) => ({
                    "@type": "Person",
                    name,
                })),
                ...(article.contributors.length > 0
                    ? {
                          contributor: article.contributors.map((name) => ({
                              "@type": "Person",
                              name,
                          })),
                      }
                    : {}),
                image: SITE_PREVIEW_IMAGE,
                inLanguage: "zh-TW",
                license: LICENSE_URL,
                isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID },
                publisher: {
                    "@type": "Organization",
                    "@id": ORGANIZATION_ID,
                    ...ORGANIZATION,
                },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((crumb, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: crumb.name,
                    item: absoluteUrl(crumb.path),
                })),
            },
        ],
    }
}
