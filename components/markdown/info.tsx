import { MarkdownContextType, DirectiveType } from "./types";
import { Typography, Box, Alert, styled, AlertProps } from "@mui/material";

const AlertTrimmed = styled(Alert)<AlertProps>(({theme}) => ({
    "& > .MuiAlert-message :first-child": {
        marginTop: 0,
    },
    "& > .MuiAlert-message :last-child": {
        marginBottom: 0,
    }
}));

export function Info(context: MarkdownContextType) {
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
                <AlertTrimmed severity={resolved_type} id={id}>
                    {children}
                </AlertTrimmed>
            </Box>
        );
    };
}
