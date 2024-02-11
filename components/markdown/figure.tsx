import { MarkdownContextType, FigureType } from "./types";

export function Figure(context: MarkdownContextType) {
    return ({ src, width }: FigureType) => {
        // Although Image has better performance over img, the dimension cannot be automatically grabbed.
        return <img src={src} width={+width} alt={""} />;
    };
}
