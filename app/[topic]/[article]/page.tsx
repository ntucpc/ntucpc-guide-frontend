import { ContentBody } from "@/components/layout"
import { ArticleMarkdown } from "@/components/markdown/markdown"
import { getArticle, getArticleMdxPath } from "@/lib/structure/articles"
import { getTopics } from "@/lib/structure/topics"
import { composeMetadata } from "@/lib/util"

type ArticleProps = {
    params: {
        topic: string,
        article: string
    }
}

export async function generateMetadata({ params }: ArticleProps) {
    const code = `${params.topic}/${params.article}`
    const article = getArticle(code)
    return composeMetadata(article.title)
}

export async function generateStaticParams() {
    const articles: { topic: string, article: string }[] = []
    for (const topic of getTopics()) {
        for (const article of topic.contents) {
            articles.push({
                topic: topic.code,
                article: article.split('/')[1]
            })
        }
    }
    return articles
}

export default function ArticlePage({ params }: ArticleProps) {
    const code = `${params.topic}/${params.article}`
    const mdxSource = getArticleMdxPath(code)
    return <ContentBody>
        <ArticleMarkdown source={mdxSource} depthLimit={1} />
    </ContentBody>
}
