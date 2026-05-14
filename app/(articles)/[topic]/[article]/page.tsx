import { getArticleContent } from "@/components/markdown/markdown"
import { getArticle, getArticleMdxPath } from "@/lib/structure/articles"
import { getChapter } from "@/lib/structure/chapters"
import { getTopic, getTopics } from "@/lib/structure/topics"
import { Article } from "@/lib/structure/type"
import { composeMetadata } from "@/lib/util"
import { HyperRefBlank } from "@/ntucpc-website-common-lib/components/basic"
import { WrappedLink } from "@/ntucpc-website-common-lib/components/common"
import { faBook, faChevronLeft, faChevronRight, faUserGroup, faUserPen, IconDefinition, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from "react"
import { Section } from "@/lib/parser/section"

type ArticleProps = {
    params: Promise<{
        topic: string,
        article: string
    }>
}

export async function generateMetadata(props: ArticleProps) {
    const params = await props.params;
    const code = `${params.topic}/${params.article}`
    const article = getArticle(code)
    return composeMetadata(article.title)
}

export async function generateStaticParams() {
    const articles: { topic: string, article: string }[] = []
    for (const topic of getTopics()) {
        for (const article of topic.contents) {
            if (!getArticle(article).coming)
                articles.push({
                    topic: topic.code,
                    article: article.split('/')[1]
                })
        }
    }
    return articles
}

type InformatIonItemProps = {
    name: string
    icon: IconDefinition
    children: ReactNode
}
function InformationItem({ name, children, icon }: InformatIonItemProps) {
    return <div className="flex my-2">
        <div className="w-7 text-center text-indigo-500 shrink-0"><FontAwesomeIcon icon={icon} /></div>
        <div className="ml-1">
            {name}：{children}
        </div>
    </div>;
}

function ArticleHeader({ article }: { article: Article }) {
    const prereqs = article.prerequisites.map((prereq, idx) => {
        const prereqArticle = getArticle(prereq)
        return !prereqArticle.coming ?
            <HyperRefBlank href={`/${prereq}`} key={idx}>
                {prereqArticle.title}
            </HyperRefBlank> :
            <span className="text-neutral-500" key={idx}>
                {prereqArticle.title}
            </span>
    }).reduce<JSX.Element[]>((pre, cur, idx) => {
        if (idx > 0) pre.push(<span key={`sep-${idx}`}>、</span>)
        pre.push(cur)
        return pre
    }, [])
    const chapter = article.chapter ? getChapter(article.chapter) : undefined
    const topic = getTopic(article.topic)
    return <div className="mb-8">
        <div className="text-xl">{chapter ? `Chapter ${chapter.number}. ${chapter.title}` : "Unknown Chapter"}</div>
        <div className="text-2xl text-gray-500 pt-1">{topic.title}</div>
        <div className="text-5xl mt-1 mb-4">{article.title}</div>

        <InformationItem name="作者" icon={faUserPen}>{article.authors.join("、")}</InformationItem>
        {
            article.contributors.length > 0 ?
                <InformationItem name="協作者" icon={faUserGroup} >{article.contributors.join("、")}</InformationItem>
                : <></>
        }
        {
            prereqs.length > 0 ?
                <InformationItem name="先備知識" icon={faBook} >{prereqs} </InformationItem>
                : <></>
        }

    </div>;
}

function ArticleFooterLink({ code, side }: { code: string | undefined, side: "left" | "right" }) {
    const article = code ? getArticle(code) : undefined
    return <div className={`shrink-0 flex sm:w-64 ${side === "left" ? "justify-start" : "justify-end"}`}>
        {article ?
            <WrappedLink href={`/${code}`}
                className="text-indigo-500 block p-3 rounded-xl color-animation hover:text-indigo-700 hover:bg-indigo-100">
                <div className={`flex items-center ${side === "left" ? "justify-start" : "justify-end"}`}>
                    {side === "left" ? <FontAwesomeIcon icon={faChevronLeft} className="mr-2 shrink-0" /> : <></>}
                    <div className="max-sm:hidden">
                        {getTopic(article.topic).title} /<br /> {article.title}
                    </div>
                    {side === "right" ? <FontAwesomeIcon icon={faChevronRight} className="ml-2 shrink-0" /> : <></>}
                </div>
            </WrappedLink>
            : <div className="p-3 text-gray-500">
                <FontAwesomeIcon icon={side === "left" ? faChevronLeft : faChevronRight} />
            </div>}
    </div>
}

function ArticleFooter({ article }: { article: Article }) {
    const chapter = article.chapter ? getChapter(article.chapter) : undefined
    const index = !chapter ? -1 :
        chapter.contents.findIndex(
            val => val === article.code
        )
    const previous = chapter && index > 0 ?
        chapter.contents[index - 1] : undefined
    const next = chapter && index + 1 < chapter.contents.length ?
        chapter.contents[index + 1] : undefined
    return <div className="flex mt-20 justify-between items-center">
        <ArticleFooterLink side="left" code={previous} />
        <div className="font-semibold p-3 text-nowrap">
            {article.title}
        </div>
        <ArticleFooterLink side="right" code={next} />
    </div>
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
                                <a href={`#${heading.code}`} className="block py-1 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded px-2 transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
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
    const params = await props.params;
    const code = `${params.topic}/${params.article}`
    const mdxSource = getArticleMdxPath(code)
    const article = getArticle(code)
    
    const { content, headings } = await getArticleContent(mdxSource, 1)

    return (
        <div className="relative">
            <ArticleHeader article={article} />
            <div className="prose prose-slate max-w-none">
                {content}
            </div>
            <ArticleFooter article={article} />
            
            <div className="hidden xl:block absolute top-0 left-[calc(100%+2.5rem)] h-full">
                <TableOfContents headings={headings} />
            </div>
        </div>
    )
}
