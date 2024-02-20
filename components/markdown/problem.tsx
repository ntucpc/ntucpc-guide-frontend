import { Paper, Link, Alert, Typography } from "@mui/material";
import { MarkdownContextType, ProblemType } from "./types";
import { MDXRemote } from "next-mdx-remote";
import makeMarkdownComponents from ".";

export function Problem(context: MarkdownContextType) {
    return ({
        src,
        name,
        url,
        mdx_path,
        solution,
        difficulty,
        children,
    }: ProblemType) => {
        const components = makeMarkdownComponents(context);
        const mdx_contents = context.contents_mapping.get(mdx_path);
        const problem_body = mdx_contents ? (
            <MDXRemote {...mdx_contents} components={components} />
        ) : (
            <Alert severity='error'>
                <Typography variant='h3'>MDX Content Not Found!</Typography>
            </Alert>
        );
        return (
            <Paper variant="outlined" sx={{ padding: 2, margin: 2 }}>
                <Link href={url}>
                    [{src}] {name} ({difficulty})
                </Link>
                {problem_body}
            </Paper>
        );
    };
}
