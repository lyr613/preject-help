import { useObservable } from 'rxjs-hooks'
import * as d from './dv'
import { NOUI } from '@prolp/noui/src'
import { clsx } from 'clsx'
import { Util } from '@/util'
import type { datas, Size } from './type'

export function BlockGroups() {
    const groups = useObservable(
        () =>
            NOUI.Form.hand.sub_value_getter$({
                ctrl: d.ctrl,
                getter(f) {
                    return f.groups
                },
            }),
        [],
    )
    const size = useObservable(
        () =>
            NOUI.Form.hand.sub_value_getter$({
                ctrl: d.ctrl,
                getter(f) {
                    return f.project_size
                },
            }),
        'middle',
    )

    return (
        <div className={'pb-96'}>
            {groups.map((group, i) => (
                <OneGroup group={group} key={group.group_fspath + i} size={size} />
            ))}
        </div>
    )
}

// #region group
function OneGroup(p: {
    //
    group: IPCtype.querys.project_finds['result']['data'][0]
    size: Size
}) {
    return (
        <div className={' '}>
            <div className="bg-primary-100 group my-4 flex items-center py-2 pl-6">
                <h3 className="m-0 text-lg font-bold">{p.group.group_name}</h3>
                <div className="ml-4 hidden pt-1 text-sm opacity-60 group-hover:block">{p.group.group_fspath}</div>
            </div>
            <div
                className="grid px-6"
                style={{
                    gridTemplateColumns:
                        p.size === 'big'
                            ? 'repeat(auto-fill, minmax(200px, 1fr))'
                            : p.size === 'middle'
                            ? 'repeat(auto-fill, minmax(160px, 1fr)'
                            : 'repeat(auto-fill, minmax(120px, 1fr))',
                    gridTemplateRows: 'auto',
                    gap: '12px',
                }}
            >
                {p.group.projects.map((project, i) => (
                    <OneProject project={project} key={project.fspath} size={p.size} />
                ))}
            </div>
        </div>
    )
}

// #region project
function OneProject(p: {
    //
    project: IPCtype.querys.project_finds['result']['data'][0]['projects'][0]
    size: Size
}) {
    const { project } = p
    return (
        <div
            className={clsx('bg-primary-50 relative flex flex-col', 'border-primary-300 border border-solid', 'group')}
            style={{
                aspectRatio: '4/3',
            }}
            key={project.fspath}
        >
            <div className="flex h-0 w-full flex-grow items-center justify-center">
                <img src={project.logo} className={'max-h-full max-w-full flex-shrink-0 flex-grow-0 p-4'} alt="" />
            </div>
            <div
                className={clsx(
                    'flex items-center justify-center',
                    'whitespace-nowrap  text-black',
                    'bg-primary-200 h-8',
                    'overflow-hidden',
                    p.size === 'small' ? 'text-xs' : 'text-sm',
                )}
            >
                {project.name}
            </div>
            <div
                className={clsx(
                    'absolute left-0 top-0 z-20   w-full overflow-y-auto overflow-x-hidden',
                    'hidden group-hover:block',
                    'border-primary-100 border border-solid',
                )}
                style={{
                    maxHeight: '400px',
                    boxShadow: '7px 7px 10px 0 rgba(0, 0, 0, 0.3)',
                }}
            >
                <div
                    className={clsx(
                        'box-border h-8 px-4 hover:pl-6',
                        p.size === 'small' ? 'text-xs' : 'text-sm',
                        'flex items-center',
                        'bg-primary-200 hover:bg-primary-300',
                        'cursor-pointer select-none whitespace-nowrap',
                        'transition-all',
                    )}
                    onClick={() => {
                        Util.elec.query_once$<IPCtype.querys.project_open>({
                            flag: 'project_open',
                            fspath: project.fspath,
                            vscode: true,
                            open_children: false,
                        })
                    }}
                >
                    vscode
                </div>
                <div
                    className={clsx(
                        'box-border h-8 px-4 hover:pl-6 ',
                        'border-primary-600 border-0 border-t border-solid',
                        p.size === 'small' ? 'text-xs' : 'text-sm',
                        'flex items-center',
                        'bg-primary-200 hover:bg-primary-300',
                        'cursor-pointer select-none whitespace-nowrap',
                        'transition-all',
                    )}
                    onClick={(e) => {
                        Util.elec.query_once$<IPCtype.querys.project_open>({
                            flag: 'project_open',
                            fspath: project.fspath,
                            vscode: false,
                            open_children: e.ctrlKey || e.altKey,
                        })
                    }}
                >
                    资源管理器
                </div>
                {project.jsworkspace.map((workchild, iw) => (
                    <div
                        key={workchild.fspath}
                        className={clsx(
                            'box-border h-8 px-8 hover:pl-12 ',
                            'border-primary-600 border-0 border-t border-solid',
                            workchild.name.length > 20 ? 'text-xs' : p.size === 'small' ? 'text-xs' : 'text-sm',
                            'flex items-center',
                            'bg-primary-200 hover:bg-primary-300',
                            'cursor-pointer select-none whitespace-nowrap',
                            'transition-all',
                        )}
                        onClick={(e) => {
                            Util.elec.query_once$<IPCtype.querys.project_open>({
                                flag: 'project_open',
                                fspath: workchild.fspath,
                                vscode: !(e.ctrlKey || e.altKey),
                                open_children: false,
                            })
                        }}
                    >
                        {workchild.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
