function getValueByName(arr: Array<any>, prop: string): string | null {
    const ele = arr.find((element: any) => element.name === prop);
    return ele === undefined ? null : ele.value;
};


function pushAttribute(attribute: Array<any>, name: string, value: string) {
    attribute.push({
        type: 'mdxJsxAttribute',
        name: `${name}`,
        value: `${value}`
    })
};

export { getValueByName, pushAttribute };