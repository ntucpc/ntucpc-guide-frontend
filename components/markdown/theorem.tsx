import { MarkdownContextType, DirectiveType } from "./types";
import { Typography, Box, Paper } from "@mui/material";

export function Theorem(context: MarkdownContextType) {
    // TODO: same as info blocks
    return ({ type, id, children }: DirectiveType) => {
        const cap_type = type.charAt(0).toUpperCase() + type.slice(1);
        return (
            <Paper variant="outlined" sx={{ padding: 2, margin: 2 }}>
                <Typography variant="h6">
                    {cap_type}. {id}
                </Typography>
                {children}
            </Paper>
        );
    };
}
