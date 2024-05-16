import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type MarkdownContextType = {
    mdx_path: string;
    contents_mapping: Map<string, MDXRemoteSerializeResult>;
};
export type FigureType = {
    src: string;
    width: string;
};
export type ProblemType = {
    src: string;
    name: string;
    url: string;
    mdx_path: string;
    sol_path: string;
    solution: string;
    difficulty: string;
    expanded: "true" | "false";
};
export type RefcodeType = {
    lang: string;
    lineno: string;
    code: string;
};
export type ReferenceType = {
    type: string;
    id: string;
};
export type DirectiveType = {
    type: string;
    id?: string;
    children: React.ReactNode;
};
export type ParagraphType = {
    children: React.ReactNode;
};
export type HyperlinkType = {
    href: string;
    children: React.ReactNode;
};
export type TableElementType = {
    children: React.ReactNode;
};
