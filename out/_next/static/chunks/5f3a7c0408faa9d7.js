(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,93136,__turbopack_context__=>{"use strict";let reloadHighlightJsScript=`
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
    `)}__turbopack_context__.s(["reloadHighlightJs",()=>reloadHighlightJs,"reloadHighlightJsScript",0,reloadHighlightJsScript,"reloadMathJax",()=>reloadMathJax])},18566,(e,t,s)=>{t.exports=e.r(76562)},9255,e=>{"use strict";var t=e.i(93136),s=e.i(18566),l=e.i(71645);function i(){let e=(0,s.usePathname)();return(0,l.useEffect)(()=>{let e=requestAnimationFrame(()=>{(0,t.reloadMathJax)(),(0,t.reloadHighlightJs)()});return()=>cancelAnimationFrame(e)},[e]),null}e.s(["PageReloader",()=>i])},36519,e=>{"use strict";var t=e.i(43476),s=e.i(71645),l=e.i(22016),i=e.i(18566),a=e.i(11488),r=e.i(68757);function n({children:e}){return(0,t.jsx)("div",{className:`flex-grow overflow-y-auto mt-2 pr-2
                        scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin 
                        scrollbar-thumb-zinc-200 scrollbar-track-transparent`,children:e})}function o({group:e,folded:s,toggleFold:i,activeArticle:n}){return(0,t.jsxs)("div",{className:"mb-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 py-1.5 px-2 text-sm font-bold text-gray-700 select-none cursor-pointer hover:bg-gray-100 rounded-md transition-colors",onClick:i,children:[(0,t.jsx)(a.FontAwesomeIcon,{icon:r.faAngleRight,className:`text-[10px] text-gray-400 transition-transform duration-200 ${s?"":"rotate-90"}`}),(0,t.jsx)("div",{className:"truncate",children:e.title})]}),(0,t.jsx)("ul",{className:`pl-4 space-y-0.5 mt-0.5 border-l border-gray-100 ml-3.5 ${s?"hidden":"block"}`,children:e.items.map(e=>{let s=n===e.id;return(0,t.jsx)("li",{className:"select-none",children:e.coming?(0,t.jsxs)("div",{className:"flex justify-between items-center py-1.5 px-3 text-sm text-gray-300",children:[(0,t.jsx)("span",{children:e.title}),(0,t.jsx)("span",{className:"text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full",children:"待續"})]}):(0,t.jsx)(l.default,{href:e.url,className:`block py-1.5 px-3 text-sm rounded-md transition-all duration-200 ${s?"text-indigo-600 bg-indigo-50 font-medium border-l-2 border-indigo-600 -ml-[1px]":"text-gray-500 hover:text-indigo-500 hover:bg-gray-50"}`,children:e.title})},e.id)})})]})}function c({section:e,folding:s,activeArticle:l}){return(0,t.jsx)("div",{className:"flex flex-col h-full",children:(0,t.jsx)(n,{children:e.groups.map(i=>(0,t.jsx)(o,{group:i,folded:s.isFolded(e.id,i.id),toggleFold:()=>s.toggle(e.id,i.id),activeArticle:l},i.id))})})}function d({category:e,setSelectedSection:s}){return(0,t.jsx)(n,{children:(0,t.jsx)("div",{className:"space-y-1",children:e.sections.map(e=>(0,t.jsx)("div",{className:"px-3 py-2 text-sm text-gray-600 font-medium rounded-md hover:bg-gray-50 hover:text-indigo-600 cursor-pointer transition-colors",onClick:()=>s(e.id),children:e.title},e.id))})})}let x=0,h=1;function m(e){let l=(0,i.useParams)(),n=l?.topic,[o,m]=(0,s.useState)(n+"/"+l?.article),g=e.chapterMapping[o],[u,f]=(0,s.useState)(x),[p,j]=(0,s.useState)([g,n]),[b,y]=(0,s.useState)(!1),[v,w]=(0,s.useState)([new Map,new Map]),N=(e,t,s)=>v[e].has(t)&&v[e].get(t).has(s)?!b:b,k=(e,t,s)=>{let l=new Set(v[e].get(t)||[]);l.has(s)?l.delete(s):l.add(s);let i=[...v];i[e].set(t,l),w(i)},C=e=>{w([new Map,new Map]),y(e)};(0,s.useEffect)(()=>{let t=l?.topic,s=t+"/"+l?.article,i=[e.chapterMapping[s],t];m(s),j(i)},[l,e.chapterMapping]);let[S,A]=(0,s.useState)("default");(0,s.useEffect)(()=>{A("default")},[l]);let E=e.categories[u],F=p[u];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:`fixed bg-white shadow-sm w-full z-[999] select-none cursor-pointer border-b 
                ${!0===S?"hidden":!1===S?"block":"xl:hidden"}`,onClick:()=>A(!0),children:(0,t.jsx)("div",{className:"flex justify-center w-full",children:(0,t.jsxs)("div",{className:"xl:flex items-start gap-10 w-full max-w-[100rem]",children:[(0,t.jsx)("div",{className:"flex-grow",children:(0,t.jsxs)("div",{className:"w-full max-w-4xl px-4 py-3 text-indigo-600 font-bold text-sm flex items-center gap-2",children:[(0,t.jsx)(a.FontAwesomeIcon,{icon:r.faAngleDoubleRight})," ","展開目錄"]})}),(0,t.jsx)("div",{className:"hidden xl:block w-80 shrink-0"})]})})}),(0,t.jsxs)("aside",{className:`fixed bg-white xl:sticky top-16 w-full sm:max-w-[20rem] xl:max-w-none xl:w-80 shrink-0 z-[999] 
                ${!0===S?"block":!1===S?"hidden":"hidden xl:block"} 
                h-[calc(100vh-64px)] flex flex-col border-r border-gray-100 p-4`,children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,t.jsx)("div",{className:"flex bg-gray-100 p-1 rounded-lg w-fit",children:[{id:x,label:"章節"},{id:h,label:"主題"}].map(e=>(0,t.jsx)("button",{onClick:()=>f(e.id),className:`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${u===e.id?"bg-white text-indigo-600 shadow-sm":"text-gray-500 hover:text-gray-700"}`,children:e.label},e.id))}),(0,t.jsxs)("div",{className:"flex items-center gap-3 text-gray-400",children:[(0,t.jsx)("button",{onClick:()=>C(!1),title:"全部展開",className:"hover:text-indigo-500 transition-colors",children:(0,t.jsx)(a.FontAwesomeIcon,{icon:r.faUpRightAndDownLeftFromCenter,className:"text-sm"})}),(0,t.jsx)("button",{onClick:()=>C(!0),title:"全部收合",className:"hover:text-indigo-500 transition-colors",children:(0,t.jsx)(a.FontAwesomeIcon,{icon:r.faDownLeftAndUpRightToCenter,className:"text-sm"})}),(0,t.jsx)("button",{onClick:()=>A(!1),title:"隱藏",className:"hover:text-rose-500 transition-colors",children:(0,t.jsx)(a.FontAwesomeIcon,{icon:r.faXmark,className:"text-base"})})]})]}),(0,t.jsx)("div",{className:"flex items-center gap-2 text-xs font-bold text-gray-400 mb-2 px-1",children:F?(0,t.jsxs)("div",{className:"flex items-center gap-1 cursor-pointer hover:text-indigo-600 transition-colors",onClick:()=>{let e=[...p];e[u]=null,j(e)},children:[(0,t.jsx)("span",{children:E.title}),(0,t.jsx)(a.FontAwesomeIcon,{icon:r.faAngleRight,className:"text-[8px]"}),(0,t.jsx)("span",{className:"text-gray-800",children:E.sections.find(e=>e.id===F)?.title})]}):(0,t.jsx)("span",{className:"text-gray-800",children:E.title})}),F?(0,t.jsx)(c,{section:E.sections.find(e=>e.id===F),folding:{isFolded:(e,t)=>N(u,e,t),toggle:(e,t)=>k(u,e,t)},activeArticle:o}):(0,t.jsx)(d,{category:E,setSelectedSection:e=>{let t=[...p];t[u]=e,j(t)}})]})]})}e.s(["SidebarClient",()=>m])},15269,e=>{"use strict";var t=e.i(43476),s=e.i(3303),l=e.i(71645),i=e.i(93136);function a(){let[e,a]=(0,l.useState)(!1);(0,l.useEffect)(()=>{a(!0)},[]);let r=`
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
        ${i.reloadHighlightJsScript}
    })();
    `;return e?(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(s.default,{children:r})}):(0,t.jsx)(t.Fragment,{})}e.s(["default",()=>a])},45006,e=>{"use strict";var t=e.i(43476),s=e.i(3303),l=e.i(71645);function i(){let[e,i]=(0,l.useState)(!1);(0,l.useEffect)(()=>{i(!0)},[]);let a=`
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
    `;return e?(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(s.default,{async:!0,children:a})}):(0,t.jsx)(t.Fragment,{})}e.s(["default",()=>i])}]);