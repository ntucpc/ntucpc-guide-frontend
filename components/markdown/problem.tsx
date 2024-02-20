import { Paper, Link, Alert, Typography } from "@mui/material";
import { MarkdownContextType, ProblemType } from "./types";
import { MDXRemote } from "next-mdx-remote";
import makeMarkdownComponents from ".";
import Submdx from "components/submdx";

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
        return (
            <Paper variant="outlined" sx={{ padding: 2, margin: 2 }}>
                <Link href={url}>
                    [{src}] {name} ({difficulty})
                </Link>
                <Submdx mdx_path={mdx_path} context={context} />
            </Paper>
        );
    };
}
