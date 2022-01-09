import { ipcMain } from 'electron'
import { existsSync, readFileSync, statSync } from 'fs'
import { readdirSync } from 'fs-extra'
import { join } from 'path'
import { UtilReply } from 'util-/reply'

class _t {
    watch() {
        ipcMain.on('search_project', (e, src) => {
            this.search_project(e, src)
        })
    }

    search_project(e: Electron.IpcMainEvent, src: string) {
        const project_srcs: string[] = []
        let stack = [src]
        while (stack.length) {
            const next: string[] = []
            stack.forEach((srcc) => {
                try {
                    const children = readdirSync(srcc)
                    if (children.length > 100) {
                        return
                    }
                    const m = new Map<string, boolean>()
                    children.forEach((s) => {
                        m.set(s, true)
                    })
                    if (m.get('.git') || m.get('package.json')) {
                        project_srcs.push(srcc)
                        return
                    }
                    const topush = children
                        .map((s) => join(srcc, s))
                        .filter((src) => {
                            try {
                                const s = statSync(src)
                                return s.isDirectory()
                            } catch (error) {
                                return false
                            }
                        })
                    next.push(...topush)
                } catch (error) {}
            })
            stack = next
        }
        // console.log(project_srcs)

        const rearr = project_srcs.map((src) => {
            const o: project = {
                src: src,
                name: '',
                jsworkspace: false,
                previews: [],
                jsprojects: [],
            }
            const src_workspace = join(src, 'packages')
            if (existsSync(src_workspace)) {
                o.jsworkspace = true
                const jscds = readdirSync(src_workspace).map((s) => join(src_workspace, s))
                o.jsprojects = jscds
            }
            // 名字
            const src_package = join(src, 'package.json')
            if (existsSync(src_package)) {
                const t = readFileSync(src_package, 'utf-8')
                const j = JSON.parse(t)
                j.name && (o.name = j.name)
            }
            // 预览图
            const src_doc = join(src, 'doc')
            if (existsSync(src_doc)) {
                const doc_children = readdirSync(src_doc)
                    .filter((v) => {
                        return /preview.*(png|jpg)/.test(v)
                    })
                    .map((v) => join(src_doc, v))
                o.previews = doc_children
            }
            return o
        })
        const msg = UtilReply.msg(rearr)
        msg.b = true
        msg.txt = ''

        // console.log(rearr)

        UtilReply.reply(e, 'search_project', msg)
    }
}

export const WatchSearch = new _t()
