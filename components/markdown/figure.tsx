/* eslint-disable @typescript-eslint/no-explicit-any */
export function Figure(props: any) {
    return <img className="mx-auto my-2" alt={props.src} {...props} />
}
