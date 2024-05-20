import { BASE } from '@prolp/base/src'
import { BehaviorSubject, Observable, Subject, filter, take } from 'rxjs'
import { make as makeid } from './id'
import { IPC } from '@yitouzi/ipc/src'

const elec_resolver$ = new Subject<any>()

/** 传给 preload.js
 * 很奇怪, 传subject不行
 */
const reser$ = {
    next(d: any) {
        // console.log('front  接受到', d)
        elec_resolver$.next(d)
    },
}

preset()

function preset() {
    const fun = window.__server?.preset_push()
    fun?.(reser$)
}

export function query$<
    Q extends IPCtype.Q = {
        search: {
            flag: string
        }
        data: any
    },
>(param: Q['search']): Observable<IPCtype.R<Q['data']>> {
    const query_id = makeid()
    const param2 = {
        ...param,
        __query_id: query_id,
    }
    window.__server?.push(param2)
    return elec_resolver$.pipe(
        filter((r) => {
            if (r.__query_id === query_id) {
                return true
            }
            return false
        }),
    )
}
export function query_once$<
    Q extends IPCtype.Q = {
        search: {
            flag: string
        }
        data: any
    },
>(param: Q['search']): Observable<IPCtype.R<Q['data']>> {
    return query$<Q>(param).pipe(take(1))
}

// query_once$<IPCtype.querys.gupiao_find>({
//     code: '000001',
// }).subscribe((r) => {})
