/* Return the envvironment variable, throwing error if not exists */
export default function getEnvironmentVariable(name: string): string {
    const value = process.env[name];
    if(!value) {
        throw new Error(`Missing required environment variable "${name}"`);
    }
    return value;
}