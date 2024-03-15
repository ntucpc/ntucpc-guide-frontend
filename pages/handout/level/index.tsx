import Link from 'next/link';

import { getLevels, LevelType } from 'lib/contents-handler';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Typography } from '@mui/material';

type SectionProps = {
    id: string;
    url: string;
    title: string;
};
type LevelProps = {
    id: string;
    url: string;
    title: string;
    sections: SectionProps[];
};

export const getStaticProps: GetStaticProps<{levels: LevelProps[]}> = async () => {
    const levels = getLevels().map((lvl) => {
        const sections = lvl.sections.map((sec) => {
            const {id, url, title} = sec;
            return {id, url, title};
        })
        const {id, url, title} = lvl;
        return { id, url, title, sections, };
    });
    return { props: { levels }};
}
export default function Pages({ levels }: InferGetStaticPropsType<typeof getStaticProps>) {
    const list: React.JSX.Element[] = [];
    for (const level of levels) {
        list.push(<Typography variant='h4' key={`${level.id}-title`}>
            {level.title}
            {/* <Link href={`handout/${chapter_name}`}>{chapter_name}</Link> */}
        </Typography>);

        const section_elems: React.JSX.Element[] = [];
        for (const section of level.sections) {
            section_elems.push(
                <li key={`${level.id}-${section.id}`}>
                    <Link href={section.url}>{section.title}</Link>
                </li>
            );
        }

        list.push(<ul key={`${level.id}-sections`}>
            { section_elems }
        </ul>);
    }
    return (<>
        <h1>講義大綱</h1>
        { list }
        <h4><Link href="/">回到首頁</Link></h4>
    </>);
};