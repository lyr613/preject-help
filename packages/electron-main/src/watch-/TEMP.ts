import { ipcMain } from 'electron'
import { UtilReply } from 'util-/reply'

class _t {
    watch() {
        console.log('watch')

        ipcMain.on('port', (e, msg) => {
            // console.log('eeeeeeeee')

            // console.log(e, msg)
            this.test_ipc(e, msg)
        })
    }
    test_ipc(e: Electron.IpcMainEvent, msg: string) {
        console.log(msg)

        const re = UtilReply.msg(msg)
        UtilReply.reply(e, 'test_ipc', re)
    }
}

export const WatchTEMP = new _t()
