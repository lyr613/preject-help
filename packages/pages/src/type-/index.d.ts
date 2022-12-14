import path from 'path'

declare type int = number
declare type float = number

type ipconfun = (e: any, ...args: any[]) => void

interface Window {
    elec_: {
        ipcRenderer: {
            on: (flag: string, fun: ipconfun) => void
            once: (flag: string, fun: ipconfun) => void
            send: (flag: string, ...args: any[]) => void
            sendSync: (flag: string, ...args: any[]) => any
            removeListener: (flag: string, fun: ipconfun) => void
            postMessage: (flag: string, nu: null, fun: any) => void
        }
        ipcon: (flag: string, fun: ipconfun) => void
        ipcRemove: (flag: string, fun: ipconfun) => void
        path: path.PlatformPath
    }
}
