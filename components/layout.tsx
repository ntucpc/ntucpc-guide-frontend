import { Component, ReactNode } from "react";
import { NavBar } from "./navbar";
import { HyperRefBlank, Paragraph } from "@/ntucpc-website-common-lib/components/basic";

type Props = {
    children: ReactNode;
    sidebar?: boolean;
}

const SIDEBAR_MARGIN = "lg:ml-80 2xl:mx-auto max-lg:mt-14";

export function ContentBody({children, sidebar=false}: Props) {
    return <div className={`px-3 my-3 max-w-4xl mx-auto pt-5 font-sans 
            ${sidebar ? SIDEBAR_MARGIN : ""}`}>
        {children}
    </div>
}

export function PageFooter({children, sidebar=false}: Props) {
    return <div className={`w-full max-w-4xl mx-auto px-3 mt-20 text-sm text-neutral-500
            ${sidebar ? SIDEBAR_MARGIN : ""}`}>
        <Paragraph>
            國立臺灣大學程式解題社<br/>
            National Taiwan University<br/>
            Competitive Porgramming Club<br/>
        </Paragraph>
        <Paragraph>
            This work is licensed under <HyperRefBlank href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</HyperRefBlank>
        </Paragraph>
    </div>;
}


export function Layout({children, sidebar=false}: Props) {
    return <>
        <NavBar />
        {children}
        <PageFooter children={children} sidebar={sidebar} />
    </>
}