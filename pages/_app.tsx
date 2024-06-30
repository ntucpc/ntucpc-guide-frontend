import type { AppProps } from "next/app";
import "@/styles/global.css";
import "@/styles/hljs-custom.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Component {...pageProps} />
    );
}
