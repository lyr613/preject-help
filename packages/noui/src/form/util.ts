export function path_to_form_path<T extends string>(path: T): T {
    const arr = path.split('.')
    const arr2 = arr.map((v) => {
        if (Number(v).toString() === v) {
            return '0'
        }
        return v
    })
    return arr2.join('.') as any
}
