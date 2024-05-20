import { get, set } from 'lodash-es'
import { Observable, distinctUntilChanged, map, switchMap, tap } from 'rxjs'
import { path_to_form_path } from './util'

// #region path
export function sub_path$<
    Form extends Record<string, any> = {},
    Path extends ReturnType<NOUItype.Form<Form>['path']> = any,
>(p: {
    ctrl: NOUItype.Form<Form>
    path: Path
}): Observable<{
    check_res: NOUItype.field_check_re[]
    has_err: boolean
    err0: string
    required: boolean
    value: Form[Path]
    disabled: boolean
}> {
    const { ctrl, path } = p
    const form_path = path_to_form_path(path)
    const field_val$ = ctrl.value$.pipe(
        map((fv) => get(fv, path)),
        distinctUntilChanged(),
    )
    const field_disabled$ = ctrl.disables$.pipe(
        map((mdb) => mdb.get(form_path) || false),
        distinctUntilChanged(),
    )
    const field_required$ = ctrl.requires$.pipe(
        map((mrq) => {
            return mrq.has(form_path)
        }),
        distinctUntilChanged(),
    )
    const field_check_res$ = ctrl.check_res$.pipe(
        map((m) => m.get(path) || []),
        distinctUntilChanged(),
    )
    const ob$ = field_val$.pipe(
        switchMap((val) => field_disabled$.pipe(map((disabled) => ({ value: val, disabled })))),
        switchMap((o) => field_required$.pipe(map((required) => ({ ...o, required })))),
        switchMap((o) =>
            field_check_res$.pipe(
                map((check_res) => ({
                    ...o,
                    //
                    check_res,
                    has_err: Boolean(check_res.filter((v) => !v.well).length),
                    err0: check_res.filter((v) => !v.well)[0]?.err,
                })),
            ),
        ),
    )
    return ob$ as any
}

// #region  value getter
export function sub_value_getter$<Form extends Record<string, any> = {}, R = any>(p: {
    ctrl: NOUItype.Form<Form>
    getter: (f: Form) => R
}) {
    const { ctrl, getter } = p
    const field_val$ = ctrl.value$.pipe(
        map((fv) => getter(fv)),
        distinctUntilChanged(),
    )
    return field_val$
}
