import { Component, ReactNode } from "react";
import { NavBar } from "./navbar";
import { PageFooter } from "./page-footer";

type ContentBodyProps = {
    children: ReactNode;
    sidebar?: boolean;
}

export function ContentBody({children, sidebar=false}: ContentBodyProps) {
    return <div className={`px-3 my-3 max-w-4xl mx-auto pt-5 font-sans ${sidebar ? "lg:ml-64 2xl:mx-auto max-lg:mt-14" : ""}`}>
        {children}
    </div>
}

export function Layout(props: any) {
    return <>
        <NavBar />
        {props.children}
        <PageFooter />
    </>
}