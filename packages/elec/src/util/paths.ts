import { app } from 'electron'
import fs from 'fs'
import path from 'path'

const root_dir = path.resolve(app.getPath('userData'))
console.log('root_dir', root_dir)

/** 预置需要的文件夹 */
export function preset() {
    if (!fs.existsSync(root_dir)) {
        fs.mkdirSync(root_dir)
    }

    function maybe(v: Record<string, string | Record<string, any>>) {
        if ('$dir' in v) {
            const $dir = v.$dir as string
            if (!fs.existsSync($dir)) {
                fs.mkdirSync($dir)
            }
        }
        const keys = Object.keys(v)
        for (const key of keys) {
            const value = v[key]
            if (typeof value === 'string') {
                if (/_$/.test(key)) {
                    if (!fs.existsSync(value)) {
                        fs.mkdirSync(value)
                    }
                }
            } else {
                maybe(value)
            }
        }
    }
}

function typecheck(v: Record<string, string | Record<string, any>>) {
    if ('$dir' in v) {
        if (typeof v.$dir !== 'string') {
            throw 'must be path'
        }
    }
    const keys = Object.keys(v)
    for (const key of keys) {
        const value = v[key]
        if (typeof value === 'string') {
            if (/_$/.test(key)) {
                // 路径不能出现 .
                if (/\./.test(value)) {
                    throw 'path can not include .'
                }
            }
        } else {
            typecheck(value)
        }
    }
}
