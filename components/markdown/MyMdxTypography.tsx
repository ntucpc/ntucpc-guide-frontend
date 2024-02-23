import { Typography, TypographyOwnProps } from "@mui/material";
import { MarkdownContextType } from "./types";

type TypographyVariantType = TypographyOwnProps["variant"];

export function MyMdxTypography(
    context: MarkdownContextType,
    weight: TypographyVariantType = "body1",
    horizontal_padding: number = 0
) {
    return (obj: any) => {
        return (
            <Typography
                variant={weight}
                margin={1}
                paddingLeft={horizontal_padding}
                paddingRight={horizontal_padding}
            >
                {obj.children}
            </Typography>
        );
    };
}
