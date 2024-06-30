import path from 'path';

import getEnvironmentVariable from 'lib/environment';
import { Dirent, existsSync, readdirSync, readFileSync } from 'fs';
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';

const ARTICLE_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "content");
const CHAPTER_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "chapters");

export type Topic = {
    code: string;
    title: string;
    contents: string[];
};

const topics: Topic[] = (() => {
    const config = readConfig(path.join(ARTICLE_PATH, "topics.json"));
    const topics: Topic[] = [];
    for (const topic of config["topics"]) {
        const topicConfigPath = path.join(ARTICLE_PATH, topic, "config.json");
        if (!existsSync(topicConfigPath)) {
            console.log(`Warning: invalid topic ${topic}`);
            continue;
        }
        const topicConfig = readConfig(topicConfigPath);
        topics.push({
            code: topic,
            ...topicConfig
        })
    }
    return topics;
})();

export function getTopics() {
    return topics;
}

export function getTopic(code: string) {
    for (const topic of topics) {
        if (topic.code === code) return topic;
    }
    return undefined;
}