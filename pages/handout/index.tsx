import Link from 'next/link';
export default function() {
    return (<>
        <h1>Example page!</h1>
        <h2><Link href="/">Go back to home</Link></h2>
    </>);
};