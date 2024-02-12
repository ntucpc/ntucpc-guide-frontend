import Link from 'next/link';

import { getChapterNames, getSectionNames } from 'lib/contents_handler';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getChapterNames().map(chapter => ({params: {chapter}}));
    return {
        paths,
        fallback: false,
    };
}
export const getStaticProps: GetStaticProps<{chapter: string, articles: string[]}> = async ({ params }) => {
    if (!params)
        throw Error('param not exist in [chapter]');
    const chapter = params.chapter as string;
    const articles = getSectionNames(chapter).map(section => section.section);
    return { props: { chapter, articles } };
}
export default function Pages({ chapter, articles }: InferGetStaticPropsType<typeof getStaticProps>) {
    const list: React.JSX.Element[] = [];

    const sections: React.JSX.Element[] = [];
    for (const section of articles) {
        sections.push(
            <li key={`${chapter}-${section}`}>
                <Link href={`${chapter}/${section}`}>{section}</Link>
            </li>
        );
    }

    list.push(<ul>
        {sections}
    </ul>);
    return (<>
        <h1>{chapter}</h1>
        { list }
        <h4><Link href="/handout">回到大綱</Link></h4>
        <h4><Link href="/">回到首頁</Link></h4>
    </>);
};