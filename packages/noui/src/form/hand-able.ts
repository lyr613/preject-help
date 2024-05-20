// #region set
export function able_set<Form extends Record<string, any> = {}>(p: {
    ctrl: NOUItype.Form<Form>
    path: ReturnType<NOUItype.Form<Form>['path']>
    /**
     * default true
     */
    able?: boolean
}) {
    const { ctrl, path } = p
    const able = p.able ?? true
    const disabled_map = new Map(ctrl.disables$.value)
    if (able) {
        disabled_map.delete(path)
    } else {
        disabled_map.set(path, true)
    }

    ctrl.disables$.next(disabled_map)
    return ctrl
}

// #region set batch
export function able_set_batch<Form extends Record<string, any> = {}>(p: {
    ctrl: NOUItype.Form<Form>
    paths: ReturnType<NOUItype.Form<Form>['path']>[]
    /**
     * default true
     */
    able?: boolean
}) {
    const { ctrl, paths } = p
    const able = p.able ?? true

    const disabled_map = new Map(ctrl.disables$.value)
    paths.forEach((path) => {
        if (able) {
            disabled_map.delete(path)
        } else {
            disabled_map.set(path, true)
        }
    })
    ctrl.disables$.next(disabled_map)
    return ctrl
}
