import { MarkdownContextType, DirectiveType } from "./types";
import { Typography, Box, Alert, styled, AlertProps } from "@mui/material";

const AlertTrimmed = styled(Alert)<AlertProps>(({theme}) => ({
    "& > .MuiAlert-message :first-child": {
        marginTop: 0,
    },
    "& > .MuiAlert-message :last-child": {
        marginBottom: 0,
    },
    "& > .MuiAlert-message > p": {
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
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
            <AlertTrimmed severity={resolved_type} id={id} sx={{padding: 2, margin: 2}}>
                {children}
            </AlertTrimmed>
        );
    };
}
