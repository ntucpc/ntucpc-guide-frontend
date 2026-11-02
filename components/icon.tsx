import { Door, Earth, Puzzle, Sprout, Stairs } from "@/icons"
import colors from "tailwindcss/colors"

const DEFAULT_ICON_COLOR = "indigo-500"

/**
 * Resolve a Tailwind color name like "blue-400" (from chapter config) to its CSS value.
 * Icon colors come from guide data, so they are applied as inline styles instead of
 * class names, which Tailwind could not detect.
 */
export function getIconColor(iconColor: string): string {
    const resolve = (name: string): string | undefined => {
        const match = name.match(/^([a-z]+)-(\d{2,3})$/)
        if (!match) return undefined
        const palette = (colors as unknown as Record<string, unknown>)[match[1]]
        if (typeof palette !== "object" || palette === null) return undefined
        const value = (palette as Record<string, unknown>)[match[2]]
        return typeof value === "string" ? value : undefined
    }
    if (iconColor) {
        const value = resolve(iconColor)
        if (value) return value
        console.log(`Warning: invalid icon color ${iconColor}`)
    }
    return resolve(DEFAULT_ICON_COLOR)!
}

type IconProps = {
    Component: React.FC<React.SVGProps<SVGSVGElement>>
    className?: string
}

function CustomIcon({ Component, className = "" }: IconProps) {
    return <Component className={`${className}`} />
}

function getCustomIcon(
    iconName: string
): React.FC<React.SVGProps<SVGSVGElement>> | undefined {
    const mapping: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
        door: Door,
        sprout: Sprout,
        stairs: Stairs,
        puzzle: Puzzle,
        earth: Earth,
        nothing: () => <></>,
    }
    return mapping[iconName]
}

type IconWrapperProps = {
    iconName: string
    className?: string
}
export function IconWrapper({ iconName, className = "" }: IconWrapperProps) {
    const icon = getCustomIcon(iconName)
    if (icon)
        return <CustomIcon Component={icon} className={className}></CustomIcon>
    throw Error(`Icon ${iconName} not found`)
}
