import { GoogleAnalytics } from "@next/third-parties/google"

type GATagProps = {
    gaId: string
}
export function GATag({ gaId }: GATagProps) {
    if (!gaId) return <></>
    return <GoogleAnalytics gaId={gaId} />
}
