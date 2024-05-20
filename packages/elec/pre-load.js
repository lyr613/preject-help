const { contextBridge, on } = require('electron')
const { ipcRenderer } = require('electron/renderer')

let __resolver$ = null

contextBridge.exposeInMainWorld('__server', {
    preset_push() {
        ipcRenderer.on('data-ipc', (e, data) => {
            // console.log('preset.js', Boolean(__resolver$), data)
            if (!__resolver$) {
                return
            }
            __resolver$.next(data)
        })
        return (resolver$) => {
            __resolver$ = resolver$
        }
    },
    push(data) {
        ipcRenderer.send('data-ipc', data)
    },
})
// contextBridge.exposeInMainWorld("path", (...argus) => {
//     return require("path")
// })
