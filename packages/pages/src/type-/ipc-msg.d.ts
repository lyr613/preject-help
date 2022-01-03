interface msg_dto<T = any> {
    b: boolean
    /** 错误时为原因 */
    txt: string
    /** 错误时可能没有 */
    data: T
}
