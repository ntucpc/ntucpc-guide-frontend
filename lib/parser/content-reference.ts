import { visit } from 'unist-util-visit'
import { getAttribute, parseDirectiveLabel, pushAttribute, removeDirectiveLabel, setAttribute } from '@/ntucpc-website-common-lib/mdx-parser/util';
import getEnvironmentVariable from '@/lib/environment';
import path from 'path';
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';
import { existsSync } from 'fs';
import { getTopic } from '../topics';
import { getArticle } from '../articles';

export function remarkContentReference() {
    return function(tree: any) {
        visit(tree, function (node) {
            if (node.type != "mdxJsxFlowElement" && node.type != "mdxJsxTextElement") return;
            if (node.name != "reference") return;
            const type: string = getAttribute(node, "type")!;
            if (type != "content") return;
            const id: string = getAttribute(node, "id")!;
            const mode = getAttribute(node, "mode") ?? "default";
            const topic = id.split("/")[0];
            const topicTitle = getTopic(topic)?.title ?? topic;
            const articleTitle = getArticle(id)!.title
            setAttribute(node, {
                type: type,
                code: id,
                mode: mode,
                topicTitle: topicTitle,
                articleTitle: articleTitle
            });
            node.name = "ContentReference";
        });
    }
}