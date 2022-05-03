import React, { useState, useEffect } from 'react'
import { UtilNode } from 'util-/nodef'
import style from './style.module.scss'

export function Links() {
    return (
        <div className={style.Links}>
            <Item type="file" src="C:/Program Files/Google/Chrome/Application/chrome.exe" name="chrome" />
            <Item type="file" src="C:\Program Files\Firefox Developer Edition\firefox.exe" name="firefox" />
            <div className={style.line}></div>
            <Item type="file" src="D:\aadobe\Adobe Photoshop 2022\Photoshop.exe" name="ps" />
            <Item type="file" src="D:\aadobe\Adobe After Effects 2022\Support Files\AfterFX.exe" name="ae" />
            <Item
                type="file"
                src="D:\aadobe\Adobe Illustrator 2022\Support Files\Contents\Windows\Illustrator.exe"
                name="ai"
            />
            <Item type="file" src="D:\aadobe\pr\Adobe Premiere Pro 2022\Adobe Premiere Pro.exe" name="pr" />
            <div className={style.line}></div>
            <Item type="file" src="C:\Program Files\Microsoft Office\root\Office16\EXCEL.EXE" name="excel" />
            <Item type="file" src="C:\Program Files\Microsoft Office\root\Office16\WINWORD.EXE" name="word" />
            <Item type="file" src="C:\Program Files\Microsoft Office\root\Office16\POWERPNT.EXE" name="ppt" />
            {/* <Item type="file" src="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\" name="Firefox" />
            <Item type="file" src="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\" name="Firefox" /> */}
            <div className={style.line}></div>
            <Item type="dir" src="C:\Windows\System32\drivers\etc" name="host" />
            <Item type="dir" src="C:\Users\zrtxl\.ssh" name="ssh" />
            <div className={style.line}></div>
            <Item type="file" src="C:\Program Files\OpenVPN\bin\openvpn-gui.exe" name="open-vpn" />
            <Item type="file" src="D:\Program Files\DuangCloud\DuangCloud.exe" name="vpn" />
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

                    UtilNode.cd.exec(`start "" "${p.src}"`, {
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
