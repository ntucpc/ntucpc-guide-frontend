import makeMarkdownComponents from "./markdown";
import { SubmdxType } from "./markdown/types";
import { MDXRemote } from "next-mdx-remote";
import { Alert, Typography } from "@mui/material";

export default function Submdx({
    mdx_path,
    context,
}: SubmdxType) {
    const components = makeMarkdownComponents(context);
    const mdx_content = context.contents_mapping.get(mdx_path);
    if (mdx_content) {
        return <MDXRemote {...mdx_content} components={components} />;
    } else {
        return (
            <Alert severity="error">
                <Typography variant="h3">
                    MDX content not found! Please Contact the author.
                </Typography>
            </Alert>
        );
    }
}
