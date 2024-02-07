/* Includes MathJax 2 JS */

import Head from "next/head";
import { useState, useEffect } from 'react'

export default function MathJaxJS() {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const mathJaxConfig = "";
    // I am not sure why empty config works?
    // maybe because this config below, from the official MathJax2 (https://docs.mathjax.org/en/v2.7-latest/configuration.html) 
    // has something not wanted. Anyways.
    `
    MathJax.Hub.Config({
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
            inlineMath: [ ['$','$'], ["\\(","\\)"] ],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
        processEscapes: true
    },
    "HTML-CSS": {fonts: ["TeX"] }
    });
    `;

    return <Head>
        {isClient ?
            <>
                <script type="text/x-mathjax-config">{mathJaxConfig}</script>
                <script async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS_HTML"></script>
            </>
            : <></>
        }
    </Head>
};
