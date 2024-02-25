import Link from 'next/link';

import { getChapters, ChapterType } from 'lib/contents-handler';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export const getStaticProps: GetStaticProps<{chapters: ChapterType[]}> = async () => {
    const chapters = getChapters();
    return { props: { chapters }};
}
export default function Pages({ chapters }: InferGetStaticPropsType<typeof getStaticProps>) {
    const list: React.JSX.Element[] = [];
    for (const chapter of chapters) {
        const d_chapter = chapter.d_chapter;

        list.push(<h2 key={`${d_chapter.name}-title`}>
            <Link href={d_chapter.url}>{d_chapter.title}</Link>
        </h2>);

        const section_elems: React.JSX.Element[] = [];
        for (const d_section of chapter.d_sections) {
            section_elems.push(
                <li key={`${d_chapter.name}-${d_section.name}`}>
                    <Link href={d_section.url}>{d_section.title}</Link>
                </li>
            );
        }

        list.push(<ul key={`${d_chapter.name}-sections`}>
            { section_elems }
        </ul>);
    }
    return (<>
        <h1>講義大綱</h1>
        { list }
        <h4><Link href="/">回到首頁</Link></h4>
    </>);
};