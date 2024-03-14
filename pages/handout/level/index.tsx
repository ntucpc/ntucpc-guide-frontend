import Link from 'next/link';

import { getLevels, LevelType } from 'lib/contents-handler';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Typography } from '@mui/material';

export const getStaticProps: GetStaticProps<{levels: LevelType[]}> = async () => {
    const levels = getLevels();
    return { props: { levels }};
}
export default function Pages({ levels }: InferGetStaticPropsType<typeof getStaticProps>) {
    const list: React.JSX.Element[] = [];
    for (const level of levels) {
        list.push(<Typography variant='h4' key={`${level.d_level.id}-title`}>
            {level.d_level.title}
            {/* <Link href={`handout/${chapter_name}`}>{chapter_name}</Link> */}
        </Typography>);

        const section_elems: React.JSX.Element[] = [];
        for (const section of level.d_sections) {
            section_elems.push(
                <li key={`${level.d_level.id}-${section.id}`}>
                    <Link href={section.url}>{section.title}</Link>
                </li>
            );
        }

        list.push(<ul key={`${level.d_level.id}-sections`}>
            { section_elems }
        </ul>);
    }
    return (<>
        <h1>講義大綱</h1>
        { list }
        <h4><Link href="/">回到首頁</Link></h4>
    </>);
};