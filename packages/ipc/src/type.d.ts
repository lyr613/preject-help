import type { test_re } from './test'
declare global {
    namespace IPCtype {
        interface Q {
            search: Record<string, any>
            data: any
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
            // #region 打开文件夹
            type test = {
                search: {
                    flag: 'test'
                }
                data: R<test_re>
            }
        }
    }
}
