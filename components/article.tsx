/* Implement custom componenets in articles */
import path from 'path';
import Link from 'next/link';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';

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
            return <img src={path.join("/guide/content", this.chapter, this.section, 'figure', src).replaceAll(/\\/g, '/')} width={+width} alt={""} />
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
            console.log(id);
            console.log(this.encodeID(id));
            return <Link href={'#' + this.encodeID(id)}>Reference here</Link>
        };
    }
    Info() {
        // TODO: contents are wrapped by an extra layer of <p></p>. have to play with MDX tree to remove it.
        type InfoTypes = "success" | "info" | "warning" | "error";
        return ({ type, id, children }: Directive) => {
            if(type == "danger") type = "error";
            let resolved_type: InfoTypes;
            switch(type) {
                case "danger":
                    type = "error";
                    break;
                case "success":
                case "info":
                case "warning":
                case "error":
                    break;
                default:
                    return <Typography>Unknown Info Type!</Typography>
            }
            resolved_type = type as InfoTypes;
            return (
                <Box padding={2}>
                    <Alert severity={resolved_type} id={id}>{children}</Alert>
                </Box>
            );
        };
    }
    Theorem() {
        // TODO: same as info blocks
        return ({ type, id, children}: Directive) => {
            const cap_type = type.charAt(0).toUpperCase() + type.slice(1);
            return (
                <Box padding={2}>
                    <Paper variant="outlined">
                        <Box padding={2}>
                            <Typography variant="h6">{cap_type}. {id}</Typography>
                            {children}
                        </Box>
                    </Paper>
                </Box>
            );
        };
    }
    Spoiler() {
        return ({ type, id, children }: Directive) => {
            return (
                <Box padding={2}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1-content"
                            id={`accordion-heading-${id}`}
                        >
                            Spoiler
                        </AccordionSummary>
                        <AccordionDetails>
                            {children}
                        </AccordionDetails>
                    </Accordion>
                </Box>
            )
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
