import { ContentBody } from "@/components/layout";
import { PageReloader } from "@/components/reloader";
import { Sidebar } from "@/components/sidebar/sidebar";
import HightlightJsScript from "@/ntucpc-website-common-lib/scripts/highlightjs";
import MathJaxJS from "@/ntucpc-website-common-lib/scripts/mathjax";
import { ReactNode } from "react";

export default function ArticleLayout({children}: {children: ReactNode}) {
    return <>
        <div className="xl:flex justify-center items-start gap-10 max-w-[1200px] mx-auto">
            <Sidebar/>
            <ContentBody>
                {children}
            </ContentBody>
        </div>
        <PageReloader/>
        <HightlightJsScript/>
        <MathJaxJS/>
    </>
}