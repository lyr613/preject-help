import { useObservable } from 'rxjs-hooks'
import * as d from './dv'
import { NOUI } from '@prolp/noui/src'
import { clsx } from 'clsx'

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
        <div className={''}>
            {groups.map((group, i) => (
                <OneGroup group={group} key={group.group_fspath + i} size={size} />
            ))}
        </div>
    )
}

// #region group
function OneGroup(p: { group: IPCtype.querys.project_finds['result']['data'][0]; size: string }) {
    return (
        <div className={' '}>
            <div className="group my-4 flex items-center bg-blue-100 py-2 pl-6">
                <h3 className="m-0 text-lg">{p.group.group_name}</h3>
                <div className="ml-4 hidden pt-1 text-sm opacity-60 group-hover:block">{p.group.group_fspath}</div>
            </div>
            <div
                className="grid px-6"
                style={{
                    gridTemplateColumns:
                        p.size === 'large'
                            ? 'repeat(auto-fill, minmax(240px, 1fr))'
                            : p.size === 'middle'
                            ? 'repeat(auto-fill, minmax(180px, 1fr)'
                            : 'repeat(auto-fill, minmax(120px, 1fr))',
                    gridTemplateRows: 'auto',
                    gap: '12px',
                }}
            >
                {p.group.projects.map((project, i) => (
                    <OneProject project={project} key={project.fspath} />
                ))}
            </div>
        </div>
    )
}

// #region project
function OneProject(p: { project: IPCtype.querys.project_finds['result']['data'][0]['projects'][0] }) {
    const { project } = p
    return (
        <div
            className={clsx('relative flex flex-col bg-blue-50', 'border border-solid border-blue-200', 'group')}
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
                    'whitespace-nowrap text-sm text-black',
                    'h-8 bg-blue-100',
                    'overflow-hidden',
                )}
            >
                {project.name}
            </div>
            <div
                className={clsx(
                    'absolute left-0 top-0 z-20 w-full',
                    'hidden group-hover:block',
                    'border border-solid border-blue-100',
                )}
            >
                <div
                    className={clsx(
                        'box-border h-8 px-4 hover:pl-6',
                        'border-0 border-b border-solid border-blue-600',
                        'text-sm',
                        'flex items-center',
                        'bg-blue-200 hover:bg-blue-300',
                        'cursor-pointer select-none',
                        'transition-all',
                    )}
                >
                    vscode
                </div>
                <div
                    className={clsx(
                        'box-border h-8 px-4 hover:pl-6 ',
                        'border-0 border-b border-solid border-blue-600',
                        'text-sm',
                        'flex items-center',
                        'bg-blue-200 hover:bg-blue-300',
                        'cursor-pointer select-none',
                        'transition-all',
                    )}
                >
                    资源管理器
                </div>
                {project.jsworkspace.map((workchild, iw) => (
                    <div
                        key={workchild.fspath}
                        className={clsx(
                            'box-border h-8 px-8 hover:pl-12 ',
                            'border-0 border-b border-solid border-blue-600',
                            'text-sm',
                            'flex items-center',
                            'bg-blue-200 hover:bg-blue-300',
                            'cursor-pointer select-none',
                            'transition-all',
                        )}
                    >
                        {workchild.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
