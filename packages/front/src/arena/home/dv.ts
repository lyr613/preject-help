import { NOUI } from '@prolp/noui/src'
import type { datas } from './type'
import { Util } from '@/util'

function mk_datas(): datas {
    return {
        groups: [],
        project_size: 'middle',
    }
}
export const ctrl = NOUI.Form.make(mk_datas)

export function load_projects() {
    Util.elec
        .query_once$<IPCtype.querys.project_finds>({
            flag: 'project_finds',
            root_paths: Util.caches.groups.load(),
        })
        .subscribe((r) => {
            console.log('rrr', r)
            if (r.success) {
                NOUI.Form.hand.value_merge({
                    ctrl,
                    worker(f) {
                        f.groups = r.data
                    },
                })
            }
        })
}
