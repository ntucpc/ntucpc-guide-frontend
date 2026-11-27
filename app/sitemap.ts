import { MetadataRoute } from "next"
import { getArticle } from "@/lib/structure/articles"
import { getChapters } from "@/lib/structure/chapters"
import { getTopics } from "@/lib/structure/topics"
import { absoluteUrl } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = [
        "/",
        "/chapters",
        "/topics",
        ...getChapters().map((chapter) => `/chapter/${chapter.code}`),
        ...getTopics().map((topic) => `/${topic.code}`),
        // Same set of articles as generateStaticParams of the article page
        ...getTopics().flatMap((topic) =>
            topic.contents
                .filter((code) => !getArticle(code).coming)
                .map((code) => `/${code}`)
        ),
    ]
    return paths.map((path) => ({ url: absoluteUrl(path) }))
}
