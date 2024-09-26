import { getArticles } from "./articles";
import { getChapters } from "./chapters";
import { Structure } from "./client";
import { getTopicGroups, getTopics } from "./topics";
import { Article, Chapter, StructureData, Topic, TopicGroup } from "./type";

export function getStructure(): StructureData {
    return {
        articles: getArticles(),
        topics: getTopics(),
        topicGroups: getTopicGroups(),
        chapters: getChapters()
    }
}
