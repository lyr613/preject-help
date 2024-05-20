import { BehaviorSubject } from 'rxjs'

export function make<Form extends Record<string, any> = {}>(mk_data: () => Form): NOUItype.Form<Form> {
    return {
        requires$: new BehaviorSubject(new Map()),
        disables$: new BehaviorSubject(new Map()),
        value$: new BehaviorSubject(mk_data()),
        rules: new Map(),
        check_res$: new BehaviorSubject(new Map()),
        filters: new Map(),
        mk_data,
        path: (s, indexs) => {
            if (!indexs || indexs.length === 0) {
                return s
            }
            const arr = s.split('.')
            let num_i = 0
            const arr2 = arr.map((v) => {
                if (v === '0') {
                    return indexs[num_i++]
                }
                return v
            })
            return arr2.join('.') as any
        },
    }
}
