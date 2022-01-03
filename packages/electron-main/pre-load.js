const { contextBridge, ipcRenderer } = require('electron')
const cd = require('child_process')

contextBridge.exposeInMainWorld('elec_', {
    ipcRenderer: ipcRenderer,
    ipcon: (flag, fun) => {
        ipcRenderer.on(flag, fun)
    },
    path: require('path'),
    fs: require('fs'),
    cd: cd,
})
