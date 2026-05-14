import { ContentBody, PageFooter } from "@/components/layout";
import { NavBar } from "@/components/navbar";
import { PageReloader } from "@/components/reloader";
import { Sidebar } from "@/components/sidebar/sidebar";
import HightlightJsScript from "@/ntucpc-website-common-lib/scripts/highlightjs";
import MathJaxJS from "@/ntucpc-website-common-lib/scripts/mathjax";
import { ReactNode } from "react";
export default function ArticleLayout({children}: {children: ReactNode}) {
    return <>
        <NavBar/>
        <div className="flex justify-center w-full">
            <div className="xl:flex relative items-start gap-10 w-full max-w-[100rem]">
                <Sidebar/>
                <div className="flex-grow min-w-0 pt-5">
                    <ContentBody>
                        {children}
                        <PageFooter/>
                    </ContentBody>
                </div>
                <div className="hidden xl:block w-80 shrink-0" />
            </div>
        </div>
        <PageReloader/>
        <HightlightJsScript/>
        <MathJaxJS/>
    </>
}