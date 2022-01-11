import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { parse } from 'json5'

/** Some */
export default function TranInterface() {
    const [ipt, next_ipt] = useState('')
    const traned = tran(ipt)
    return (
        <div className={style.TranInterface}>
            <div className={style.left}>
                <textarea
                    name="tt"
                    id="tt"
                    value={ipt}
                    onChange={(e) => {
                        const v = e.target.value
                        console.log(v)
                        next_ipt(v)
                    }}
                ></textarea>
            </div>
            <div
                className={style.right}
                onClick={() => {
                    navigator.clipboard.writeText(traned)
                }}
            >
                {traned}
            </div>
        </div>
    )
}

function tran(source: string) {
    let str = 'interface Some {'
    try {
        const obj = JSON.parse(source)
        Object.entries(obj).forEach((kv) => {
            deep_tran(kv[0], kv[1], 1)
        })
        str += '\n}'
        return str
    } catch (error) {
        return ''
    }

    function deep_tran(k: string, v: any, deep: number) {
        // console.log(k, v, deep)
        const pre = '    '.repeat(deep)
        if (typeof v === 'string') {
            str += `\n${pre}${k}: string`
            return
        }
        if (typeof v === 'number') {
            str += `\n${pre}${k}: number`
            return
        }
        if (typeof v === 'boolean') {
            str += `\n${pre}${k}: boolean`
            return
        }
        if (v === null) {
            str += `\n${pre}${k}: null`
            return
        }
        if (Array.isArray(v)) {
            deep_tran(k, v[0], deep)
            str += '[]'
            return
        }
        str += `\n${pre}${k}: {`
        const kvs = Object.entries(v)
        kvs.forEach((kv) => {
            deep_tran(kv[0], kv[1], deep + 1)
        })
        str += '\n' + pre + '}'
        return
    }
}
