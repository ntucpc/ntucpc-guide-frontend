import { Component, ReactNode } from "react";
import { NavBar } from "./navbar";
import { HyperRefBlank, Paragraph } from "@/ntucpc-website-common-lib/components/basic";
import Head from "next/head";

type Props = {
    children: ReactNode;
    sidebar?: boolean;
    title?: string;
}

const SIDEBAR_MARGIN = "lg:ml-80 2xl:mx-auto max-lg:mt-14";

export function ContentBody({ children, sidebar = false }: Props) {
    return <div className={`px-4 my-3 max-w-4xl mx-auto pt-5 font-sans 
            ${sidebar ? SIDEBAR_MARGIN : ""}`}>
        {children}
    </div>
}

export function PageFooter({ children, sidebar = false }: Props) {
    return <footer className={`w-full max-w-4xl mx-auto px-3 mt-20 text-sm text-neutral-500
            ${sidebar ? SIDEBAR_MARGIN : ""}`}>
        <Paragraph>
            國立臺灣大學程式解題社<br />
            National Taiwan University<br />
            Competitive Porgramming Club<br />
        </Paragraph>
        <Paragraph>
            This work is licensed under <HyperRefBlank href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</HyperRefBlank>
        </Paragraph>
    </footer>;
}


export function Layout(props: Props) {
    const title = props.title ? `${props.title} - NTUCPC Guide` : "NTUCPC Guide";
    return <>
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            {/* https://realfavicongenerator.net/ */}
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#6d5fff" />
            <link rel="shortcut icon" href="/favicon/favicon.ico" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
            <meta name="theme-color" content="#ffffff"></meta>
        </Head>
        <NavBar />
        {props.children}
        <PageFooter {...props} />
    </>
}