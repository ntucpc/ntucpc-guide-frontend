import { MarkdownContextType } from "./types";
import Submdx from "components/submdx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faChevronDown, faChevronUp, faQuestionCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { HyperRefBlank } from "@/ntucpc-website-common-lib/components/basic";
import { useState } from "react";

/**
 * Problem attributes:
 * - url: url of online judge problem, defined in problem config (url)
 * - src: name of source, defined in problem config (src)
 * - name: problem name, defined in problem config (name)
 * - difficulty: difficulty, defined in the problem tag
 * - expanded: whether to expand the solution by default, true if the difficulty is 0
 * - descriptionMdx: description mdx file path, undefined if the file doesn't exist
 * - solution: solution name, defined in the problem tag
 * - solutionMdx: solution mdx file path, undefined if no solutoin
 * - importMdx (many): descriptionMdx and solutionMdx, for import mdx, used by remarkImport
 */
type ProblemProps = {
    url: string,
    src: string,
    name: string,
    difficulty: string,
    expanded: string,
    descriptionMdx: string,
    solution: string,
    solutionMdx: string,
    constraintsMdx: string,
    importMdx: string
};

export function Problem(context: MarkdownContextType) {
    return (props: ProblemProps) => {
        // console.log("problem test", props)
        let descriptionNode = <></>;
        if (props.descriptionMdx) {
            const subcontext: MarkdownContextType = {
                ...context,
                mdx_path: props.descriptionMdx
            };
            descriptionNode = <Submdx context={subcontext} />;
        }
        let constraintsNode = <></>;
        if (props.constraintsMdx) {
            const subcontext: MarkdownContextType = {
                ...context,
                mdx_path: props.constraintsMdx
            };
            constraintsNode = <Submdx context={subcontext} />;
        }
        let solutionNode: React.ReactNode = <></>;
        if (props.solutionMdx) {
            const subcontext: MarkdownContextType = {
                ...context,
                mdx_path: props.solutionMdx,
            };
            solutionNode = <Submdx context={subcontext} />;
        }
        let stars = <></>;
        if(props.difficulty === "?") {
            stars = <FontAwesomeIcon icon={faQuestionCircle} />
        } else if(props.difficulty !== "0") {
            stars = <>{
                Array.from({length: 5}, (_, index) => (
                    (index < parseInt(props.difficulty)) ? 
                    <FontAwesomeIcon key={index} icon={faStar}/> :
                    <FontAwesomeIcon key={index} icon={faEmptyStar} />
                ))
            }</>
        }

        const isSample = props.difficulty === "0";
        const typeColor = isSample ? "bg-orange-400" : "bg-blue-400";
        const titleColor = isSample ? "bg-orange-200 text-orange-800" : "bg-blue-200 text-blue-800";
        const borderColor = isSample ? "border-orange-500" : "border-blue-500"

        const [showSolution, setShowSolution] = useState(props.expanded === "true")

        return (
            <div className="my-4">
                <div className={`flex ${titleColor}`}>
                    <div className={`py-2 px-5 font-bold ${typeColor} text-white flex`}>
                        {isSample ? "例題" : "習題"}
                        {isSample ? <></> : <div className="ml-2">{stars}</div>}
                    </div>
                    <div className="py-2 px-3"> {props.name} </div>
                </div>
                <div className={`px-6 py-2 border-l border-r border-b ${borderColor}`}>
                    <div className="text-sm text-neutral-400">
                        Source:
                        { props.url ? 
                        <HyperRefBlank href={props.url} className="ml-2">{props.src}
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs ml-2" />
                        </HyperRefBlank> :
                        <span className="ml-2">{props.src}</span>
                        }
                    </div>
                    <div>
                        {descriptionNode}
                        
                        { props.constraintsMdx ?
                            <details className={`py-4`}>
                                <summary className="cursor-pointer">條件限制</summary>
                                {constraintsNode}
                            </details> : <></>
                        }
                    </div>

                </div>
                {props.solution &&
                    <>
                        <div className="mt-2 py-2 px-5 font-bold text-white bg-green-600 flex justify-between cursor-pointer"
                            onClick={() => { setShowSolution(!showSolution) }}>
                            <div>
                                題解
                            </div>
                            <div>
                                <FontAwesomeIcon icon={showSolution ? faChevronUp : faChevronDown} />
                            </div>
                        </div>
                        <div className="px-6 py-2 border-l border-r border-b border-green-800" hidden={!showSolution}>
                            {solutionNode}
                        </div>
                    </>
                }
            </div>
        )
    };
}
