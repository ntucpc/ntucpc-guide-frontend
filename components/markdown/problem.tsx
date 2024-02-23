import { Paper, Link } from "@mui/material";
import { MarkdownContextType, ProblemType } from "./types";
import Submdx from "components/submdx";

export function Problem(context: MarkdownContextType) {
    return ({
        src,
        name,
        url,
        mdx_path,
        solution,
        difficulty,
    }: ProblemType) => {
        const subcontext: MarkdownContextType = {
            ...context,
            mdx_path: mdx_path,
        }
        return (
            <Paper variant="outlined" sx={{ padding: 2, margin: 2 }}>
                <Link href={url}>
                    [{src}] {name} ({difficulty})
                </Link>
                <Submdx context={subcontext} />
            </Paper>
        );
    };
}
