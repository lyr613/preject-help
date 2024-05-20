import { Util } from '@/util'
import { useState } from 'react'
import * as d from './dv'
import { BlockGroups } from './block-groups'

export default function Home() {
    return (
        <div className=" ">
            <div
                className="flex w-min cursor-pointer select-none border border-solid border-black px-2 py-1 text-base"
                onClick={() => {
                    d.load_projects()
                }}
            >
                test
            </div>
            <BlockGroups />
            <div className="h-8"></div>
        </div>
    )
}
