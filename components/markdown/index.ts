import { MarkdownContextType } from "./types";
import { Problem } from "./problem";
import { ContentReference } from "./content-reference";
import { getCommonLibComponents } from "@/ntucpc-website-common-lib/components";

export default function makeMarkdownComponents(
    context: MarkdownContextType
) {
    return {
        Problem: Problem(context),
        ContentReference: ContentReference,
        ...getCommonLibComponents()
    };
}
