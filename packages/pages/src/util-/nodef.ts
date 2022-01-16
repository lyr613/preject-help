import path from 'path'

class _path {
    private path = (window as any).elec_.path
    join(...srcs: string[]): string {
        if (srcs.some((v) => !v)) {
            return ''
        }
        return this.path.join(...srcs)
    }
    /** 扩展名, 从最后一个 . 开始 */
    extname(src: string): string {
        return this.path.extname(src)
    }
    basename(src: string): string {
        return this.path.basename(src)
    }
}
const Path = new _path()

interface read_dir_re {
    src_base: string
    src_full: string
    /** 扩展名, 从最后一个 . 开始 */
    extname: string
}
class _fs {
    private fs = (window as any).elec_.fs
    read_file(src: string) {
        const msg: msg_dto<string> = {
            b: false,
            data: '',
            txt: '',
        }
        if (!this.exists(src)) {
            msg.txt = '文件不存在'
            return msg
        }
        try {
            msg.data = this.fs.readFileSync(src, 'utf-8')
            msg.b = true
            return msg
        } catch (error) {
            return msg
        }
    }
    copy_file(src_source: string, src_target: string) {
        try {
            this.fs.copyFileSync(src_source, src_target)
        } catch (error) {}
    }
    write_file(src: string, txt: string) {
        try {
            this.fs.writeFileSync(src, txt)
        } catch (error) {}
    }
    read_json(src: string) {
        const msg: msg_dto<any> = this.read_file(src)
        if (!msg.b) {
            return msg
        }
        try {
            msg.data = JSON.parse(msg.data)
            msg.b = true
            return msg
        } catch (error) {
            msg.b = false
            return msg
        }
    }
    read_dir(src: string) {
        const msg: msg_dto<read_dir_re[]> = {
            b: false,
            data: [],
            txt: '',
        }
        try {
            const cds: string[] = this.fs.readdirSync(src)
            const cd2s = cds.map((bn) => {
                const re: read_dir_re = {
                    src_base: bn,
                    src_full: path.join(src, bn),
                    extname: path.extname(bn),
                }
                return re
            })
            msg.data = cd2s
            msg.b = true
            return msg
        } catch (error) {
            return msg
        }
    }
    make_dir(src: string) {
        try {
            const stack: string[] = []
            while (!this.exists(src)) {
                stack.unshift(src)
                src = path.join(src, '..')
            }
            // 这么多层缺失有点离谱
            if (stack.length > 3) {
                return
            }
            stack.forEach((d) => {
                this.fs.mkdirSync(d)
            })

            // this.fs.mkdirSync(src)
        } catch (error) {}
    }
    exists(src: string): boolean {
        try {
            return this.fs.existsSync(src)
        } catch (error) {
            return false
        }
    }
    del_file(src: string) {
        try {
            this.fs.unlinkSync(src)
        } catch (error) {}
    }
}
const fs = new _fs()

class _node {
    fs = fs
    path = Path
    cd = (window as any).elec_.cd
    _path = (window as any).elec_.path as path.PlatformPath
}
export const UtilNode = new _node()
