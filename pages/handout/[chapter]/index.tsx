import Link from 'next/link';

import { getChapters, getSectionsByChapter, SectionType } from 'lib/contents-handler';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getChapters().map(chapter => ({params: {chapter: chapter.d_chapter.name}}));
    return {
        paths,
        fallback: false,
    };
}
export const getStaticProps: GetStaticProps<{chapter: string, articles: SectionType[]}> = async ({ params }) => {
    if (!params)
        throw Error('param not exist in [chapter]');
    const chapter = params.chapter as string;
    const articles = getSectionsByChapter(chapter);
    return { props: { chapter, articles } };
}
export default function Pages({ chapter, articles }: InferGetStaticPropsType<typeof getStaticProps>) {
    const sections: React.JSX.Element[] = [];
    for (const section of articles) {
        sections.push(
            <li key={`${chapter}-${section}`}>
                <Link href={`${section.d_section.url}`}>{section.d_section.title}</Link>
            </li>
        );
    }

    return (<>
        <h1>{chapter}</h1>
        <ul>
            {sections}
        </ul>
        <h4><Link href="/handout">回到大綱</Link></h4>
        <h4><Link href="/">回到首頁</Link></h4>
    </>);
};