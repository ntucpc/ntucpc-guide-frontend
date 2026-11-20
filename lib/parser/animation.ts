/* eslint-disable @typescript-eslint/no-explicit-any */
import { readdirSync, readFileSync } from "fs"
import path from "path"
import { visit } from "unist-util-visit"

const FRAME_PATTERN = /^(\d+)\.svg$/
const SVG_WIDTH_PATTERN = /<svg\b[^>]*?\swidth="([\d.]+)pt"/

// Other figures are PNGs exported with `--ppi 300` and shown at their pixel size,
// so show the SVG frames at the same size: 1pt = 300 / 72 px
const PX_PER_PT = 300 / 72

/* Display width in px of an SVG frame exported by Typst */
function getFrameWidth(framePath: string): number {
    const match = SVG_WIDTH_PATTERN.exec(readFileSync(framePath, "utf-8"))
    if (!match) {
        throw new Error(`Cannot find the width (in pt) of ${framePath}`)
    }
    return Math.round(parseFloat(match[1]) * PX_PER_PT)
}

/* Count the frames 1.svg, 2.svg, ..., N.svg in an animation directory */
function countFrames(frameDirectory: string): number {
    let files: string[]
    try {
        files = readdirSync(frameDirectory)
    } catch {
        throw new Error(`Animation directory ${frameDirectory} not found`)
    }
    const indices = files
        .map((file) => FRAME_PATTERN.exec(file))
        .filter((match) => match !== null)
        .map((match) => parseInt(match![1]))
        .sort((a, b) => a - b)
    if (indices.length === 0) {
        throw new Error(`No frames (1.svg, 2.svg, ...) in ${frameDirectory}`)
    }
    indices.forEach((index, i) => {
        if (index !== i + 1) {
            throw new Error(
                `Animation frames in ${frameDirectory} must be numbered 1.svg to N.svg without gaps`
            )
        }
    })
    return indices.length
}

/*
 * <animation src="name" /> refers to the directory figure/name/ that contains
 * the frames 1.svg, ..., N.svg (e.g. from `typst compile name.typ "name/{p}.svg"`).
 * Rewrite src to the public path, and add the frame count as `frames` and the
 * comma-separated display widths of the frames as `widths`.
 */
export function remarkAnimation(
    directory: string,
    getFigurePath: (directory: string, name: string) => string
) {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.name !== "animation") return
            const srcAttribute = node.attributes.find(
                (attribute: any) => attribute.name === "src"
            )
            if (!srcAttribute || typeof srcAttribute.value !== "string") {
                throw new Error("<animation> requires a string src attribute")
            }
            const name = srcAttribute.value
            const frameDirectory = path.join(directory, "figure", name)
            const frames = countFrames(frameDirectory)
            const widths = Array.from({ length: frames }, (_, i) =>
                getFrameWidth(path.join(frameDirectory, `${i + 1}.svg`))
            )
            srcAttribute.value = getFigurePath(directory, name)
            node.attributes.push({
                type: "mdxJsxAttribute",
                name: "frames",
                value: String(frames),
            })
            node.attributes.push({
                type: "mdxJsxAttribute",
                name: "widths",
                value: widths.join(","),
            })
        })
    }
}
