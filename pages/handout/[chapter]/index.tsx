import Link from 'next/link';

import { ChapterType, getChapterByName, getChapters, getSectionsByChapter, SectionType } from 'lib/contents-handler';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getChapters().map(chapter => ({params: {chapter: chapter.d_chapter.id}}));
    return {
        paths,
        fallback: false,
    };
}
export const getStaticProps: GetStaticProps<{chapter: ChapterType}> = async ({ params }) => {
    if (!params)
        throw Error('param not exist in [chapter]');
    const chapter = getChapterByName(params.chapter as string);
    return { props: { chapter } };
}
export default function Pages({ chapter }: InferGetStaticPropsType<typeof getStaticProps>) {
    const sections: React.JSX.Element[] = [];
    for (const d_section of chapter.d_sections) {
        sections.push(
            <li key={`${chapter}-${d_section}`}>
                <Link href={`${d_section.url}`}>{d_section.title}</Link>
            </li>
        );
    }

    return (<>
        <h1>{chapter.d_chapter.title}</h1>
        <ul>
            {sections}
        </ul>
        <h4><Link href="/handout">回到大綱</Link></h4>
        <h4><Link href="/">回到首頁</Link></h4>
    </>);
};