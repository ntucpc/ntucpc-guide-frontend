import { ContentBody, PageFooter } from "@/components/layout";
import { NavBar } from "@/components/navbar";
import { ReactNode } from "react";

export default function TOCLayout({ children }: { children: ReactNode }) {
    return <>
        <NavBar />
        <ContentBody>
            {children}
            <PageFooter/>
        </ContentBody>
    </>
}