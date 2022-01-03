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
}

export const UtilElec = new _UtilElec()
