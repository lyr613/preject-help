export function reply(e: Electron.IpcMainEvent, search: any, result: IPCtype.R<any>) {
    const r = {
        __query_id: search.__query_id,
        ...result,
    }
    e.reply('data-ipc', r)
}

export function make_result(data?: any): IPCtype.R<any> {
    return {
        data,
        code: 0,
        msg: 'ok',
        success: true,
    }
}
export function make_err(): IPCtype.R<any> {
    return {
        data: null,
        code: 0,
        msg: 'ok',
        success: false,
    }
}
