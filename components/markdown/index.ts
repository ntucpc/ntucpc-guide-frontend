import { MarkdownContextType } from "./types";
import { Figure } from "./figure";
import { Refcode } from "./refcode";
import { Problem } from "./problem";
import { Reference } from "./reference";
import { Info } from "./info";
import { Theorem } from "./theorem";
import { Spoiler } from "./spoiler";

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
    };
}
