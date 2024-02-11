import { MarkdownContextType, ProblemType } from "./types";
import Link from "next/link";

export function Problem(context: MarkdownContextType) {
    return ({
        src,
        name,
        url,
        solution,
        difficulty,
        children,
    }: ProblemType) => {
        return (
            <>
                <Link href={url}>
                    [{src}] {name} ({difficulty})
                </Link>
                <div>{children}</div>
            </>
        );
    };
}
