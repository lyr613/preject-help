import React, { useState, useEffect } from 'react'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { UtilElec } from 'util-/electron'
import { UtilNode } from 'util-/nodef'
import style from './style.module.scss'

const root_path$ = new BehaviorSubject(localStorage.getItem('path') || '')

/** Home */
export default function Home() {
    useEffect(() => {
        if (root_path$.value) {
            UtilElec.ipc.send('search_project', root_path$.value)
        }
        // const channel = new MessageChannel()
        // const port1 = channel.port1
        // const port2 = channel.port2
        // UtilElec.ipc.postMessage('port', null, [2333])
    }, [])
    return (
        <div className={style.Home}>
            <Head />
            <Box />
        </div>
    )
}

function Head() {
    const rp = useObservable(() => root_path$, '')
    return (
        <div className={style.Head}>
            <button
                className={style.btn}
                onClick={() => {
                    const o = UtilElec.ipc.sendSync('path_pick')
                    const src = o.data as string
                    if (src) {
                        UtilElec.ipc.send('search_project', src)
                        localStorage.setItem('path', src)
                        root_path$.next(src)
                    }
                    console.log(o)
                }}
            >
                选择路径
            </button>
            <button
                className={style.btn}
                onClick={() => {
                    const src = root_path$.value
                    if (src) {
                        UtilElec.ipc.send('search_project', src)
                    }
                }}
            >
                刷新
            </button>
            <span className={style.rootPath}>{rp}</span>
        </div>
    )
}

function Box() {
    const [pros, next_pros] = useState([] as project[])
    useEffect(() => {
        const fun: ipconfun = (e, re: msg_dto<project[]>) => {
            const arr = re.data
            console.log(arr)
            next_pros(arr)
        }
        UtilElec.ipcon('search_project', fun)
        return () => {
            UtilElec.ipcRemove('search_project', fun)
        }
    }, [])
    return (
        <div className={style.Box}>
            <div className={style.container}>
                {pros.map((p, i) => (
                    <Item project={p} key={i + p.name} />
                ))}
            </div>
        </div>
    )
}

interface p_item {
    project: project
}
function Item(pt: p_item) {
    const [show_workspace, next_show_workspace] = useState(false)

    const p = pt.project
    return (
        <div className={style.Item}>
            <div className={style.item}>
                <div className={style.name} title={p.name}>
                    {p.name}
                </div>
                {show_workspace ? (
                    <div className={style.btnbox}>
                        <div
                            className={style.line}
                            onClick={() => {
                                next_show_workspace(false)
                            }}
                        >
                            ..
                        </div>
                        {p.jsprojects.map((pj) => (
                            <div
                                className={style.line}
                                onClick={() => {
                                    UtilNode.cd.exec('code .', {
                                        cwd: pj,
                                    })
                                }}
                                key={pj}
                            >
                                {pj.split(/[\\/]/).slice(-1)[0]}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={style.btnbox}>
                        <div
                            className={style.line}
                            onClick={() => {
                                UtilNode.cd.exec('code .', {
                                    cwd: p.src,
                                })
                            }}
                        >
                            vscode
                        </div>
                        <div
                            className={style.line}
                            onClick={() => {
                                // UtilNode.cd.exec('start .', {
                                //     cwd: p.src,
                                // })
                                UtilElec.ipc.send('path_show', p.src)
                            }}
                        >
                            资源管理器
                        </div>
                        {p.jsworkspace && (
                            <div
                                className={style.line}
                                onClick={() => {
                                    next_show_workspace(true)
                                }}
                            >
                                查看工作区
                            </div>
                        )}
                    </div>
                )}
                {p.previews.length && (
                    <div className={style.imgbox}>
                        <img src={p.previews[0]} alt="" />
                    </div>
                )}
            </div>
        </div>
    )
}
