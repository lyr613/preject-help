import { Util } from '@/util'
import { DndContext } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import React, { useContext, useEffect, useMemo } from 'react'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { HolderOutlined } from '@ant-design/icons'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import { Rout } from '@/routs'

export function PageConfig() {
    const [dataSource, setDataSource] = React.useState<DataType[]>([])

    useEffect(() => {
        setDataSource(Util.caches.groups.load().map((fspath) => ({ fspath, key: fspath })))
    }, [])

    return (
        <div className={'text-base'} key="page-config">
            <div className="flex space-x-4 px-6 py-2">
                <Button
                    type={'primary'}
                    onClick={() => {
                        Util.elec
                            .query_once$<IPCtype.querys.project_pick>({
                                flag: 'project_pick',
                            })
                            .subscribe((r) => {
                                const src = r.data
                                if (!src) {
                                    return
                                }
                                const li = Util.caches.groups.load()
                                if (li.find((v) => v === src)) {
                                    return
                                }
                                li.push(src)
                                Util.caches.groups.save(li)
                                setDataSource(li.map((fspath) => ({ fspath, key: fspath })))
                            })
                    }}
                >
                    添加
                </Button>
                <Button
                    onClick={() => {
                        console.log('dataSource', dataSource)
                        const li = dataSource.map((v) => v.fspath)
                        Util.caches.groups.save(li)
                    }}
                >
                    保存
                </Button>

                <Button
                    onClick={() => {
                        const li = Util.caches.groups.load()
                        setDataSource(li.map((fspath) => ({ fspath, key: fspath })))
                    }}
                >
                    刷新
                </Button>
                <Button
                    onClick={() => {
                        Rout.go(Rout.target.shard.home)
                    }}
                >
                    返回
                </Button>
            </div>
            <div className="mx-10">
                <DndContext
                    modifiers={[restrictToVerticalAxis]}
                    onDragEnd={({ active, over }: DragEndEvent) => {
                        if (active.id !== over?.id) {
                            setDataSource((prevState) => {
                                const activeIndex = prevState.findIndex((record) => record.fspath === active?.id)
                                const overIndex = prevState.findIndex((record) => record.fspath === over?.id)
                                return arrayMove(prevState, activeIndex, overIndex)
                            })
                        }
                    }}
                >
                    <SortableContext items={dataSource.map((v) => v.key)} strategy={verticalListSortingStrategy}>
                        <Table<DataType>
                            rowKey="key"
                            components={{ body: { row: Row } }}
                            columns={[
                                { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
                                { title: '路径', dataIndex: 'fspath' },
                                {
                                    title: '删除',
                                    render(value, record, index) {
                                        return (
                                            <Button
                                                onClick={() => {
                                                    const li = Util.caches.groups.load()
                                                    const li2 = li.filter((v) => v !== record.fspath)
                                                    Util.caches.groups.save(li2)
                                                    setDataSource(li2.map((fspath) => ({ fspath, key: fspath })))
                                                }}
                                            >
                                                删除
                                            </Button>
                                        )
                                    },
                                },
                            ]}
                            dataSource={dataSource}
                            pagination={false}
                        />
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    )
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string
}

const Row: React.FC<RowProps> = (props) => {
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
        id: props['data-row-key'],
    })

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
        transition,
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    }

    const contextValue = useMemo<RowContextProps>(
        () => ({ setActivatorNodeRef, listeners }),
        [setActivatorNodeRef, listeners],
    )

    return (
        <RowContext.Provider value={contextValue}>
            <tr {...props} ref={setNodeRef} style={style} {...attributes} />
        </RowContext.Provider>
    )
}

interface DataType {
    key: string
    fspath: string
}

interface RowContextProps {
    setActivatorNodeRef?: (element: HTMLElement | null) => void
    listeners?: SyntheticListenerMap
}
const RowContext = React.createContext<RowContextProps>({})

const DragHandle: React.FC = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext)
    return (
        <Button
            type="text"
            size="small"
            icon={<HolderOutlined />}
            style={{ cursor: 'move' }}
            ref={setActivatorNodeRef}
            {...listeners}
        />
    )
}

const columns: ColumnsType<DataType> = [
    { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
    { title: '路径', dataIndex: 'fspath' },
    {
        title: '删除',
        render(value, record, index) {
            return (
                <Button
                    onClick={() => {
                        const li = Util.caches.groups.load()
                        const li2 = li.filter((v) => v !== record.fspath)
                        Util.caches.groups.save(li2)
                    }}
                >
                    删除
                </Button>
            )
        },
    },
]
