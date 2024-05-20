import { ipcMain } from 'electron'
import * as test from './test'
import * as project from './project'

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
            case flag<IPCtype.querys.project_finds>('project_finds'):
                project.find(e, o)
                break
            case flag<IPCtype.querys.project_open>('project_open'):
                project.open(e, o)
                break

            default:
                break
        }
    })
}
