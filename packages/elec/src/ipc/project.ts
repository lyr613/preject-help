import { Util } from '@/util'
import * as util from './util'
import path from 'path'
import fs from 'fs-extra'
import { get } from 'lodash-es'

export function find(e: Electron.IpcMainEvent, q: IPCtype.querys.project_finds['search']) {
    const groups = q.root_paths
    const parseds = groups.map(parse_group)
    util.reply(e, q, util.make_result(parseds))
}

function parse_group(fspath: string): IPCtype.querys.project_finds['result']['data'][0] {
    const re: IPCtype.querys.project_finds['result']['data'][0] = {
        group_fspath: fspath,
        group_name: path.basename(fspath),
        projects: [],
    }
    let queue = [fspath]
    const well_srcs: string[] = []
    while (queue.length) {
        const next_queue: string[] = []
        queue.forEach((it) => {
            const it_children = fs.readdirSync(it)
            if (it_children.length > 150 || it_children.length === 0) {
                return
            }
            if (!fs.existsSync(path.join(it, 'package.json')) && !fs.existsSync(path.join(it, '.git'))) {
                // 不是项目
                it_children.forEach((children_name) => {
                    const children_fspath = path.join(it, children_name)
                    if (fs.statSync(children_fspath).isDirectory()) {
                        next_queue.push(children_fspath)
                    }
                })
                return
            }
            const a_project: IPCtype.querys.project_finds['result']['data'][0]['projects'][0] = {
                fspath: it,
                jsworkspace: [],
                logo: '',
                name: path.basename(it),
                sort: 999999,
            }
            if (fs.existsSync(path.join(it, 'package.json'))) {
                const package_infor = JSON.parse(fs.readFileSync(path.join(it, 'package.json')).toString())
                a_project.name =
                    get(package_infor, 'qproject.name', '') || get(package_infor, 'name', '') || path.basename(it)
                a_project.sort = get(package_infor, 'qproject.sort', 999999)
            }
            const try_logos = [
                path.join(it, 'doc', 'logo.svg'),
                path.join(it, 'doc', 'logo.png'),
                path.join(it, 'doc', 'preview.svg'),
                path.join(it, 'doc', 'preview.png'),
            ]
            for (const logo of try_logos) {
                if (fs.existsSync(logo)) {
                    a_project.logo = logo
                    break
                }
            }
            if (fs.existsSync(path.join(it, 'packages'))) {
                a_project.jsworkspace.push(
                    ...fs.readdirSync(path.join(it, 'packages')).map((s) => ({
                        name: s,
                        fspath: path.join(it, 'packages', s),
                    })),
                )
            }
            re.projects.push(a_project)
        })
        queue = next_queue
    }
    re.projects.sort((a, b) => a.sort - b.sort)
    return re
}
