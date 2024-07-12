import path from 'path';

import { Dirent, existsSync, readdirSync, readFileSync } from 'fs';
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';
import { getGuideRoot } from './environment';

const CONTRIBUTORS_PATH = path.join(getGuideRoot(), "contributors");

export type Contributor = {
    name: string,
    handle: string,
    experience: string[],
    code: string
}

export type SpecialThanksGroup = {
    text: string
    members: [string, string][]
}

const contributors: Contributor[] = (() => {
    const config = readConfig(path.join(CONTRIBUTORS_PATH, "contributors.json"));
    const contributors: Contributor[] = [];
    for (const contributor of config["contributors"]) {
        const contributorConfig = readConfig(path.join(CONTRIBUTORS_PATH, `${contributor}.json`));
        contributors.push({
            name: contributorConfig["name"],
            handle: contributorConfig["handle"],
            experience: contributorConfig["experience"],
            code: contributor
        });
    }
    return contributors;
})();

const specialThanks: SpecialThanksGroup[] = (() =>{
    const config = readConfig(path.join(CONTRIBUTORS_PATH, "special_thanks.json"))
    const groups = config["special_thanks"]
    return groups
})()

export function getContributors() {
    return contributors;
}

export function getSpecialThanks() {
    return specialThanks
}