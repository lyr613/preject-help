import { BehaviorSubject } from 'rxjs'
import dayjs from 'dayjs'

type StringKey<T extends Record<string, any> | any[]> = T extends any[] ? '0' : keyof T & string

type DeepPath<T extends Record<string, any>, PrePath extends string = ''> = {
    [Key in StringKey<T>]: T[Key] extends
        | string
        | number
        | undefined
        | null
        | boolean
        | dayjs.Dayjs
        | (string | number | undefined | null | boolean | dayjs.Dayjs)[]
        ? `${PrePath}${PrePath extends '' ? '' : '.'}${Key}`
        : T[Key] extends any[]
        ? DeepPath<T[Key][0], `${PrePath}${PrePath extends '' ? '' : '.'}${Key}.0`>
        : T[Key] extends Record<string, any>
        ? DeepPath<T[Key], `${PrePath}${PrePath extends '' ? '' : '.'}${Key}`>
        : never
}
type ValOf<T = Record<string, any>> = T[keyof T]
type EnumOf<T = Record<string, any> | string> = T extends string ? T : T | EnumOf<ValOf<T>>

declare global {
    namespace NOUItype {
        interface Form<Form extends Record<string, any> = {}> {
            requires$: BehaviorSubject<Map<string, string>>
            disables$: BehaviorSubject<Map<string, boolean>>
            value$: BehaviorSubject<Form>
            rules: Map<string, (path_value: any, f: Form) => field_check_re>
            check_res$: BehaviorSubject<Map<string, field_check_re[]>>
            filters: Map<string, (raw: string, f: Form) => string>
            mk_data: () => Form
            /**
             *
             * @param s
             * @param indexs 从左向右替换路径中的 0, e. 传入 'q.0.w.0.e', [1, 2] => 'q.1.w.2.e', <b>但类型不变, 造成类型与值不一致</b>
             */
            path<S extends EnumOf<DeepPath<Form>> & string>(s: S, indexs?: number[]): S
        }
        interface field_check_re {
            well: boolean
            err: string
            /**
             *
             * - rule ()
             * - require
             * - api
             * - other
             */
            type?: 'rule' | 'require' | 'ipc' | 'other'
        }
    }
}
