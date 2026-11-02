/* eslint-disable @typescript-eslint/no-explicit-any */
export function Figure(props: any) {
    // Figures are drawn for a white background (some are transparent), so keep it white in dark mode
    return (
        <img
            className="mx-auto my-2 dark:bg-white dark:rounded-md"
            alt={props.src}
            {...props}
        />
    )
}
