import React, { useState, useEffect } from 'react'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { SubjectProjectPath } from 'subject-/project-path'
import { ipconfun } from 'type-'
import { UtilElec } from 'util-/electron'
import { UtilNode } from 'util-/nodef'
import style from './style.module.scss'

const size$ = new BehaviorSubject<'small' | 'middle' | 'large'>('large')
const catch_size_key = 'size'

/** Home */
export default function Home() {
    useEffect(() => {
        SubjectProjectPath.load()
        // console.log(' SubjectProjectPath.paths$.value', SubjectProjectPath.paths$.value)

        UtilElec.ipc.send('search_projects', SubjectProjectPath.paths$.value)
        // const channel = new MessageChannel()
        // const port1 = channel.port1
        // const port2 = channel.port2
        // UtilElec.ipc.postMessage('port', null, [2333])
        const size = localStorage.getItem(catch_size_key)
        size$.next((size as any) || 'large')
    }, [])
    return (
        <div className={style.Home}>
            <Head />
            <Box />
        </div>
    )
}

function Head() {
    const [show_opt, next_show_opt] = useState(false)
    return (
        <div className={style.Head}>
            <button
                className={style.btn}
                onClick={() => {
                    UtilElec.ipc.send('search_projects', SubjectProjectPath.paths$.value)
                }}
            >
                刷新
            </button>
            <button
                className={style.btn}
                onClick={() => {
                    next_show_opt(true)
                }}
            >
                配置
            </button>
            <button
                className={style.btn}
                onClick={() => {
                    size$.next('small')
                    localStorage.setItem(catch_size_key, 'small')
                }}
            >
                小
            </button>
            <button
                className={style.btn}
                onClick={() => {
                    size$.next('middle')
                    localStorage.setItem(catch_size_key, 'middle')
                }}
            >
                中
            </button>
            <button
                className={style.btn}
                onClick={() => {
                    size$.next('large')
                    localStorage.setItem(catch_size_key, 'large')
                }}
            >
                大
            </button>
            {show_opt && <Option close={() => next_show_opt(false)} />}
        </div>
    )
}

interface p_opt {
    close: () => void
}
function Option(p: p_opt) {
    const paths = useObservable(() => SubjectProjectPath.paths$, [])

    return (
        <div className={style.Option}>
            <div className={style.container}>
                <div className={style.grid}>
                    <div className={style.c1}>地址</div>
                    <div className={style.c2}>操作</div>
                    {paths.map((p, i) => (
                        <PathRow path={p} index={i} key={p} />
                    ))}
                    <div className={style.c1}> </div>
                    <div className={style.c2}>
                        <button
                            className={style.btn}
                            onClick={() => {
                                // console.log(UtilNode._path)
                                const o = UtilElec.ipc.sendSync('path_pick')
                                const src = o.data as string
                                SubjectProjectPath.add(src)
                            }}
                        >
                            添加
                        </button>
                        <button
                            className={style.btn}
                            onClick={() => {
                                p.close()
                                UtilElec.ipc.send('search_projects', SubjectProjectPath.paths$.value)
                            }}
                        >
                            关闭
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface p_pr {
    index: number
    path: string
}
function PathRow(p: p_pr) {
    return (
        <>
            <div className={style.c1}>{p.path}</div>
            <div className={style.c2}>
                <button
                    className={style.btn}
                    onClick={() => {
                        SubjectProjectPath.upper(p.index)
                    }}
                >
                    上移
                </button>
                <button
                    className={style.btn}
                    onClick={() => {
                        SubjectProjectPath.downer(p.index)
                    }}
                >
                    下移
                </button>
                <button
                    className={style.btn}
                    onClick={() => {
                        SubjectProjectPath.remove(p.index)
                    }}
                >
                    删除
                </button>
            </div>
        </>
    )
}

interface msg {
    src: string
    projects: project[]
}
function Box() {
    const [pros, next_pros] = useState([] as msg[])
    const size = useObservable(() => size$, 'large')
    console.log('size', size)
    useEffect(() => {
        const fun: ipconfun = (e, re: msg_dto<msg[]>) => {
            const arr = re.data
            console.log('9999', arr)
            next_pros(arr)
        }
        UtilElec.ipcon('search_projects', fun)
        return () => {
            UtilElec.ipcRemove('search_projects', fun)
        }
    }, [])
    return (
        <div className={style.Box}>
            {pros.map((msg) => (
                <div
                    className={style.container}
                    style={{
                        gridTemplateColumns:
                            size === 'large'
                                ? 'repeat(auto-fill, minmax(240px, 1fr))'
                                : size === 'middle'
                                ? 'repeat(auto-fill, minmax(180px, 1fr)'
                                : 'repeat(auto-fill, minmax(120px, 1fr))',
                    }}
                    key={msg.src}
                >
                    <h2>{msg.src}</h2>
                    {msg.projects.map((p, i) => (
                        <Item project={p} key={i + p.src} />
                    ))}
                </div>
            ))}
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
                    {p.name || p.src}
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
                                onClick={(e) => {
                                    // UtilNode.cd.exec('code .', {
                                    //     cwd: pj,
                                    // })
                                    if (e.ctrlKey) {
                                        UtilElec.ipc.send('path_show', pj)
                                        return
                                    }
                                    UtilElec.ipc.send('path_vsc', pj)
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
                                // UtilNode.cd.exec('code .', {
                                //     cwd: p.src,
                                // })
                                UtilElec.ipc.send('path_vsc', p.src)
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
