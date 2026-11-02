import { lstatSync, readFileSync } from "fs"
import path from "path"

export function readConfig(filePath: string) {
    const stat = lstatSync(filePath)
    const directory = stat.isDirectory() ? filePath : path.dirname(filePath)
    const configPath = filePath.endsWith(".json")
        ? filePath
        : path.join(directory, "config.json")
    const jsonRaw = readFileSync(configPath, { encoding: "utf-8" })
    const jsonData = JSON.parse(jsonRaw)
    return jsonData
}
