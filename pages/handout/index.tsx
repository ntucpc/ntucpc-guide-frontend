import Link from 'next/link';

import { getChapters, ChapterType } from 'lib/contents_handler';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export const getStaticProps: GetStaticProps<{articles: ChapterType[]}> = async () => {
    const articles = getChapters();
    return { props: { articles }};
}
export default function Pages({ articles }: InferGetStaticPropsType<typeof getStaticProps>) {
    const list: React.JSX.Element[] = [];
    for (const chapter of articles) {
        const chapter_name = chapter.chapter;

        list.push(<h2 key={`${chapter_name}-title`}>
            <Link href={`handout/${chapter_name}`}>{chapter_name}</Link>
        </h2>);

        const section_elems: React.JSX.Element[] = [];
        for (const section of chapter.sections) {
            const section_name = section.section;
            section_elems.push(
                <li key={`${chapter_name}-${section_name}`}>
                    <Link href={`handout/${chapter_name}/${section_name}`}>{section_name}</Link>
                </li>
            );
        }

        list.push(<ul key={`${chapter_name}-sections`}>
            { section_elems }
        </ul>);
    }
    return (<>
        <h1>講義大綱</h1>
        { list }
        <h4><Link href="/">回到首頁</Link></h4>
    </>);
};