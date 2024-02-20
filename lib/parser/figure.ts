/* Include 'Refcode' referenced local file */
import path from 'path';
import { visit } from 'unist-util-visit';

function myRemarkFigure(directory: string) {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.name === 'figure') {

                if (node.attributes === undefined)
                    throw new Error(`Error parsing figure: no source`);
                
                for (var attr of node.attributes)
                    if (attr.name === 'src')
                        attr.value = path.join(directory, 'figure', attr.value).replaceAll(/\\/g, '/').replace(/^public/g, '');
            }
        })
    }
}

export default myRemarkFigure;