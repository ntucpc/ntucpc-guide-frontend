/* Implement custom componenets in articles */
import path from 'path';
import Link from 'next/link';

type FigureType = {
    src: string,
    width: string
};
type ProblemType = {
    src: string,
    name: string,
    url: string,
    solution: string,
    difficulty: string,
    children: React.ReactNode
};
type RefcodeType = {
    code: string
}
type ReferenceType = {
    type: string,
    id: string
}
type Directive = {
    type: string,
    id?: string,
    children: React.ReactNode
}

class Handler {
    chapter: string;
    section: string;
    constructor(chapter: string, section: string) {
        this.chapter = chapter;
        this.section = section;
    }
    encodeID(id: string) {
        return "ref-" + id;
    }
    Figure() {
        return ({ src, width }: FigureType) => {
            // Although Image has better performance over img, the dimension cannot be automatically grabbed.
            return <img src={src.replaceAll(/\\/g, '/').replace(/^public/g, '')} width={+width} alt={""} />
        };
    }
    Problem() {
        return ({ src, name, url, solution, difficulty, children }: ProblemType) => {
            return <><Link href={url}>[{src}] {name} ({difficulty})</Link><div>{children}</div></>
        };
    }
    Refcode() {
        return ({ code }: RefcodeType) => {
            // Temporary workaround for debugging display, should be replaced by css or anything.
            return <code style={{whiteSpace: "pre-wrap"}}>{code}</code>
        };
    }
    Reference() {
        return ({ type, id }: ReferenceType) => {
            return <Link href={'#' + this.encodeID(id)}>Reference here</Link>
        };
    }
    Info() {
        return ({ type, id, children }: Directive) => {
            return <><h2 id={id ? this.encodeID(id) : undefined}>Info Directive: type = {type} and id = {id}</h2><div className={"info-dir " + type}>{children}</div></>
        };
    }
    Theorem() {
        return ({ type, id, children }: Directive) => {
            return <><h2 id={id ? this.encodeID(id) : undefined}>Theorem Directive: type = {type} and id = {id}</h2><div className={"theorem-dir " + type}>{children}</div></>
        };
    }
    Spoiler() {
        return ({ type, id, children }: Directive) => {
            return <><h2 id={id ? this.encodeID(id) : undefined}>Spoiler Directive: type = {type} and id = {id}</h2><div className={"spoiler"}>{children}</div></>
        };
    }
    build() {
        return {
            Figure: this.Figure(),
            Refcode: this.Refcode(),
            Problem: this.Problem(),
            Reference: this.Reference(),
            Info: this.Info(),
            Theorem: this.Theorem(),
            Spoiler: this.Spoiler(),
        };
    }
};

function handlerBuilder(chapter: string, section: string) {
    return new Handler(chapter, section).build();
}
export default handlerBuilder;