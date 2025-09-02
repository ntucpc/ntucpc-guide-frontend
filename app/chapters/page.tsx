import { IconWrapper } from "@/components/icon";
import { ContentBody, Layout } from "@/components/layout";
import { getChapterArticleGroups } from "@/lib/structure";
import { getArticle } from "@/lib/structure/articles";
import { getChapters } from "@/lib/structure/chapters";
import { getTopic } from "@/lib/structure/topics";
import { Article, ArticleGroup, Chapter } from "@/lib/structure/type";
import { composeMetadata } from "@/lib/util";
import { H1Title } from "@/ntucpc-website-common-lib/components/basic";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function ChapterEntryBigIcon({ chapter }: { chapter: Chapter }) {
    return <div className={`hidden sm:flex text-8xl text-gray-600 group-hover:text-${chapter.iconColor} color-animation`}>
        <IconWrapper iconName={chapter.icon} />
    </div>
}

function ChapterEntryTitle({ chapter }: { chapter: Chapter }) {
    return <>
        {/* small screen, including icon */}
        <div className="flex sm:hidden gap-2 items-center">
            <div className="flex-1">
                <div className="text-gray-500 text-md font-medium">
                    Chapter {chapter.number}.
                </div>
                <div className={`text-3xl font-bold group-hover:text-indigo-700 color-animation`}>
                    {chapter.title}
                </div>
            </div>
            <div className={`text-5xl items-center text-gray-600 group-hover:text-${chapter.iconColor} color-animation`}>
                <IconWrapper iconName={chapter.icon} />
            </div>
        </div>
        {/* large screen, icon outside */}
        <div className="hidden sm:block text-gray-500 text-md font-medium">
            Chapter {chapter.number}.
        </div>
        <div className={`hidden sm:block text-3xl font-bold group-hover:text-indigo-700 color-animation`}>
            {chapter.title}
        </div>
    </>
}

function ChapterEntryDescription({ chapter }: { chapter: Chapter }) {
    return <div className="text-sm mt-1 text-gray-500">
        {chapter.description}
    </div>
}

function ChapterEntryGroup({ group }: { group: ArticleGroup }) {
    const topic = getTopic(group.code)
    return <div className="text-sm flex text-gray-700 mt-0.5 flex-col sm:flex-row items-start">
        <div className="flex-shrink-0 flex flex-row gap-x-2 items-center min-w-28">
            <FontAwesomeIcon icon={faAngleRight} />
            <span className="font-medium">
                {topic.title}
            </span>
        </div>
        <div className="flex-grow flex flex-row gap-x-4 flex-wrap ml-4">
            {group.articles.map((article, index) => (
                <span key={index} className="whitespace-nowrap">
                    {!article.coming ?
                        <Link href={`/${article.code}`} className={`hover:text-indigo-500 color-animation pointer-events-auto`}>
                            {article.title}
                        </Link> :
                        <span className="text-gray-400">{article.title}</span>}
                </span>
            ))}
        </div>
    </div>
}

function ChapterEntryGroups({ chapter }: { chapter: Chapter }) {
    const groups = getChapterArticleGroups(chapter)
    return groups.map(group => <ChapterEntryGroup key={group.code} group={group} />)
}

function ChapterEntry({ chapter }: { chapter: Chapter }) {
    return <div className={`relative hover:bg-indigo-50 rounded-lg group color-animation`}>
        <Link
            href={`/chapter/${chapter.code}`}
            className="absolute inset-0 z-1 pointer-events-auto"
        />
        <div className={`relative pointer-events-none flex flex-row gap-4 p-2 rounded-lg color-animation my-3`}>
            <ChapterEntryBigIcon chapter={chapter} />
            <div className="flex-1">
                <ChapterEntryTitle chapter={chapter} />
                <ChapterEntryDescription chapter={chapter} />
                <div className="mt-1">
                    <ChapterEntryGroups chapter={chapter} />
                </div>
            </div>
        </div>
    </div>
}

function AllChapters() {
    const chapters = getChapters()
    return chapters.map((chapter) => <ChapterEntry
        key={chapter.code}
        chapter={chapter}
    />)
}

export const metadata = composeMetadata("章節目錄")
export default function ChaptersPage() {
    return <ContentBody>
        <H1Title>
            章節目錄
        </H1Title>
        <AllChapters />
    </ContentBody>
}