// module / path

import { BASE } from '@prolp/base'

const raw = {
    shard: {
        home: '',
    },
    project: {
        config: '',
    },
} as const

/** 路由路径 */
export const target = compute(raw)
export const l1 = BASE.data.key_key(raw)
export const path = compute_path(raw)

function compute<RAW extends Record<string, string | Record<string, any>>>(raw: RAW) {
    const re = {} as COMPUTE<RAW>
    function copy(target: Record<string, any>, from: Record<string, any>, pre_key: string) {
        const ks = Object.keys(from)
        ks.forEach((k) => {
            const from_v = from[k]
            const next_key = `${pre_key}/${k}`
            if (typeof from_v === 'string') {
                target[k] = next_key
            } else if (typeof from_v === 'object') {
                target[k] = {}
                copy(target[k], from_v, next_key)
            }
        })
    }
    copy(re, raw, '')
    return re
}

type COMPUTE<RAW extends Record<string, string | Record<string, any>>, PREKEY extends string = ''> = {
    [k in keyof RAW]-?: RAW[k] extends Record<string, any>
        ? COMPUTE<RAW[k], `${PREKEY}/${k & string}`>
        : RAW[k] extends string
        ? `${PREKEY}/${k & string}`
        : unknown
}

function compute_path<KV extends Record<string, any>>(kv: KV) {
    type DeepKeys<
        kv extends Record<string, any>,
        rest_keys extends string | never,
        pre_key extends string,
    > = rest_keys extends never
        ? never
        : LastUnion<rest_keys> extends infer last_k extends string
        ? kv[last_k] extends Record<string, any>
            ? DeepKeys<kv[last_k], keyof kv[last_k] & string, pre_key extends '' ? last_k : `${pre_key}/${last_k}`>
            : pre_key extends ''
            ? last_k
            : `/${pre_key}/${last_k}`
        : never

    type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer U) => any ? U : never
    type LastUnion<T> = UnionToIntersection<T extends any ? (x: T) => any : never> extends (x: infer L) => any
        ? L
        : never
    return function <K extends DeepKeys<KV, keyof KV & string, ''>>(s: K) {
        return s
    }
}
