import { HyperRefBlank } from "@/ntucpc-website-common-lib/components/basic";

type ContentReferenceProps = {
    type: string;
    code: string;
    mode: string; // default | article | full
    topicTitle: string;
    articleTitle: string;
};
export function ContentReference(props: ContentReferenceProps) {
    let displayText;
    switch(props.mode) {
        case "article":
            displayText = props.articleTitle;
            break;
        case "full":
        default:
            displayText = `${props.topicTitle} / ${props.articleTitle}`;
    }
    return <HyperRefBlank href={`/${props.code}`}>{displayText}</HyperRefBlank>
}