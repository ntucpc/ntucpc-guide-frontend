(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,54513,__turbopack_context__=>{"use strict";let reloadHighlightJsScript=`
const codeBlocks = document.getElementsByClassName("refcode");
Array.from(codeBlocks).forEach(codeBlock => {
    if (codeBlock.getAttribute("data-highlighted") != "yes") {
        hljs.highlightElement(codeBlock);
        if (!codeBlock.classList.contains("nohljsln"))
            hljs.lineNumbersBlock(codeBlock, {singleLine: true});
    }
})
`;function reloadHighlightJs(notLoadedOk=!1){console.log("reload hljs"),eval(`
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
    `)}function reloadMathJax(notLoadedOk=!1){console.log("reload MathJax"),eval(`
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
    `)}__turbopack_context__.s(["reloadHighlightJs",0,reloadHighlightJs,"reloadHighlightJsScript",0,reloadHighlightJsScript,"reloadMathJax",0,reloadMathJax])},18566,(e,t,l)=>{t.exports=e.r(76562)},9255,e=>{"use strict";var t=e.i(54513),l=e.i(18566),s=e.i(71645);function a(){let e=(0,l.usePathname)();return(0,s.useEffect)(()=>{let e=requestAnimationFrame(()=>{(0,t.reloadMathJax)(),(0,t.reloadHighlightJs)()});return()=>cancelAnimationFrame(e)},[e]),null}e.s(["PageReloader",0,a])},36519,e=>{"use strict";var t=e.i(43476),l=e.i(71645),s=e.i(22016),a=e.i(18566),n=e.i(11488),o=e.i(68757);function r({children:e}){return(0,t.jsx)("div",{className:`flex-grow overflow-y-auto mt-2 pr-2
                        scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin 
                        scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent`,children:e})}function c({group:e,folded:a,toggleFold:r,activeArticle:i}){let d=(0,l.useId)();return(0,t.jsxs)("div",{className:"mb-1",children:[(0,t.jsxs)("button",{type:"button",className:"w-full text-left flex items-center gap-2 py-1.5 px-2 text-sm font-bold text-fg-secondary select-none cursor-pointer hover:bg-surface-muted rounded-md transition-colors",onClick:r,"aria-expanded":!a,"aria-controls":d,children:[(0,t.jsx)(n.FontAwesomeIcon,{icon:o.faAngleRight,className:`text-[10px] text-fg-subtle transition-transform duration-200 ${a?"":"rotate-90"}`}),(0,t.jsx)("span",{className:"truncate",children:e.title})]}),(0,t.jsx)("ul",{id:d,className:`pl-4 space-y-0.5 mt-0.5 border-l border-line ml-3.5 ${a?"hidden":"block"}`,children:e.items.map(e=>{let l=i===e.id;return(0,t.jsx)("li",{className:"select-none",children:e.coming?(0,t.jsxs)("div",{className:"flex justify-between items-center py-1.5 px-3 text-sm text-fg-subtle",children:[(0,t.jsx)("span",{children:e.title}),(0,t.jsx)("span",{className:"text-[10px] bg-surface-muted text-fg-muted px-1.5 py-0.5 rounded-full",children:"待續"})]}):(0,t.jsx)(s.default,{href:e.url,"aria-current":l?"page":void 0,className:`block py-1.5 px-3 text-sm rounded-md focus-visible:outline-offset-[-2px] transition-all duration-200 ${l?"text-accent-600 bg-accent-50 font-medium border-l-2 border-accent-600 -ml-[1px]":"text-fg-secondary hover:text-accent-600 hover:bg-surface-subtle"}`,children:e.title})},e.id)})})]})}function i({section:e,folding:l,activeArticle:s}){return(0,t.jsx)("div",{className:"flex flex-col h-[calc(100vh-180px)]",children:(0,t.jsx)(r,{children:e.groups.map(a=>(0,t.jsx)(c,{group:a,folded:l.isFolded(e.id,a.id),toggleFold:()=>l.toggle(e.id,a.id),activeArticle:s},a.id))})})}function d({category:e,setSelectedSection:l}){return(0,t.jsx)("div",{className:"flex flex-col h-[calc(100vh-180px)]",children:(0,t.jsx)(r,{children:(0,t.jsx)("div",{className:"space-y-1",children:e.sections.map(e=>(0,t.jsx)("button",{type:"button",className:"block w-full text-left px-3 py-2 text-sm text-fg-tertiary font-medium rounded-md hover:bg-surface-subtle hover:text-accent-600 cursor-pointer transition-colors",onClick:()=>l(e.id),children:e.title},e.id))})})})}let x=0,u=1;function m(e){let s=(0,a.useParams)(),r=s?.topic,[c,m]=(0,l.useState)(r+"/"+s?.article),h=e.chapterMapping[c],[f,p]=(0,l.useState)(x),[g,b]=(0,l.useState)([h,r]),[j,v]=(0,l.useState)(!1),[y,w]=(0,l.useState)([new Map,new Map]),N=(e,t,l)=>y[e].has(t)&&y[e].get(t).has(l)?!j:j,k=(e,t,l)=>{let s=new Set(y[e].get(t)||[]);s.has(l)?s.delete(l):s.add(l);let a=[...y];a[e].set(t,s),w(a)},C=e=>{w([new Map,new Map]),v(e)};(0,l.useEffect)(()=>{let t=s?.topic,l=t+"/"+s?.article,a=[e.chapterMapping[l],t];m(l),b(a)},[s,e.chapterMapping]);let[S,A]=(0,l.useState)("default");(0,l.useEffect)(()=>{A("default")},[s]);let E=(0,l.useId)(),M=e.categories[f],$=g[f];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button","aria-expanded":!1,"aria-controls":E,className:`fixed bg-page shadow-sm w-full text-left z-[999] select-none cursor-pointer border-b 
                ${!0===S?"hidden":!1===S?"block":"xl:hidden"}`,onClick:()=>A(!0),children:(0,t.jsx)("span",{className:"flex justify-center w-full",children:(0,t.jsxs)("span",{className:"block xl:flex items-start gap-10 w-full max-w-[100rem]",children:[(0,t.jsx)("span",{className:"block flex-grow",children:(0,t.jsxs)("span",{className:"w-full max-w-4xl px-4 py-3 text-accent-600 font-bold text-sm flex items-center gap-2",children:[(0,t.jsx)(n.FontAwesomeIcon,{icon:o.faAngleDoubleRight})," ","展開目錄"]})}),(0,t.jsx)("span",{className:"hidden xl:block w-80 shrink-0"})]})})}),(0,t.jsxs)("aside",{id:E,"aria-label":"課程目錄",className:`fixed bg-page xl:sticky top-16 w-full sm:max-w-[20rem] xl:max-w-none xl:w-80 shrink-0 z-[999] 
                ${!0===S?"block":!1===S?"hidden":"hidden xl:block"} 
                h-[calc(100vh-64px)] p-4`,children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,t.jsx)("div",{className:"flex bg-surface-muted p-1 rounded-lg w-fit",children:[{id:x,label:"章節"},{id:u,label:"主題"}].map(e=>(0,t.jsx)("button",{type:"button","aria-pressed":f===e.id,onClick:()=>p(e.id),className:`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${f===e.id?"bg-surface text-accent-600 shadow-sm":"text-fg-muted hover:text-fg-secondary"}`,children:e.label},e.id))}),(0,t.jsxs)("div",{className:"flex items-center gap-3 text-fg-subtle",children:[(0,t.jsx)("button",{type:"button",onClick:()=>C(!1),title:"全部展開","aria-label":"全部展開",className:"hover:text-accent-500 transition-colors",children:(0,t.jsx)(n.FontAwesomeIcon,{icon:o.faUpRightAndDownLeftFromCenter,className:"text-sm"})}),(0,t.jsx)("button",{type:"button",onClick:()=>C(!0),title:"全部收合","aria-label":"全部收合",className:"hover:text-accent-500 transition-colors",children:(0,t.jsx)(n.FontAwesomeIcon,{icon:o.faDownLeftAndUpRightToCenter,className:"text-sm"})}),(0,t.jsx)("button",{type:"button","aria-controls":E,onClick:()=>A(!1),title:"隱藏","aria-label":"隱藏目錄",className:"hover:text-rose-500 transition-colors",children:(0,t.jsx)(n.FontAwesomeIcon,{icon:o.faXmark,className:"text-base"})})]})]}),(0,t.jsx)("div",{className:"flex items-center gap-2 text-xs font-bold text-fg-subtle mb-2 px-1",children:$?(0,t.jsxs)("button",{type:"button",title:`返回${M.title}`,className:"flex items-center gap-1 text-left cursor-pointer hover:text-accent-600 transition-colors",onClick:()=>{let e=[...g];e[f]=null,b(e)},children:[(0,t.jsx)("span",{children:M.title}),(0,t.jsx)(n.FontAwesomeIcon,{icon:o.faAngleRight,className:"text-[8px]"}),(0,t.jsx)("span",{className:"text-fg",children:M.sections.find(e=>e.id===$)?.title})]}):(0,t.jsx)("span",{className:"text-fg",children:M.title})}),$?(0,t.jsx)(i,{section:M.sections.find(e=>e.id===$),folding:{isFolded:(e,t)=>N(f,e,t),toggle:(e,t)=>k(f,e,t)},activeArticle:c}):(0,t.jsx)(d,{category:M,setSelectedSection:e=>{let t=[...g];t[f]=e,b(t)}})]})]})}e.s(["SidebarClient",0,m])},74323,e=>{"use strict";var t=e.i(43476),l=e.i(3303),s=e.i(71645),a=e.i(54513);function n(){let[e,n]=(0,s.useState)(!1);(0,s.useEffect)(()=>{n(!0)},[]);let o=`
    (async () => {
        function loadExternalScript(url) {
            return new Promise((resolve, reject) => {
                try {
                    const elem = document.createElement("script");
                    elem.src = url;
                    elem.type = "text/javascript";
                    elem.async = false;

                    elem.addEventListener("load", () => {
                        // successfully loaded external script
                        resolve({ status: true });
                    });
                    elem.addEventListener("error", () => {
                        // failed to load external script
                        reject({
                            status: false,
                            message: "loading script [" + url + "] failed"
                        })
                    });

                    document.body.appendChild(elem);
                } catch(error) {
                    reject(error);
                }
            });
        }
        await loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js");
        await loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js");
        ${a.reloadHighlightJsScript}
    })();
    `;return e?(0,t.jsx)(l.default,{children:o}):(0,t.jsx)(t.Fragment,{})}e.s(["default",0,n])},48515,e=>{"use strict";var t=e.i(43476),l=e.i(3303),s=e.i(71645);function a(){let[e,a]=(0,s.useState)(!1);(0,s.useEffect)(()=>{a(!0)},[]);let n=`
window.MathJax = {
  tex: {
    inlineMath: [ ['$','$'], ["\\\\(","\\\\)"] ],
    displayMath: [ ['$$','$$'], ["\\\\[","\\\\]"] ],
    processEscapes: false,
    autoload: {
      color: [],
      colorv2: ['color']
    },
    packages: {'[+]': ['noerrors']}
  },
  options: {
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  },
  loader: {
    load: ['[tex]/noerrors']
  }
};
(function () {
  console.log("load MathJax")
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
  script.async = true;
  document.head.appendChild(script);
})();
    `;return e?(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(l.default,{async:!0,children:n})}):(0,t.jsx)(t.Fragment,{})}e.s(["default",0,a])}]);