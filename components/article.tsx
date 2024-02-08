/* Implement custom componenets in articles */
import Image from 'next/image';
type FigureType = {
    src: string,
    width: string
};
type ProblemType = {
    src: string,
    solution: string,
    is_sample: boolean
};

type Directive = {
    type: string,
    id?: string
}

class Handler {
    chapter: string;
    section: string;
    constructor(chapter: string, section: string) {
        this.chapter = chapter;
        this.section = section;
    }
    Figure() {
        return ({ src, width }: FigureType) => {
            return <h1>Figure here with {this.chapter} and {this.section} and {src} and {width}</h1>
        };
    }
    Problem() {
        return ({ src, solution, is_sample }: ProblemType) => {
            return <h1>Problem here with {this.chapter} and {this.section}, Is sample? {is_sample}</h1>
        };
    }
    Refcode() {
        return () => {
            return <h1>Problem here with {this.chapter} and {this.section}</h1>
        };
    }
    Reference() {
        return (props: any) => {
            return <h1>Reference here</h1>
        };
    }
    Info() {
        return ({ type, id }: Directive) => {
            return <h2>Info Directive: type = {type} and id = {id}</h2>
        };
    }
    Theorem() {
        return ({ type, id }: Directive) => {
            return <h2>Theorem Directive: type = {type} and id = {id}</h2>
        };
    }
    Spoiler() {
        return ({ type, id }: Directive) => {
            return <h2>Spoiler Directive: type = {type} and id = {id}</h2>
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