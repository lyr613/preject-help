class _UtilElec {
    get ipc() {
        const re = window.elec_?.ipcRenderer || {
            on() {},
            once() {},
            send() {},
            sendSync() {},
            removeListener() {},
        }
        return re
    }
    ipcon = window.elec_.ipcon
    ipcRemove = window.elec_.ipcRemove
}

export const UtilElec = new _UtilElec()
