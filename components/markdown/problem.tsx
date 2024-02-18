import { Paper, Link } from "@mui/material";
import { MarkdownContextType, ProblemType } from "./types";

export function Problem(context: MarkdownContextType) {
    return ({
        src,
        name,
        url,
        solution,
        difficulty,
        children,
    }: ProblemType) => {
        return (
            <Paper variant="outlined" sx={{ padding: 2, margin: 2 }}>
                <Link href={url}>
                    [{src}] {name} ({difficulty})
                </Link>
                <div>{children}</div>
            </Paper>
        );
    };
}
