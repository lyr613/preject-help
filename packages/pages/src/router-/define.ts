export type router1_vo = 'some'

interface rt<t> {
    en: t
    cn: string
}

export function router1(): { [k in router1_vo]: rt<k> } {
    return {
        some: {
            en: 'some',
            cn: '路由',
        },
    }
}

// 2级
export type router2_some_vo = 'show'
export function router2_some(): { [k in router2_some_vo]: rt<k> } {
    return {
        show: {
            en: 'show',
            cn: '查看',
        },
    }
}
