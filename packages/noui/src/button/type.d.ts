import { BehaviorSubject, map, Observable, of, Subject, switchMap, take, tap } from 'rxjs'

declare global {
    namespace NOUItype {
        interface btn extends btn_anemia {
            /** 回复状态
             * - loading -> false
             * - able -> true
             */
            init(): void
            /**
             * loading时点击无响应
             * @param b 默认true
             */
            loading(b?: boolean): void
            /**
             * 如果 able为true, 但loading, 按钮也是点击无响应的
             * @param b 默认true
             */
            able(b?: boolean): void
            click(): Observable<any>
        }
    }
}

export interface btn_anemia {
    able$: BehaviorSubject<boolean>
    loading$: BehaviorSubject<boolean>
    txt$: BehaviorSubject<string>
    ob$: Observable<{
        txt: string
        able: boolean
        loading: boolean
    }>
    _on_click: (e?: Event) => Observable<any>
}
