import { Rt } from 'router-'
import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'
import { UtilElec } from 'util-/electron'

class _hk {
    event$ = fromEvent<key>(document, 'keyup')
    sub_app_hot_key() {
        return this.event$.subscribe((e) => {
            // 打开控制台
            if (e.altKey && e.ctrlKey) {
                if (e.keyCode === 73) {
                    UtilElec.ipc.send('hotkey_devtool')
                }
            }
            if (e.altKey) {
                e.preventDefault()
                switch (e.keyCode) {
                    case 49:
                        Rt.next('home')
                        break
                    case 50:
                        Rt.next('links')
                        break

                    default:
                        break
                }
                console.log(e.keyCode)

                // alt + ~ 清空所有
            }
        })
    }
}

export const SubHotKey = new _hk()

interface key {
    /**
     * - 13 enter
     * - 32 space
     * - 38 ↑
     * - 40 ↓
     * - 37 ←
     * - 39 →
     * - 82 r
     * - 73 i
     * - 192 ~
     *
     */
    keyCode: number
    altKey: boolean
    ctrlKey: boolean
    shiftKey: boolean
    preventDefault: Function
}
