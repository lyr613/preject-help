import { BASE } from '@prolp/base/src'

type s = ''
type l = 'groups'

function make<T extends string | Record<string, any>>(p: {
    key: s | l
    catch_type: 'session' | 'local'
    /** raw 是 string, 处理成需要的数据 */
    cook: (raw: any) => T
    /** 不设置时
     * - {} 默认用 JSON.stringify
     * - string 直接存 */
    uncook?: (some: T) => string
}) {
    const { catch_type, key, uncook } = p
    const catcher = catch_type === 'session' ? sessionStorage : localStorage
    const r = {
        cook: p.cook,
        load() {
            const raw = catcher.getItem(key)
            return p.cook(raw)
        },
        save(some: T) {
            if (uncook) {
                catcher.setItem(key, uncook(some))
                return
            }
            if (typeof some === 'object') {
                catcher.setItem(key, JSON.stringify(some))
            } else {
                catcher.setItem(key, some as any)
            }
        },
        modify(part: Partial<T>) {
            if (typeof part === 'string') {
                r.save(part)
                return
            }
            const old = r.load()
            const ne = Object.assign({}, old, part)

            r.save(ne)
        },
        init() {
            const next = p.cook('')
            r.save(next)
        },
    }
    return r
}
function make_li<T extends string | Record<string, any>>(p: {
    key: s | l
    catch_type: 'session' | 'local'
    /** 列表已经 JSON.parse, 处理成需要的数据 */
    cook: (raw: any) => T
    /**
     * - 不设置时 [] 整体直接默认用 JSON.stringify
     * - 设置时对每一项进行处理
     **/
    uncook?: (some: T) => any
}) {
    const { catch_type, key, uncook } = p
    const catcher = catch_type === 'session' ? sessionStorage : localStorage
    const r = {
        cook: p.cook,
        load(): T[] {
            const raw = catcher.getItem(key) || '[]'
            let li: any[] = []
            try {
                li = JSON.parse(raw).map(p.cook)
            } catch (error) {}
            return li
        },
        save(some: T[]) {
            if (uncook) {
                some = some.map(uncook)
            }
            catcher.setItem(key, JSON.stringify(some))
        },
        /** 移除返回true的元素 */
        del(finder: (target: T) => boolean) {
            const li = r.load()
            const ne = li.filter((one) => !finder(one))
            r.save(ne)
        },
        add(some: T, position: 'head' | 'tail' = 'tail') {
            const li = r.load()
            if (position === 'tail') {
                li.push(some)
            } else {
                li.unshift(some)
            }
            r.save(li)
        },
        modify(finder: (target: T) => boolean, part: Partial<T>) {
            const li = r.load()
            const ne = li.map((one) => {
                if (finder(one)) {
                    return Object.assign({}, one, part)
                }
                return one
            })
            r.save(ne)
        },
        add_or_modify(finder: (target: T) => boolean, part: Partial<T>, position: 'head' | 'tail' = 'tail') {
            const li = r.load()
            const maybe = li.find(finder)
            if (maybe) {
                r.modify(finder, part)
                return
            } else {
                r.add(Object.assign({}, p.cook(''), part), position)
            }
        },
    }
    return r
}

export const groups = make_li<string>({
    catch_type: 'local',
    key: 'groups',
    cook(raw) {
        return raw
    },
})
