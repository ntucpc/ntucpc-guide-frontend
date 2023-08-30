import Link from 'next/link';

import { getArticles } from 'lib/contents_handler';
import { ArticleDirectory } from 'lib/contents_handler';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export const getStaticProps: GetStaticProps<{articles: ArticleDirectory}> = async () => {
    const articles = await getArticles();
    return { props: { articles }};
}
export default function Pages({ articles }: InferGetStaticPropsType<typeof getStaticProps>) {
    const list: React.JSX.Element[] = [];
    for (const chapter in articles) {
        list.push(<h2>
            <Link href={`handout/${chapter}`}>{chapter}</Link>
        </h2>);

        const sections: React.JSX.Element[] = [];
        for (const section of articles[chapter]) {
            sections.push(
                <li key={`${chapter}-${section}`}>
                    <Link href={`handout/${chapter}/${section}`}>{section}</Link>
                </li>
            );
        }

        list.push(<ul>
            { sections }
        </ul>);
    }
    return (<>
        <h1>講義大綱</h1>
        { list }
        <h4><Link href="/">回到首頁</Link></h4>
    </>);
};