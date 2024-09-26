/* Return the environment variable, throwing error if not exists */
function getEnvironmentVariable(name: string, defaultValue: string | undefined = undefined): string {
    const value = process.env[name];
    // console.log(process.env)
    if(!value && !defaultValue) {
        throw new Error(`Missing required environment variable "${name}"`);
    }
    if (!value) return defaultValue!;
    return value;
}

export function getGuideRoot(): string {
    return getEnvironmentVariable("GUIDE_RELATIVE_PATH");
}

export function getPublicRoot(): string {
    return getEnvironmentVariable("PUBLIC_ROOT", getGuideRoot().replace(new RegExp("^public/"), ""));
}