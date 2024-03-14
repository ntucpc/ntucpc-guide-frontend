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
        let description_node: React.ReactNode = <></>;
        if(mdx_path) {
            const subcontext: MarkdownContextType = {
                ...context,
                mdx_path,
            };
            description_node = <Submdx context={subcontext} />
        }
        return (
            <Paper variant="outlined" sx={{ padding: 2, margin: 2 }}>
                <Link href={url}>
                    [{src}] {name} ({difficulty})
                </Link>
                {description_node}
            </Paper>
        );
    };
}
