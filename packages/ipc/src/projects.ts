export type project = {
    name: string
    fspath: string
    sort: number
    logo: string
    jsworkspace: {
        name: string
        fspath: string
    }[]
    note: string
}
