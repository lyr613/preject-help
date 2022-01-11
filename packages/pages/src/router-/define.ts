export type router1_vo = 'home' | 'tran'

interface rt<t> {
    en: t
    cn: string
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
