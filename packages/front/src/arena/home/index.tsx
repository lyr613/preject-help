import { Util } from '@/util'
import { useState } from 'react'
import * as d from './dv'
import { BlockGroups } from './block-groups'
import { BlockHead } from './block-head'

export default function Home() {
    return (
        <div className=" ">
            <BlockHead />

            <BlockGroups />
            <div className="h-8"></div>
        </div>
    )
}
