import type { AppProps } from "next/app";
import "@/styles/global.css";
import "@/styles/hljs-custom.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
// import "@/styles/nord.css";
// import "@/styles/dracula.css";
import "@/styles/atom-one-dark.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Component {...pageProps} />
    );
}
