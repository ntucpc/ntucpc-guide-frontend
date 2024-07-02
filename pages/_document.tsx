import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap" rel="stylesheet" />
                <meta name="description" content="測試測試測試" />
                <meta property="og:image" content="https://guide.ntucpc.org/preview.png" />
                <meta property="og:site_name" content="NTUCPC Guide" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
