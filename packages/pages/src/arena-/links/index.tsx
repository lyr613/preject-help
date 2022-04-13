import React, { useState, useEffect } from 'react'
import { UtilNode } from 'util-/nodef'
import style from './style.module.scss'

export function Links() {
    return (
        <div className={style.Links}>
            <Item type="file" src="C:/Program Files/Google/Chrome/Application/chrome.exe" name="chrome" />
            <Item
                type="file"
                src="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Firefox Developer Edition"
                name="firefox"
            />
            <div className={style.line}></div>
            <Item
                type="file"
                src="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Adobe Premiere Pro 2022"
                name="ps"
            />
            <Item
                type="file"
                src="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Adobe After Effects 2022"
                name="ae"
            />
            <Item
                type="file"
                src="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Adobe Illustrator 2022"
                name="ai"
            />
            <Item
                type="file"
                src="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Adobe Premiere Pro 2022"
                name="pr"
            />
            <div className={style.line}></div>
            <Item type="file" src="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Excel" name="excel" />
            <Item type="file" src="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Word" name="word" />
            {/* <Item type="file" src="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\" name="Firefox" />
            <Item type="file" src="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\" name="Firefox" /> */}
            <div className={style.line}></div>
            <Item type="dir" src="C:\Windows\System32\drivers\etc" name="host" />
            <Item type="dir" src="C:\Users\zrtxl\.ssh" name="ssh" />
        </div>
    )
}

interface item {
    type: 'dir' | 'file'
    src: string
    name: string
}
function Item(p: item) {
    return (
        <div
            className={style.Item}
            onClick={() => {
                if (p.type === 'file') {
                    const src = UtilNode._path.join(p.src)
                    const app = UtilNode.path.basename(src)
                    const dir = UtilNode._path.join(p.src, '..')

                    UtilNode.cd.exec(`start ${app}`, {
                        cwd: dir,
                    })
                } else {
                    UtilNode.cd.exec(`start ${p.src}`)
                }
            }}
        >
            {p.name}
        </div>
    )
}
