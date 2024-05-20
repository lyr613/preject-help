import { path } from '@/routs/define'

export interface datas {
    groups: IPCtype.querys.project_finds['result']['data']
    project_size: 'small' | 'middle' | 'big'
}
