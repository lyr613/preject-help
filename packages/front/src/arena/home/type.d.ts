import { path } from '@/routs/define'

export type Size = 'small' | 'middle' | 'big'

export interface datas {
    groups: IPCtype.querys.project_finds['result']['data']
    project_size: Size
}
