import { get, set } from 'lodash-es'

// #region clear path
export function check_clear_path<Form extends Record<string, any> = {}>(p: {
    ctrl: NOUItype.Form<Form>
    path: ReturnType<NOUItype.Form<Form>['path']>
}) {
    const { ctrl, path } = p
    const next_res = new Map(ctrl.check_res$.value)
    next_res.delete(path)
    ctrl.check_res$.next(next_res)
    return p.ctrl
}

// #region path
export function check_path<Form extends Record<string, any> = {}>(p: {
    ctrl: NOUItype.Form<Form>
    path: ReturnType<NOUItype.Form<Form>['path']>
    /**
     * - false only return result
     * - true (default) update aniema.result
     */
    report?: boolean
    /**
     * default false. return []
     */
    checkDisabled?: boolean
    /**
     * default true. if all well return []
     */
    onlyReturnErrs?: boolean
}): NOUItype.field_check_re[] {
    const { ctrl, path } = p
    const report = p.report ?? true
    const checkDisabled = p.checkDisabled ?? false
    const onlyReturnErrs = p.onlyReturnErrs ?? true
    const re: NOUItype.field_check_re[] = []
    // disable
    const disabled = ctrl.disables$.value.get(path)
    if (disabled && !checkDisabled) {
        return []
    }
    // check require
    const m_requires = ctrl.requires$.value
    if (m_requires.has(path)) {
        const required_msg = m_requires.get(path)!
        const val = get(ctrl.value$.value, path)
        if (
            val === undefined ||
            val === null ||
            (typeof val === 'string' && val.trim() === '') ||
            (Array.isArray(val) && val.length === 0) ||
            (Array.isArray(val) && val.every((v: any) => v === null))
        ) {
            re.push({
                err: required_msg,
                well: false,
                type: 'require',
            })
        }
    }
    // check rules
    const ru = ctrl.rules.get(path)
    if (ru) {
        const field_re = ru(get(ctrl.value$.value, path), ctrl.value$.value)
        if ((onlyReturnErrs && !field_re.well) || !onlyReturnErrs) {
            re.push(field_re)
        }
    }
    // report
    if (report) {
        const next_res = new Map(ctrl.check_res$.value)
        next_res.set(path, re)
        ctrl.check_res$.next(next_res)
    }

    return re
}

// #region paths
export function check_paths<Form extends Record<string, any> = {}>(p: {
    ctrl: NOUItype.Form<Form>
    paths: ReturnType<NOUItype.Form<Form>['path']>[]
    /**
     * - false only return result
     * - true update aniema.result
     * default true */
    report?: boolean
    /**
     * default false. return []
     */
    checkDisabled?: boolean
    /**
     * default true. if all well return []
     */
    onlyReturnErrs?: boolean
}) {
    const re = new Map<string, NOUItype.field_check_re[]>()
    p.paths.forEach((path) => {
        const field_re = check_path({
            ctrl: p.ctrl,
            path,
            report: p.report,
            checkDisabled: p.checkDisabled,
            onlyReturnErrs: p.onlyReturnErrs,
        })
        re.set(path, field_re)
    })
    return re
}
// #region all
export function check_all<Form extends Record<string, any> = {}>(p: {
    ctrl: NOUItype.Form<Form>
    /**
     * - false only return result
     * - true update aniema.result
     * default true */
    report?: boolean
    /**
     * default false. return []
     */
    checkDisabled?: boolean
    /**
     * default true. if all well return []
     */
    onlyReturnErrs?: boolean
}) {
    const re = new Map<string, NOUItype.field_check_re[]>()
    // requires
    const requires_map = p.ctrl.requires$.value
    const req_keys = Array.from(requires_map.keys())
    req_keys.forEach((path) => {
        const field_re = check_path({
            ctrl: p.ctrl,
            path: path as any,
            report: p.report,
            checkDisabled: p.checkDisabled,
            onlyReturnErrs: p.onlyReturnErrs,
        })
        re.set(path, field_re)
    })
    // rules
    // because check require once more, so require × && rule √ => ×
    const rules_map = p.ctrl.rules
    // console.log('rules_map', rules_map)

    const rule_keys = Array.from(rules_map.keys())
    rule_keys.forEach((path) => {
        const field_re = check_path({
            ctrl: p.ctrl,
            path: path as any,
            report: p.report,
            checkDisabled: p.checkDisabled,
            onlyReturnErrs: p.onlyReturnErrs,
        })
        re.set(path, field_re)
    })
    return re
}
// #region has err
export function check_report_has_err<Form extends Record<string, any> = {}>(p: {
    //
    ctrl: NOUItype.Form<Form>
    /**
     * only check inputed paths
     * - if [] undefined, check all
     */
    paths?: ReturnType<NOUItype.Form<Form>['path']>[]
}) {
    const { ctrl, paths } = p
    const check_res = ctrl.check_res$.value
    if (paths === undefined || paths.length === 0) {
        return Array.from(check_res.values()).some((v) => v.some((it) => !it.well))
    }
    return paths.some((path) => check_res.get(path)?.some((v) => !v.well))
}
