import { BehaviorSubject } from 'rxjs'
import { UtilNode } from 'util-/nodef'

const paths$ = new BehaviorSubject([] as string[])

const path = UtilNode._path

const filter = (ps: string[]) => {
    const m = new Map<string, number>()
    ps.forEach((p, i) => {
        if (m.get(p) === undefined) {
            m.set(p, i)
        }
    })
    const ps2 = Array.from(m.keys())
    // console.log(ps2.slice(), 'ps2')

    ps2.forEach((p1) => {
        const rest_ps = Array.from(m.keys())
        rest_ps.forEach((p2) => {
            const sl1 = p1.split('/').length
            const sl2 = p2.split('/').length

            if (sl2 > sl1 && p2.slice(0, p1.length) === p1) {
                m.delete(p2)
            }
        })
    })
    const ps3 = Array.from(m.keys())

    return ps3
}
const add = (src: string) => {
    const arr = paths$.value.slice()
    // console.log('add', arr.slice())
    arr.push(src)
    // console.log('add', arr.slice())

    // paths$.next(arr)
    save(arr)
    load()
}
const save = (paths: string[]) => {
    localStorage.setItem('project-paths', JSON.stringify(paths))
}
const load = () => {
    const s = localStorage.getItem('project-paths') || '[]'
    try {
        const arr = JSON.parse(s)
        const a2 = filter(arr)
        paths$.next(a2)
        console.log('loaded', a2.slice())
    } catch (error) {
        paths$.next([])
    }
}
const remove = (i: number) => {
    const paths = paths$.value.slice()
    paths.splice(i, 1)
    save(paths)
    load()
}
const upper = (i: number) => {
    const paths = paths$.value.slice()
    const i2 = (paths.length + i - 1) % paths.length
    ;[paths[i], paths[i2]] = [paths[i2], paths[i]]
    save(paths)
    load()
}
const downer = (i: number) => {
    const paths = paths$.value.slice()
    const i2 = (paths.length + i + 1) % paths.length
    ;[paths[i], paths[i2]] = [paths[i2], paths[i]]
    save(paths)
    load()
}

export const SubjectProjectPath = {
    paths$,
    add,
    load,
    remove,
    upper,
    downer,
}
