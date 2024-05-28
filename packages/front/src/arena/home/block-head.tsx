import { Rout } from '@/routs'
import { NOUI } from '@prolp/noui/src'
import { Button, Segmented } from 'antd'
import clsx from 'clsx'
import { useObservable } from 'rxjs-hooks'
import * as d from './dv'

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
        <div
            className={clsx(
                'flex items-center space-x-4 ',
                'h-12 whitespace-nowrap px-4',
                'sticky top-0 z-50',
                '  bg-white',
            )}
        >
            <Button
                onClick={() => {
                    NOUI.Form.hand.value_merge({
                        ctrl: d.ctrl,
                        worker(f) {
                            f.groups = []
                        },
                    })
                    d.load_projects()
                }}
            >
                载入
            </Button>
            <Button
                onClick={() => {
                    Rout.go(Rout.target.project.config)
                }}
            >
                配置
            </Button>
            <Segmented
                value={size}
                options={[
                    {
                        label: '小',
                        value: 'small',
                    },
                    {
                        label: '中',
                        value: 'middle',
                    },
                    {
                        label: '大',
                        value: 'big',
                    },
                ]}
                onChange={(v) => {
                    NOUI.Form.hand.value_merge({
                        ctrl: d.ctrl,
                        worker(f) {
                            f.project_size = v as any
                        },
                    })
                }}
            />
        </div>
    )
}
