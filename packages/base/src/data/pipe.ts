type fab<A, B> = (v: A) => B

/**
 *
 * - data, func1, func2, func3...
 * -
 */
export function pipe<T>(data: T): T
export function pipe<T, A>(data: T, funa: fab<T, A>): A
export function pipe<T, A, B>(data: T, funa: fab<T, A>, funb: fab<A, B>): B
export function pipe<T, A, B, C>(data: T, funa: fab<T, A>, funb: fab<A, B>, func: fab<B, C>): C
export function pipe<T, A, B, C, D>(data: T, funa: fab<T, A>, funb: fab<A, B>, func: fab<B, C>, fund: fab<C, D>): D
export function pipe<T, A, B, C, D, E>(
    data: T,
    funa: fab<T, A>,
    funb: fab<A, B>,
    func: fab<B, C>,
    fund: fab<C, D>,
    fune: fab<D, E>,
): E
export function pipe<T, A, B, C, D, E, F>(
    data: T,
    funa: fab<T, A>,
    funb: fab<A, B>,
    func: fab<B, C>,
    fund: fab<C, D>,
    fune: fab<D, E>,
    funf: fab<E, F>,
): E

export function pipe<T, K = T>(data: T, ...funs: Function[]): K {
    const re: any = funs.reduce((pre, fun) => fun(pre), data)
    return re
}

/**
 *
 * - func1, func2, func3...
 * - , , func123...
 */
export function compose<A>(): (data: A) => A
export function compose<T, A>(funa: fab<T, A>): (data: T) => A
export function compose<T, A, B>(funa: fab<T, A>, funb: fab<A, B>): (data: T) => B
export function compose<T, A, B, C>(funa: fab<T, A>, funb: fab<A, B>, func: fab<B, C>): (data: T) => C
export function compose<T, A, B, C, D>(
    funa: fab<T, A>,
    funb: fab<A, B>,
    func: fab<B, C>,
    fund: fab<C, D>,
): (data: T) => D
export function compose<T = any>(...funs: Function[]) {
    return (data: T) => {
        const re: any = funs.reduce((pre, fun) => fun(pre), data)
        return re
    }
}
