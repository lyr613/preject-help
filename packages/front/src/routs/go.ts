import { Subject } from 'rxjs'
import { stringify } from 'qs'

export const goto$ = new Subject<
    | {
          to: string
          replace: boolean
      }
    | {
          deep: number
      }
>()

export function go(target: `/${string}`, param?: Record<string, string>) {
    const p = param ? `?${stringify(param)}` : ''
    const full = target + p
    goto$.next({ to: full, replace: false })
}

/** 不入栈更新地址 */
export function replace(to: `/${string}`, param?: Record<string, string>) {
    const p = param ? `?${stringify(param)}` : ''
    const full = '/#' + to + p
    goto$.next({ to: full, replace: true })
    window.location.replace(full)
}

export function back(deep = -1) {
    goto$.next({
        deep,
    })
}
