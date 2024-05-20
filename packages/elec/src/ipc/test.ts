import { Util } from '@/util'
import * as util from './util'

export function test(e: Electron.IpcMainEvent, q: IPCtype.querys.test['search']) {
    util.reply(e, q, util.make_result(true))
}
