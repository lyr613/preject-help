// #region set
/** 过滤字符串 */
export function filter_set<Form extends Record<string, any> = {}>(p: {
    ctrl: NOUItype.Form<Form>
    path: ReturnType<NOUItype.Form<Form>['path']>
    cook?(raw: string, f: Form): string
}) {
    const { ctrl, path, cook } = p
    if (cook) {
        ctrl.filters.set(path, cook)
    } else {
        ctrl.filters.delete(path)
    }
    return ctrl
}
