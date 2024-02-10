/* Include 'Refcode' referenced local file */
import path from 'path';
import { visit } from 'unist-util-visit';

function myRemarkFigure(directory: string) {
    return function (tree: any) {
        visit(tree, function (node) {
            if (node.name === 'figure') {

                if (node.attributes === undefined)
                    throw new Error(`Error parsing figure: no source`);

                let finalDirectory = (node.data !== undefined && node.data.overrideDirectory) ?
                                    node.data.overrideDirectory : directory;
                
                for (var attr of node.attributes)
                    if (attr.name === 'src')
                        attr.value = path.join(finalDirectory, 'figure', attr.value);
            }
        })
    }
}

export default myRemarkFigure;