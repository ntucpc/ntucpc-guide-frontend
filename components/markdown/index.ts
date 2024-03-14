import { MarkdownContextType } from "./types";
import { Figure } from "./figure";
import { Refcode } from "./refcode";
import { Problem } from "./problem";
import { Reference } from "./reference";
import { Info } from "./info";
import { Theorem } from "./theorem";
import { Spoiler } from "./spoiler";
import { MyMdxTypography } from "./MyMdxTypography";
import { Hyperlink } from "./Hyperlink";
import { Divider, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { MdxTable } from "./Table";

export default function makeMarkdownComponents(
    context: MarkdownContextType
) {
    return {
        Figure: Figure(context),
        Refcode: Refcode(context),
        Problem: Problem(context),
        Reference: Reference(context),
        Info: Info(context),
        Theorem: Theorem(context),
        Spoiler: Spoiler(context),
        a: Hyperlink(context),
        h1: MyMdxTypography(context, "h3"),
        h2: MyMdxTypography(context, "h4"),
        h3: MyMdxTypography(context, "h5", 1),
        h4: MyMdxTypography(context, "h6", 2),
        h5: MyMdxTypography(context, "h6", 2),
        h6: MyMdxTypography(context, "h6", 2),
        p: MyMdxTypography(context, "body1", 3),
        hr: Divider,
        table: MdxTable(context),
        thead: TableHead,
        tbody: TableBody,
        tr: TableRow,
        th: TableCell,
        td: TableCell
    };
}
