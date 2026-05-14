import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faQuestionCircle, faStar, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { BLOCK_MARGIN, HyperRefBlank } from "@/ntucpc-website-common-lib/components/basic";

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
 * - (deprecated) importMdx (many): descriptionMdx and solutionMdx, for import mdx, used by remarkImport
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
};

export function Problem(depthLimit: number, MarkdownComponent: (props: { source: string, depthLimit: number }) => Promise<JSX.Element>) {
    return (props: ProblemProps) => {
        const descriptionNode =
            props.descriptionMdx ?
                <MarkdownComponent source={props.descriptionMdx} depthLimit={depthLimit} />
                : <></>
        const constraintsNode =
            props.constraintsMdx ?
                <MarkdownComponent source={props.constraintsMdx} depthLimit={depthLimit} />
                : <></>

        const isSample = props.difficulty === "0";
        const theme = isSample 
            ? { base: "indigo", label: "例題" }
            : { base: "emerald", label: "習題" };

        let difficultyDisplay = null;
        if (props.difficulty === "?") {
            difficultyDisplay = (
                <div className="flex items-center gap-1 text-gray-400" title="難度未知">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-xs" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Unknown</span>
                </div>
            );
        } else if (!isSample) {
            difficultyDisplay = (
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, index) => {
                        const active = index < parseInt(props.difficulty);
                        return (
                            <FontAwesomeIcon 
                                key={index} 
                                icon={active ? faStar : faEmptyStar} 
                                className={`text-[10px] ${active ? `text-${theme.base}-500` : "text-gray-200"}`} 
                            />
                        );
                    })}
                </div>
            );
        }

        return (
            <div className={`${BLOCK_MARGIN} rounded-xl border border-gray-100 overflow-hidden shadow-sm bg-white`}>
                {/* Header */}
                <div className={`flex items-center justify-between px-5 py-3 border-b border-gray-50 bg-${theme.base}-50/30`}>
                    <div className="flex items-center gap-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-${theme.base}-500 text-white`}>
                            {theme.label}
                        </span>
                        <h4 className="font-bold text-gray-900">{props.name}</h4>
                    </div>
                    {difficultyDisplay}
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    {/* Source Info */}
                    <div className="flex items-center gap-2 mb-4 text-[11px] font-bold text-gray-400 tracking-wider">
                        <span>Source:</span>
                        {props.url ? (
                            <HyperRefBlank href={props.url} className="text-indigo-500 hover:text-indigo-700 transition-colors flex items-center gap-1.5">
                                {props.src}
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[9px]" />
                            </HyperRefBlank>
                        ) : (
                            <span>{props.src}</span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="prose-sm prose-slate max-w-none mb-4 leading-relaxed">
                        {descriptionNode}
                    </div>

                    {/* Constraints */}
                    {props.constraintsMdx && (
                        <details className="group border border-gray-100 rounded-lg overflow-hidden">
                            <summary className="list-none cursor-pointer px-4 py-2 text-xs font-bold text-gray-500 bg-gray-50/50 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                <span>條件限制</span>
                                <FontAwesomeIcon icon={faChevronRight} className="text-[10px] group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100 bg-white">
                                {constraintsNode}
                            </div>
                        </details>
                    )}
                </div>
            </div>
        )
    };
}
