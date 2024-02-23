import { Typography, TypographyOwnProps } from "@mui/material";
import { MarkdownContextType } from "./types";

type TypographyVariantType = TypographyOwnProps["variant"];

export function WeightedTypography(context: MarkdownContextType, weight: TypographyVariantType = "body1") {
    return (obj: any) => {
        return (
            <Typography variant={weight} padding={1}>
                {obj.children}
            </Typography>
        )
    }
}