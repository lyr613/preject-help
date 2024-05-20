import { Util } from '@/util'
import { BrowserWindow, app } from 'electron'
import path from 'path'
import windowStateKeeper from 'electron-window-state'

export function make() {
    let mainWindowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 800,
    })
    const win = new BrowserWindow({
        width: mainWindowState.width,
        height: mainWindowState.height,
        x: mainWindowState.x,
        y: mainWindowState.y,
        webPreferences: {
            /** 向网页注入一些对象 */
            preload: path.resolve(app.getAppPath(), 'pre-load.js'),
            /** 查看本地图片, 设置成false才可以 */
            webSecurity: false,
            /** 允许打开控制台 */
            devTools: true,
        },
    })
    mainWindowState.manage(win)
    if (Util.env.mode === 'preview') {
        win.loadURL('http://localhost:6013')
    } else {
        win.loadFile('./distpage/index.html')
    }
    return win
}
