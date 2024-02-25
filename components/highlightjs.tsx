/* do syntax highlighting for code blocks. */

import Script from "next/script";
import { useState, useEffect } from "react";

export default function HightlightJsScript() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const script = `
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
        await loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js"),
        hljs.highlightAll();
        hljs.initLineNumbersOnLoad({ singleLine: true });
    })();
    `;

    return isClient ? (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
            />
            <Script>{script}</Script>
        </>
    ) : (
        <></>
    );
}
