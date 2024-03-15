import Link from 'next/link';

import { pickSubset } from 'lib/util';
import { getChapterByName, getChapters } from 'lib/contents-handler';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

type SectionProps = {
    id: string;
    url: string;
    title: string;
};
type ChapterProps = {
    title: string;
    sections: SectionProps[];
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getChapters().map(chapter => ({params: {chapter: chapter.id}}));
    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<{chapter: ChapterProps}> = async ({ params }) => {
    if (!params)
        throw Error('param not exist in [chapter]');
    const chapter_obj = getChapterByName(params.chapter as string);
    const chapter = {
        title: chapter_obj.title,
        sections: chapter_obj.sections.map(sec => pickSubset(sec, ["id", "url", "title"])),
    };
    return { props: { chapter } };
}

export default function Pages({ chapter }: InferGetStaticPropsType<typeof getStaticProps>) {
    const sections: React.JSX.Element[] = [];
    for (const section of chapter.sections) {
        sections.push(
            <li key={`${chapter}-${section.id}`}>
                <Link href={`${section.url}`}>{section.title}</Link>
            </li>
        );
    }

    return (<>
        <h1>{chapter.title}</h1>
        <ul>
            {sections}
        </ul>
        <h4><Link href="/handout">回到大綱</Link></h4>
        <h4><Link href="/">回到首頁</Link></h4>
    </>);
};