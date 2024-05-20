import { Windows } from '@/windows'
import { app } from 'electron'
import { Ipc } from './ipc'
import { Util } from './util'

function init() {
    app.whenReady().then(() => {
        Util.paths.preset()
        Windows.make()
        Ipc()
        // Util2.pull_souhu.pull$().subscribe()
    })
    app.on('window-all-closed', () => {
        app.quit()
    })
}

init()
