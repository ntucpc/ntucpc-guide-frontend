export const reloadHighlightJsScript = `
const codeBlocks = document.getElementsByClassName("refcode");
Array.from(codeBlocks).forEach(codeBlock => {
    if (codeBlock.getAttribute("data-highlighted") != "yes") {
        hljs.highlightElement(codeBlock);
        if (!codeBlock.classList.contains("nohljsln"))
            hljs.lineNumbersBlock(codeBlock, {singleLine: true});
    }
})
`

export function reloadHighlightJs(notLoadedOk: boolean = false) {
    console.log("reload hljs")
    // hljs.initLineNumbersOnLoad() doesn't prevent rerendering
    // but lineNumbersBlock actually does ???
    // Note that lineNumbersBlock doesn't check nohljsln automatically
    eval(`
        try {
            ${reloadHighlightJsScript}
        }
        catch (e) {
            if (e instanceof ReferenceError) {
                if (!${notLoadedOk})
                    console.log("HighlightJS has not been loaded")
            }
            else {
                console.log("Cannot reload HighlightJS")
                console.log(e)
            }
        }
    `)
}

export function reloadMathJax(notLoadedOk: boolean = false) {
    console.log("reload MathJax")
    eval(`
    try {
        MathJax.typesetPromise()
    }
    catch (e) {
        if (e instanceof ReferenceError) {
            if (!${notLoadedOk})
                console.log("MathJax has not been loaded")
        }
        else {
            console.log("Cannot reload MathJax")
            console.log(e)
        }
    }
    `)
}
