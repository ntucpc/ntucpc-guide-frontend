import { existsSync, readdirSync } from "fs"
import { readFile } from "fs/promises"
import path from "path"
import { getGuideRoot } from "./environment"
import { readConfig } from "./config"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkMdx from "remark-mdx"
import remarkDirective from "remark-directive"
import remarkGfm from "remark-gfm"
import { preprocessMdx } from "./parser/util"
import { getArticleMdxPath, getArticles } from "./structure/articles"
import { remarkProblemScan } from "./parser/problem-scanner"

export type Problem = {
    code: string // ExampleSource/example_problem
    sourceCode: string // ExampleSource
    problemCode: string // example_problem
    name: string
    source: string
    url: string | undefined
}

export type ProblemOccur = {
    article: string
    difficulty: string
}

const PROBLEMS_PATH = path.join(getGuideRoot(), "problems")

const problems = (() => {
    const problems: Map<string, Problem> = new Map()
    readdirSync(PROBLEMS_PATH, { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .forEach((dirent) => {
            const sourceCode = dirent.name
            readdirSync(path.join(PROBLEMS_PATH, sourceCode), {
                withFileTypes: true,
            })
                .filter((dir) => dir.isDirectory)
                .forEach((dirent) => {
                    const problemCode = dirent.name
                    const directory = path.join(
                        PROBLEMS_PATH,
                        sourceCode,
                        problemCode
                    )
                    const configPath = path.join(directory, "config.json")
                    if (!existsSync(configPath)) return
                    const problemConfig = readConfig(configPath)
                    const code = `${sourceCode}/${problemCode}`
                    problems.set(code, {
                        code: code,
                        sourceCode: sourceCode,
                        problemCode: problemCode,
                        ...problemConfig,
                    })
                })
        })
    return problems
})()

export function getProblems(): Problem[] {
    return Array.from(problems.values())
}
export function getProblem(code: string): Problem | undefined {
    return problems.get(code)
}
export async function getProblemOccurs(): Promise<Map<string, ProblemOccur[]>> {
    const problemOccurs: Map<string, ProblemOccur[]> = new Map()
    problems.forEach((problem) => problemOccurs.set(problem.code, []))
    const addOccur = (problemCode: string, occur: ProblemOccur) => {
        problemOccurs.get(problemCode)!.push(occur)
    }
    // move this to a place in charge of all preprocessing in the future
    for (const article of getArticles()) {
        if (!article.valid) continue
        const mdxPath = getArticleMdxPath(article.code)
        const source = preprocessMdx(
            await readFile(mdxPath, { encoding: "utf-8" })
        )
        // Only the syntax tree is needed here, so parse without compiling
        const processor = unified()
            .use(remarkParse)
            .use(remarkMdx)
            .use(remarkDirective)
            .use(remarkGfm)
            .use(remarkProblemScan, addOccur, article.code)
        await processor.run(processor.parse(source))
    }
    return problemOccurs
}
