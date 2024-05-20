import { BehaviorSubject, map, Observable, of, Subject, switchMap, take, tap } from 'rxjs'
import { btn_anemia } from './type'

interface MakeP {
    txt$: Observable<string>
    onClick: (e?: Event) => void
}

function _make(): btn_anemia {
    const r = {
        able$: new BehaviorSubject(true),
        loading$: new BehaviorSubject(false),
        txt$: new BehaviorSubject(''),
        ob$: new Observable(),
        _on_click: () => new Observable(),
    } as btn_anemia
    r.ob$ = r.able$.pipe(
        switchMap((able) => r.loading$.pipe(map((loading) => ({ able, loading })))),
        switchMap((o) => r.txt$.pipe(map((txt) => ({ ...o, txt })))),
    )
    return r
}
export function make(p: MakeP): NOUItype.btn {
    const btn_a = _make()
    p.txt$.subscribe(btn_a.txt$)

    btn_a._on_click = () => {
        p.onClick()
        return of(null)
    }

    const btnf: NOUItype.btn = {
        ...btn_a,
        init() {
            btn_a.able$.next(true)
            btn_a.loading$.next(false)
        },
        loading(b?: boolean) {
            btn_a.loading$.next(b ?? true)
        },
        able(b?: boolean) {
            btn_a.able$.next(b ?? true)
        },
        click() {
            return _click(btn_a)
        },
    }
    return btnf
}

function _click(btn: btn_anemia) {
    const able = btn.able$.value
    const loading = btn.loading$.value
    if (able && !loading) {
        return btn._on_click()
    }
    return of(null)
}
