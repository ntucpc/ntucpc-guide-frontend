/* Includes MathJax 2 JS */

import Script from "next/script";
import { useState, useEffect } from "react";

export default function MathJaxJS() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Temporary workaround
    const mathJaxConfig = `
    MathJax.Hub.Config({
        tex2jax: {
            inlineMath: [ ['$','$'], ["\\\\(","\\\\)"] ],
            displayMath: [ ['$$','$$'], ["\\\\[","\\\\]"] ],
            processEscapes: false
        },
    });
    `;

    return isClient ? (
        <>
            <Script type="text/x-mathjax-config">{mathJaxConfig}</Script>
            <Script
                async
                src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS_HTML"
            />
        </>
    ) : (
        <></>
    );
}
