import { HyperRefBlank, Paragraph } from "@/ntucpc-website-common-lib/components/basic";

export function PageFooter() {
    return <div className="w-full max-w-4xl mx-auto px-3 mt-20 text-sm text-neutral-500">
        <Paragraph>
            國立臺灣大學程式解題社<br/>
            National Taiwan University<br/>
            Competitive Porgramming Club<br/>
        </Paragraph>
        <Paragraph>
            This work is licensed under <HyperRefBlank href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</HyperRefBlank>
        </Paragraph>
    </div>;
}
