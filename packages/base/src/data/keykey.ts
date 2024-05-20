/**
 * key
 * , k,vkey
 * ```
 * const obj = {
 *   age: 23
 *   name: 'qq'
 * }
 * const ks = key_key(obj)
 * {
 *   age: 'age',
 *   name: 'name',
 * }
 * ks. //  age, name , tsdoc
 * ```
 *
 */
export function key_key<T extends Record<string, any>>(obj: () => T): keyOfT<T>
export function key_key<T extends Record<string, any>>(obj: T): keyOfT<T>
export function key_key<T extends Record<string, any>>(obj: T | (() => T)) {
    if (typeof obj === 'function') {
        obj = (obj as any)() as T
    }
    const o: any = {}
    const ks = Object.keys(obj as Record<string, any>)
    ks.forEach((k) => {
        o[k] = k
    })
    return o as keyOfT<T>
}

type keyOfT<T extends Record<string, any>> = {
    [k in keyof T]-?: k
}
