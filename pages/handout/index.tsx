import Link from 'next/link';

import { pickSubset } from 'lib/util';
import { getChapters } from 'lib/contents-handler';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

type ChapterProps = {
    id: string;
    url: string;
    title: string;
    sections: SectionProps[];
};
type SectionProps = {
    id: string;
    url: string;
    title: string;
};

export const getStaticProps: GetStaticProps<{chapters: ChapterProps[]}> = async () => {
    const chapters = getChapters().map((chap) => ({
        ...pickSubset(chap, ["id", "url", "title"]),
        sections: chap.sections.map(sec => pickSubset(sec, ["id", "url", "title"])),
    }));
    return { props: { chapters }};
}

export default function Pages({ chapters }: InferGetStaticPropsType<typeof getStaticProps>) {
    const list: React.JSX.Element[] = [];
    for (const chapter of chapters) {
        list.push(<h2 key={`${chapter.id}-title`}>
            <Link href={chapter.url}>{chapter.title}</Link>
        </h2>);

        const section_elems: React.JSX.Element[] = [];
        for (const section of chapter.sections) {
            section_elems.push(
                <li key={`${chapter.id}-${section.id}`}>
                    <Link href={section.url}>{section.title}</Link>
                </li>
            );
        }

        list.push(<ul key={`${chapter.id}-sections`}>
            { section_elems }
        </ul>);
    }
    return (<>
        <h1>講義大綱</h1>
        { list }
        <h4><Link href="/">回到首頁</Link></h4>
    </>);
};