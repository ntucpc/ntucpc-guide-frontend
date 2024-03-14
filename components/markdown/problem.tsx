import { Paper, Link, Divider, Typography, Box } from "@mui/material";
import { MarkdownContextType, ProblemType } from "./types";
import Submdx from "components/submdx";

export function Problem(context: MarkdownContextType) {
    return ({
        src,
        name,
        url,
        mdx_path,
        sol_path,
        solution,
        difficulty,
    }: ProblemType) => {
        let description_node: React.ReactNode = <></>;
        let solution_node: React.ReactNode = <></>;
        if (mdx_path) {
            const subcontext: MarkdownContextType = {
                ...context,
                mdx_path,
            };
            description_node = <Submdx context={subcontext} />;
        }
        if (sol_path) {
            const subcontext: MarkdownContextType = {
                ...context,
                mdx_path: sol_path,
            };
            solution_node = <Submdx context={subcontext} />;
        }
        return (
            <Paper variant="outlined" sx={{ padding: 2, margin: 2 }}>
                <Link href={url}>
                    [{src}] {name} ({difficulty})
                </Link>
                {description_node}
                {sol_path && (
                    <>
                        <Box paddingTop={2} paddingBottom={2}>
                            <Divider />
                        </Box>
                        <Typography variant="h5">
                            Solution: {solution}
                        </Typography>
                        {solution_node}
                    </>
                )}
            </Paper>
        );
    };
}
