import { produce } from 'immer'
import { get, set } from 'lodash-es'

export function value_merge<Form extends Record<string, any> = {}>(p: {
    //
    ctrl: NOUItype.Form<Form>
    worker: (f: Form) => void
}) {
    const { ctrl, worker } = p
    const old = p.ctrl.value$.value
    const pre_merge = produce(old, worker)

    const filter_paths = Array.from(ctrl.filters.keys())
    const merged = produce(pre_merge, (f: Form) => {
        filter_paths.forEach((path) => {
            const path_arr = path.split('.')
            // no arr
            if (path_arr.every((v) => v !== '0')) {
                const filter_worker = ctrl.filters.get(path)
                if (!filter_worker) return
                set(f, path, filter_worker(get(f, path), f))
                return
            }
            // with arr
            _deep_work_filter(ctrl, f, f, [], path_arr)
        })
    })
    p.ctrl.value$.next(merged)
}

/**
 *
 * @param root
 * @param obj 当前对象(可能是数组, 数字, null等...)
 * @param pre_paths 碰到数组储存number的index, 最后计算时根据类型可以得到 filter worker 的key
 * @param rest_path
 * @returns
 */
function _deep_work_filter(
    ctrl: NOUItype.Form<any>,
    root: any,
    obj: any,
    pre_paths: (string | number)[],
    rest_path: string[],
) {
    if (!rest_path.length) {
        /** 取过滤函数时, 把数字都变成 0即可 */
        const filter_key = pre_paths.map((v) => (typeof v === 'number' ? '0' : v)).join('.')
        const work_path = pre_paths.join('.')

        const filter_worker = ctrl.filters.get(filter_key)
        if (!filter_worker) return
        set(root, work_path, filter_worker(get(root, work_path), root))
        return
    }
    const cur_path = rest_path[0]
    if (cur_path === '0') {
        if (!Array.isArray(obj)) {
            return
        }
        obj.forEach((cdobj, i) => {
            _deep_work_filter(ctrl, root, cdobj, [...pre_paths, i], rest_path.slice(1))
        })
        return
    }
    _deep_work_filter(ctrl, root, obj[cur_path], [...pre_paths, rest_path[0]], rest_path.slice(1))
}

export function value_get<Form extends Record<string, any> = {}, R = any>(p: {
    //
    ctrl: NOUItype.Form<Form>
    getter: (f: Form) => R
}) {
    const { ctrl, getter } = p
    return getter(ctrl.value$.value)
}
