import { Component } from "react";
import { NavBar } from "./navbar";
import { PageFooter } from "./page-footer";

export function Layout(props: any) {
    return <>
        <NavBar />
        <div className={`px-3 my-3 max-w-4xl mx-auto pt-5 font-sans`}>
            {props.children}
        </div>
        <PageFooter />
    </>
}