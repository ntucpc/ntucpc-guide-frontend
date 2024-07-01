import path from 'path';

import getEnvironmentVariable from 'lib/environment';
import { Dirent, existsSync, readdirSync, readFileSync } from 'fs';
import { readConfig } from '@/ntucpc-website-common-lib/mdx-parser/mdx-parser';

const CONTRIBUTORS_PATH = path.join(getEnvironmentVariable("GUIDE_RELATIVE_PATH"), "contributors");

export type Contributor = {
    name: string,
    handle: string,
    experience: string[],
    code: string
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

export function getContributors() {
    return contributors;
}