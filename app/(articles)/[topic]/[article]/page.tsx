import {
    getArticleContent,
    SimpleMarkdown,
} from "@/components/markdown/markdown"
import { getArticle, getArticleMdxPath } from "@/lib/structure/articles"
import { getChapter } from "@/lib/structure/chapters"
import { getTopic, getTopics } from "@/lib/structure/topics"
import { Article } from "@/lib/structure/type"
import { composeMetadata } from "@/lib/util"
import { ImportanceTag } from "@/components/common"
import { HyperRefBlank } from "@/ntucpc-website-common-lib/components/basic"
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common"
import {
    faBook,
    faChevronLeft,
    faChevronRight,
    faUserGroup,
    faUserPen,
    faList,
    faStar,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Section } from "@/lib/parser/section"

type ArticleProps = {
    params: Promise<{
        topic: string
        article: string
    }>
}

export async function generateMetadata(props: ArticleProps) {
    const params = await props.params
    const code = `${params.topic}/${params.article}`
    const article = getArticle(code)
    return composeMetadata(article.title)
}

export async function generateStaticParams() {
    const articles: { topic: string; article: string }[] = []
    for (const topic of getTopics()) {
        for (const article of topic.contents) {
            if (!getArticle(article).coming)
                articles.push({
                    topic: topic.code,
                    article: article.split("/")[1],
                })
        }
    }
    return articles
}

function ArticleHeader({ article }: { article: Article }) {
    const prereqs = article.prerequisites
        .map((prereq, idx) => {
            const prereqArticle = getArticle(prereq)
            return !prereqArticle.coming ? (
                <HyperRefBlank
                    href={`/${prereq}`}
                    key={idx}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                    {prereqArticle.title}
                </HyperRefBlank>
            ) : (
                <span className="text-neutral-400" key={idx}>
                    {prereqArticle.title}
                </span>
            )
        })
        .reduce<JSX.Element[]>((pre, cur, idx) => {
            if (idx > 0)
                pre.push(
                    <span key={`sep-${idx}`} className="text-gray-300 mx-1">
                        /
                    </span>
                )
            pre.push(cur)
            return pre
        }, [])

    const chapter = article.chapter ? getChapter(article.chapter) : undefined
    const topic = getTopic(article.topic)

    return (
        <div className="mb-8 pb-8 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6">
                {chapter && (
                    <>
                        <WrappedLink
                            href={`/chapter/${chapter.code}`}
                            className="text-gray-400 hover:text-indigo-500 transition-colors"
                        >
                            CH {chapter.number} {chapter.title}
                        </WrappedLink>
                        <span className="text-gray-300">/</span>
                    </>
                )}
                <WrappedLink
                    href={`/${topic.code}`}
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                >
                    {topic.title}
                </WrappedLink>
            </div>

            {/* Title Section */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                {article.title}
            </h1>

            {/* Description Section */}
            <div className="text-gray-500 mb-8 leading-relaxed max-w-3xl italic">
                <SimpleMarkdown text={article.description} />
            </div>

            {/* Metadata Section */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                        <FontAwesomeIcon icon={faUserPen} className="text-xs" />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">
                            作者
                        </div>
                        <div className="text-gray-700 font-medium">
                            {article.authors.join("、")}
                        </div>
                    </div>
                </div>

                {article.contributors.length > 0 && (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                            <FontAwesomeIcon
                                icon={faUserGroup}
                                className="text-xs"
                            />
                        </div>
                        <div>
                            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">
                                協作者
                            </div>
                            <div className="text-gray-700 font-medium">
                                {article.contributors.join("、")}
                            </div>
                        </div>
                    </div>
                )}

                {article.importance > 0 && (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                            <FontAwesomeIcon
                                icon={faStar}
                                className="text-xs"
                            />
                        </div>
                        <div>
                            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">
                                重要度
                            </div>
                            <div className="mt-0.5">
                                <ImportanceTag
                                    importance={article.importance}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {prereqs.length > 0 && (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                            <FontAwesomeIcon
                                icon={faBook}
                                className="text-xs"
                            />
                        </div>
                        <div>
                            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">
                                先備知識
                            </div>
                            <div className="text-gray-700 font-medium flex flex-wrap">
                                {prereqs}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function ArticleFooterLink({
    code,
    side,
}: {
    code: string | undefined
    side: "left" | "right"
}) {
    if (!code) return <div className="flex-1 hidden sm:block" />
    const article = getArticle(code)
    const topic = getTopic(article.topic)

    return (
        <WrappedLink
            href={`/${code}`}
            className={`flex-1 group p-6 transition-all duration-300 flex flex-col ${
                side === "left" ? "items-start" : "items-end text-right"
            }`}
        >
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 group-hover:text-indigo-500 transition-colors">
                {side === "left" && (
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="text-[8px]"
                    />
                )}
                {side === "left" ? "上一篇" : "下一篇"}
                {side === "right" && (
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-[8px]"
                    />
                )}
            </div>
            <div className="text-gray-900 font-bold text-lg mb-1 group-hover:text-indigo-700 transition-colors line-clamp-1">
                {article.title}
            </div>
            <div className="text-gray-400 text-xs font-medium">
                {topic.title}
            </div>
        </WrappedLink>
    )
}

function ArticleFooter({ article }: { article: Article }) {
    const chapter = article.chapter ? getChapter(article.chapter) : undefined
    if (!chapter) return null

    const availableArticles = chapter.contents.filter(
        (code) => !getArticle(code).coming
    )

    const index = availableArticles.findIndex((val) => val === article.code)

    const previous = index > 0 ? availableArticles[index - 1] : undefined
    const next =
        index !== -1 && index + 1 < availableArticles.length
            ? availableArticles[index + 1]
            : undefined

    if (!previous && !next) return null

    return (
        <div className="mt-24 pt-12 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-6">
                <ArticleFooterLink side="left" code={previous} />
                <ArticleFooterLink side="right" code={next} />
            </div>
        </div>
    )
}

function TableOfContents({ headings }: { headings: Section[] }) {
    if (headings.length === 0) return <></>

    return (
        <aside className="sticky top-24 w-56 h-fit max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
            <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold border-b pb-2">
                <FontAwesomeIcon icon={faList} />
                <span>目錄</span>
            </div>
            <nav>
                <ul className="space-y-1 text-sm">
                    {headings.map((heading, idx) => {
                        const paddingLeft = `${(heading.depth - 1) * 1}rem`
                        return (
                            <li key={idx} style={{ paddingLeft }}>
                                <a
                                    href={`#${heading.code}`}
                                    className="block py-1 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded px-2 transition-colors overflow-hidden text-ellipsis whitespace-nowrap"
                                >
                                    {heading.text}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}

export default async function ArticlePage(props: ArticleProps) {
    const params = await props.params
    const code = `${params.topic}/${params.article}`
    const mdxSource = getArticleMdxPath(code)
    const article = getArticle(code)

    const { content, headings } = await getArticleContent(mdxSource, 1)

    return (
        <div className="relative">
            <ArticleHeader article={article} />
            <div className="prose prose-slate max-w-none">{content}</div>
            <ArticleFooter article={article} />

            <div className="hidden xl:block absolute top-0 left-[calc(100%+2.5rem)] h-full">
                <TableOfContents headings={headings} />
            </div>
        </div>
    )
}
