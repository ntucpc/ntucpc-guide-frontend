function getValueByName(arr: Array<any>, prop: string): string | null {
    const ele = arr.find((element: any) => element.name === prop);
    return ele === undefined ? null : ele.value;
};


function hasValue(arr: Array<any>, prop: string): boolean {
    const ele = arr.find((element: any) => element.name === prop);
    return ele !== undefined;
};


function pushAttribute(attribute: Array<any>, name: string, value: string) {
    attribute.push({
        type: 'mdxJsxAttribute',
        name: `${name}`,
        value: `${value}`
    })
};

export { getValueByName, hasValue, pushAttribute };