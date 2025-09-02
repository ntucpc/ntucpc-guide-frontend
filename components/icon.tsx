import { Door, Sprout, Stairs } from "@/icons"

type IconProps = {
    Component: React.FC<React.SVGProps<SVGSVGElement>>
    className?: string
}

function CustomIcon({ Component, className = "" }: IconProps) {
    return <Component className={`${className}`} />
}

function getCustomIcon(iconName: string): React.FC<React.SVGProps<SVGSVGElement>> | undefined {
    const mapping: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
        "door": Door,
        "sprout": Sprout,
        "stairs": Stairs,
        "nothing": () => <></>,
    }
    return mapping[iconName]
}

type IconWrapperProps = {
    iconName: string
    className?: string
}
export function IconWrapper({ iconName, className = "" }: IconWrapperProps) {
    const icon = getCustomIcon(iconName)
    if (icon) return <CustomIcon Component={icon} className={className}></CustomIcon>
    throw Error(`Icon ${iconName} not found`)
}

