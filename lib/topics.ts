import path from 'path';

import { Dirent, existsSync, readdirSync, readFileSync } from 'fs';
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';
import { getGuideRoot } from './environment';
import { getVirtualArticle, VirtualArticle } from './articles';

const ARTICLE_PATH = path.join(getGuideRoot(), "content");
const CHAPTER_PATH = path.join(getGuideRoot(), "chapters");

export type Topic = {
    code: string;
    title: string;
    contents: string[];
};
export type TopicGroup = {
    single: boolean;
    title: string;
    topics: string[];
};

const [topics, topicGroups] : [Topic[], TopicGroup[]] = (() => {
    const config = readConfig(path.join(ARTICLE_PATH, "topics.json"));
    const topics: Topic[] = [];
    const topicGroups: TopicGroup[] = [];
    for (const entry of config["topics"]) {
        let temp = []
        if (typeof(entry) === "string") {
            temp.push(entry);
            topicGroups.push({
                single: true,
                title: "",
                topics: temp
            });
        }
        else{
            temp = entry["topics"];
            topicGroups.push({
                single: false,
                title: entry["title"],
                topics: temp
            });
        }
        for (const topic of temp) {
            const topicConfigPath = path.join(ARTICLE_PATH, topic, "config.json");
            if (!existsSync(topicConfigPath)) {
                continue;
            }
            const topicConfig = readConfig(topicConfigPath);
            topics.push({
                code: topic,
                ...topicConfig
            })
        }
    }
    return [topics, topicGroups];
})();

export function getTopics() {
    return topics;
}

export function getTopicGroups() {
    return topicGroups;
}

export function getTopic(code: string) {
    for (const topic of topics) {
        if (topic.code === code) return topic;
    }
    return undefined;
}

export type VirtualTopic = {
    code: string
    displayTitle: string
    articles: VirtualArticle[]
}
export type VirtualTopicGroup = {
    single: boolean
    title: string
    topics: VirtualTopic[]
}
export function getFullTopicStructure(): VirtualTopicGroup[] {
    return topicGroups.map((topicGroup) => {
        return {
            single: topicGroup.single,
            title: topicGroup.title,
            topics: topicGroup.topics.map((topicCode) => {
                const topicObj = getTopic(topicCode)
                return { // VirtualTopic
                    code: topicCode,
                    displayTitle: topicObj?.title ?? topicCode,
                    articles: topicObj?.contents.map((articleCode) => {
                        const code = `${topicCode}/${articleCode}`
                        return getVirtualArticle(code)
                    }) ?? []
                }
            })
        }
    })
}