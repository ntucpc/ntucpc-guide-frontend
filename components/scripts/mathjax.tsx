"use client"
/* Includes MathJax 2 JS */

import Script from "next/script"
import { useState, useEffect } from "react"

export default function MathJaxJS() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    // Temporary workaround
    const mathJaxScript = `
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
    `

    return isClient ? (
        <>
            <Script async>{mathJaxScript}</Script>
        </>
    ) : (
        <></>
    )
}
