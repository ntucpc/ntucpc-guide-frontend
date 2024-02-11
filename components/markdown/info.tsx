import { MarkdownContextType, DirectiveType } from "./types";
import { Typography, Box, Alert } from "@mui/material";

export function Info(context: MarkdownContextType) {
    // TODO: contents are wrapped by an extra layer of <p></p>. have to play with MDX tree to remove it.
    type InfoTypes = "success" | "info" | "warning" | "error";
    return ({ type, id, children }: DirectiveType) => {
        if (type == "danger") type = "error";
        let resolved_type: InfoTypes;
        switch (type) {
            case "danger":
                type = "error";
                break;
            case "success":
            case "info":
            case "warning":
            case "error":
                break;
            default:
                return <Typography>Unknown Info Type!</Typography>;
        }
        resolved_type = type as InfoTypes;
        return (
            <Box padding={2}>
                <Alert severity={resolved_type} id={id}>
                    {children}
                </Alert>
            </Box>
        );
    };
}
