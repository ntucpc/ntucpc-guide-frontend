/**
 * @fileoverview Parse actual image path.
 * If node.data.overrideDirectory exists, the path is altered.
 */

import path from 'path';
import { visit } from 'unist-util-visit';

export default function myRemarkFigure(directory: string) {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.name === 'figure') {

                if (node.attributes === undefined)
                    throw new Error(`Error parsing figure: no source`);

                const finalDirectory = (node.data !== undefined && node.data.overrideDirectory) ?
                                    node.data.overrideDirectory : directory;
                
                for (let attr of node.attributes)
                    if (attr.name === 'src')
                        attr.value = path.join(finalDirectory, 'figure', attr.value).replaceAll(/\\/g, '/').replace(/^public/g, '');
            }
        })
    }
}
