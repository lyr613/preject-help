import React, { useState, useEffect } from 'react'
import { UtilNode } from 'util-/nodef'
import style from './style.module.scss'

export function Links() {
    const [li, next_li] = useState([] as item2[][])
    useEffect(() => {
        try {
            const re = UtilNode.fs.read_file('C:\\Users\\zrtxl\\Documents\\qv-project\\links.json')
            const str = re.data
            const li = JSON.parse(str) as item2[][]
            next_li(li)

            console.log(li)
        } catch (error) {}
    }, [])
    return (
        <div className={style.Links}>
            {li.map((row, y) => (
                <div key={y}>
                    {row.map((item, x) => (
                        <Item2 key={y + '-' + x} name={item.name} src={item.src} file_name={item.file_name} />
                    ))}
                    <div className={style.line}></div>
                </div>
            ))}
        </div>
    )
}

interface item2 {
    src: string
    file_name?: string
    name: string
}
function Item2(p: item2) {
    return (
        <div
            className={style.Item}
            onClick={() => {
                const srcs = [p.src, p.file_name].filter(Boolean) as string[]
                const src = UtilNode.path.join(...srcs)
                UtilNode.cd.exec(`start "" "${src}"`)
            }}
        >
            {p.name}
        </div>
    )
}
