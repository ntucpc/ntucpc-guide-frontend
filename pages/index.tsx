import Link from 'next/link';
export default function() {
    return (<>
        <h1>程式解題社—講義</h1>
        <h2>
            <Link href="/handout">大綱（按照主題分類）</Link>
        </h2>
        <h2>
            <Link href="/handout/level">大綱（按照難度分類）</Link>
        </h2>
    </>);
};