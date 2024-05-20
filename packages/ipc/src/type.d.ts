import { project } from './projects'
import type { test_re } from './test'
declare global {
    namespace IPCtype {
        interface Q {
            search: Record<string, any>
            result: any
        }
        type R<Data> = {
            /** 错误且msg不够用了才用到 */
            code: number
            /** 简单返回提示 */
            msg: string
            data: Data
            success: boolean
        }
        type _TEMP = {
            search: {
                flag: '_TEMP'
                other: any
            }
            result: R<any>
        }
        namespace querys {
            // #region test
            type test = {
                search: {
                    flag: 'test'
                }
                result: R<test_re>
            }
            type project_finds = {
                search: {
                    flag: 'project_finds'
                    root_paths: string[]
                }
                result: R<
                    {
                        group_name: string
                        group_fspath: string
                        projects: project[]
                    }[]
                >
            }
            type project_open = {
                search: {
                    flag: 'project_open'
                    fspath: string
                    open_children: boolean
                    vscode: boolean
                }
                result: R<boolean>
            }
        }
    }
}
