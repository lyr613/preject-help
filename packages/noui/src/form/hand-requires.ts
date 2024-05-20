// #region set
export function require_set<Form extends Record<string, any> = {}>(p: {
    //
    ctrl: NOUItype.Form<Form>
    path: ReturnType<NOUItype.Form<Form>['path']>
    msg: string | undefined
}) {
    const { ctrl, path, msg } = p
    const next = new Map(ctrl.requires$.value)
    if (msg === undefined) {
        next.delete(path)
    } else {
        next.set(path, msg)
    }
    ctrl.requires$.next(next)
    return ctrl
}

// #region set batch
export function require_set_batch<Form extends Record<string, any> = {}>(p: {
    //
    ctrl: NOUItype.Form<any>
    paths: ReturnType<NOUItype.Form<Form>['path']>[]
    msg: string | undefined
}) {
    const { ctrl, paths, msg } = p
    const next = new Map(ctrl.requires$.value)
    paths.forEach((path) => {
        if (msg === undefined) {
            next.delete(path)
        } else {
            next.set(path, msg)
        }
    })
    ctrl.requires$.next(next)
    return ctrl
}
