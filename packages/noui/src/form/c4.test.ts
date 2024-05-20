import dayjs from 'dayjs'
import { hand, make } from './index'
import { get, set } from 'lodash-es'

interface D {
    num: number
    str: string
    str_li: string[]
    day_li: (null | dayjs.Dayjs)[]
    obj1: {
        key1: string
        key2: number[]
        key3: {
            key4: null
            key5: undefined[]
            key6: {
                key7: string
                key8: number[]
                key9: {
                    key10: string
                    key11: number[]
                }
            }
        }[]
    }
}

function mk_data(): D {
    return {
        num: 1,
        str: 'str',
        str_li: ['str0', 'str1'],
        day_li: [null, dayjs()],
        obj1: {
            key1: 'key1',
            key2: [1, 2],
            key3: [
                {
                    key4: null,
                    key5: [undefined, undefined],
                    key6: {
                        key7: 'key7-1',
                        key8: [3, 4],
                        key9: {
                            key10: 'key10-1',
                            key11: [5, 6],
                        },
                    },
                },
                {
                    key4: null,
                    key5: [undefined, undefined],
                    key6: {
                        key7: 'key7-2',
                        key8: [33, 44],
                        key9: {
                            key10: 'key10-2',
                            key11: [55, 66],
                        },
                    },
                },
            ],
        },
    }
}

// #region value
test('ctrl4 value', () => {
    const ctrl = make(mk_data)
    hand.value_merge({
        ctrl,
        worker(f) {
            f.obj1.key3[0].key6.key9.key10 = '10'
            f.day_li[1] = dayjs('2024-01-02 01:02:03')
        },
    })
    expect(ctrl.value$.value.num).toBe(1)
    expect(ctrl.value$.value.obj1.key3[0].key6.key9.key10).toBe('10')
    expect(ctrl.value$.value.day_li[1]!.format('YYYY-MM-DD')).toBe('2024-01-02')
})

// #region filter
test('ctrl4 filter', () => {
    const ctrl = make(mk_data)
    // filter
    hand.filter_set({
        ctrl,
        path: 'str',
        cook(raw, f) {
            return raw.slice(0, 2)
        },
    })
    hand.value_merge({
        ctrl,
        worker(f) {
            f.str = 'qqqqqqqq'
        },
    })
    expect(get(ctrl.value$.value, ctrl.path('str', [1]))).toBe('qq')
})

// #region sub
test('ctrl4 sub', () => {
    const ctrl = make(mk_data)
    hand.sub_value_getter$({
        ctrl,
        getter(f) {
            return f.obj1.key3[1].key6.key9.key10
        },
    }).subscribe((v) => {
        expect(v).toBe('key10-2')
    })
    hand.sub_path$({
        ctrl,
        path: ctrl.path('obj1.key3.0.key6.key9.key11'),
    }).subscribe((o) => {
        expect(o.disabled).toBe(false)
        expect(o.required).toBe(false)
        expect(o.has_err).toBe(false)
        expect(o.value).toEqual([5, 6])
    })
})
