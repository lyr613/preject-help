import { Util } from '@/util'
import { useState } from 'react'

export default function Home() {
    const [re, next_re] = useState('')
    return (
        <div className="m-6 text-base">
            home
            <div
                className="flex w-min cursor-pointer select-none border border-solid border-black px-2 py-1"
                onClick={() => {
                    Util.elec
                        .query_once$<IPCtype.querys.test>({
                            flag: 'test',
                        })
                        .subscribe((r) => {
                            console.log(r)
                            next_re(JSON.stringify(r, null, 4))
                        })
                }}
            >
                test
            </div>
            <div className="mt-2 whitespace-pre text-base">{re}</div>
        </div>
    )
}
