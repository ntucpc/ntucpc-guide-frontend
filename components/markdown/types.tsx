export type MarkdownContextType = {
    chapter: string;
    title: string;
};
export type FigureType = {
    src: string;
    width: string;
};
export type ProblemType = {
    src: string;
    name: string;
    url: string;
    solution: string;
    difficulty: string;
    children: React.ReactNode;
};
export type RefcodeType = {
    code: string;
};
export type ReferenceType = {
    type: string;
    id: string;
};
export type DirectiveType = {
    type: string;
    id?: string;
    children: React.ReactNode;
};
