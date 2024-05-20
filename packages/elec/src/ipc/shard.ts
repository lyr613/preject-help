import { Util } from '@/util'
import { reply } from './util'
import fs from 'node:fs'
import path from 'node:path'
import { app, shell } from 'electron'

/** 合约日k */
export function show_data_dir() {
    const src = ''
    // 在资源管理器展示这个src
    shell.showItemInFolder(src)
}
