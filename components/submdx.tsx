import makeMarkdownComponents from "./markdown";
import { MarkdownContextType } from "./markdown/types";
import { MDXRemote } from "next-mdx-remote";

export type SubmdxType = {
    context: MarkdownContextType;
};

export default function Submdx({context}: SubmdxType) {
    // console.log(context.contents_mapping)
    const components = makeMarkdownComponents(context);
    const mdx_content = context.contents_mapping.get(context.mdx_path);
    if (mdx_content) {
        return <MDXRemote {...mdx_content} components={makeMarkdownComponents(context)} />;
    } else {
        throw Error(`Mdx content not found: ${context.mdx_path}`);
    }
}
