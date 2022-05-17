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
            <Item2 name="postman" src="C:\Users\zrtxl\AppData\Local\Postman" file_name="Postman.exe" />
            <div className={style.line}></div>
            <Item2 name="steam" src="D:\Program Files (x86)\Steam" file_name="steam.exe" />
            <Item2
                name="mumu模拟器"
                src="D:\Program Files\MuMu\emulator\nemu\EmulatorShell"
                file_name="NemuPlayer.exe"
            />
            <Item2 name="qq音乐" src="C:\Program Files (x86)\Tencent\QQMusic" file_name="QQMusic.exe" />
            <Item2 name="天狼50" src="D:\Program Files (x86)\天狼50\天狼50证券分析系统" file_name="tl50v2.exe" />
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
