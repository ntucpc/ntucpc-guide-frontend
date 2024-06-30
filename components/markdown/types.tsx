import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type MarkdownContextType = {
    mdx_path: string;
    contents_mapping: Map<string, MDXRemoteSerializeResult>;
};