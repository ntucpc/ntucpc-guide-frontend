import path from 'path'

import { Dirent, existsSync, readdirSync, readFileSync } from 'fs'
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser'
import { getGuideRoot } from '../environment'
import { Topic, TopicGroup } from './type'

const ARTICLE_PATH = path.join(getGuideRoot(), "content")
const CHAPTER_PATH = path.join(getGuideRoot(), "chapters")

const [topics, topicGroups]: [Topic[], TopicGroup[]] = (() => {
    const config = readConfig(path.join(ARTICLE_PATH, "topics.json"))
    const topics: Topic[] = []
    const topicGroups: TopicGroup[] = []
    for (const entry of config["topics"]) {
        let temp = []
        if (typeof (entry) === "string") {
            temp.push(entry)
            topicGroups.push({
                single: true,
                title: "",
                topics: temp
            })
        }
        else {
            temp = entry["topics"]
            topicGroups.push({
                single: false,
                title: entry["title"],
                topics: temp
            })
        }
        for (const topic of temp) {
            const topicConfigPath = path.join(ARTICLE_PATH, topic, "config.json")
            if (!existsSync(topicConfigPath)) {
                continue
            }
            const topicConfig = readConfig(topicConfigPath)
            topics.push({
                code: topic,
                title: topicConfig["title"],
                contents: (topicConfig["contents"] as string[]).map((content) => {
                    return `${topic}/${content}`
                }),
                description: topicConfig["description"] ?? "????"
            })
        }
    }
    return [topics, topicGroups]
})()

export function getTopics() {
    return topics
}

export function getTopicGroups() {
    return topicGroups
}

export function getTopic(code: string): Topic {
    for (const topic of topics) {
        if (topic.code === code) return topic
    }
    throw Error(`Topic ${code} doesn't exist`)
}