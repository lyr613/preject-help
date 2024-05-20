import { useObservable } from 'rxjs-hooks'
import * as d from './dv'
import { NOUI } from '@prolp/noui/src'
import clsx from 'clsx'

export function BlockHead() {
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
        <div className={clsx('flex  items-center space-x-4 ', 'h-12 whitespace-nowrap px-4')}>
            <div
                className="flex w-min cursor-pointer select-none border border-solid border-black px-2 py-1 text-base"
                onClick={() => {
                    d.load_projects()
                }}
            >
                载入
            </div>
            <div
                className={clsx(
                    'flex w-min cursor-pointer select-none border border-solid border-black px-2 py-1 text-base',
                    { 'bg-gray-300': size === 'small' },
                )}
                onClick={() => {
                    NOUI.Form.hand.value_merge({
                        ctrl: d.ctrl,
                        worker(f) {
                            f.project_size = 'small'
                        },
                    })
                }}
            >
                小
            </div>
            <div
                className={clsx(
                    'flex w-min cursor-pointer select-none border border-solid border-black px-2 py-1 text-base',
                    { 'bg-gray-300': size === 'middle' },
                )}
                onClick={() => {
                    NOUI.Form.hand.value_merge({
                        ctrl: d.ctrl,
                        worker(f) {
                            f.project_size = 'middle'
                        },
                    })
                }}
            >
                中
            </div>
            <div
                className={clsx(
                    'flex w-min cursor-pointer select-none border border-solid border-black px-2 py-1 text-base',
                    { 'bg-gray-300': size === 'big' },
                )}
                onClick={() => {
                    NOUI.Form.hand.value_merge({
                        ctrl: d.ctrl,
                        worker(f) {
                            f.project_size = 'big'
                        },
                    })
                }}
            >
                大
            </div>
        </div>
    )
}
