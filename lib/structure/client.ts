import { Article, Chapter, StructureData, Topic, TopicGroup } from "./type";

export class Structure {

    constructor(private articles: Article[],
        private topics: Topic[],
        private chapters: Chapter[]) { }


    public getExistArticle(code: string): Article {
        const article = this.getArticle(code)
        if (!article) throw Error(`Article ${code} doesn't exist`)
        return article
    }

    public getArticle(code: string | undefined): Article | undefined {
        if (!code) return undefined
        const article = this.articles.find((article) => article.code === code)
        return article
    }

    public getTopic(code: string | undefined): Topic | undefined {
        if (!code) return undefined
        return this.topics.find((topic) => topic.code === code)
    }

    public getChapter(code: string | undefined): Chapter | undefined {
        if (!code) return undefined
        return this.chapters.find((chapter) => chapter.code === code)
    }

    public getArticleChapter(code: string): string | undefined {
        return this.chapters.find((chapter) => chapter.contents.includes(code))?.code
    }

    public getTopicTitle(code: string): string {
        return this.getTopic(code)?.title ?? code
    }

    public getArticleTopicTitle(code: string): string {
        const article = this.getArticle(code)
        if (!article) return code.split("/")[0]
        return this.getTopicTitle(article.topic)
    }

    public getChapterTitle(code: string | undefined): string {
        return this.getChapter(code)?.title ?? "Chapter ???"
    }

    public getArticleChapterTitle(code: string): string {
        const chapter = this.getArticleChapter(code)
        return this.getChapterTitle(chapter)
    }

    public getArticleTitle(code: string): string {
        const article = this.getArticle(code)
        if (!article) return code.split("/")[1]
        return article.title
    }

    public getArticleTopic(code: string): Topic | undefined {
        const article = this.getArticle(code)
        if (!article) return undefined
        return this.getTopic(article.topic)
    }

}

export function parseStructure(data: StructureData): Structure {
    return new Structure(data.articles, data.topics, data.chapters)
}