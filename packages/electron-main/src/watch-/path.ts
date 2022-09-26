import { ConstAppPath } from 'const-/app-path'
import { ipcMain, shell, dialog, app } from 'electron'
import { UtilReply } from 'util-/reply'
import { WindowUtil } from 'window-'
import path from 'path'
import fs from 'fs-extra'
import cd from 'child_process'

/** 获取一些路径 */
export function _watch_path() {
    ipcMain.on('path_pick', path_pick)
    ipcMain.on('path_show', path_show)
    ipcMain.on('path_vsc', path_vsc)
}

/** 通过选择获取目录 */
function path_pick(e: Electron.IpcMainEvent, properties: string[] = ['openDirectory']) {
    dialog
        .showOpenDialog({
            properties: properties as any,
        })
        .then((res) => {
            const msg = UtilReply.msg('')
            if (!res.filePaths.length) {
                UtilReply.reply(e, 'path_pick', msg)
                return ''
            }
            const src = res.filePaths[0]
            msg.b = true
            msg.txt = ''
            msg.data = src
            UtilReply.reply(e, 'path_pick', msg)
        })
}

function path_show(e: Electron.IpcMainEvent, src: string) {
    shell.showItemInFolder(src)
}
function path_vsc(e: Electron.IpcMainEvent, src: string) {
    // shell.showItemInFolder(src)
    try {
        cd.execSync(`open -a "Visual Studio Code"  "."`, {
            cwd: src,
        })
    } catch (error) {
        dialog.showErrorBox('er', String(error))
    }
}
