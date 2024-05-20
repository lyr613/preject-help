import { ipcMain } from 'electron'
import * as test from './test'

function flag<
    S extends {
        search: {
            flag: string
        }
    },
>(s: S['search']['flag']): S['search']['flag'] {
    return s
}

export function Ipc() {
    ipcMain.on('data-ipc', (e, o) => {
        switch (o.flag as string) {
            case flag<IPCtype.querys.test>('test'):
                test.test(e, o)
                break

            default:
                break
        }
    })
}
