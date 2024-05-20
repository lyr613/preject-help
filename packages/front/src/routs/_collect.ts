import { goto$ } from './go'
import { l1 } from './define'

export { go, replace, back } from './go'
export { target } from './define'

/** 开发 */
export const _dev = {
    /** 1级模块 */
    l1,
    /** 路由通信 */
    goto$,
}
