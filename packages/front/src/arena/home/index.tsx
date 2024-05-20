import { Util } from '@/util'
import { useEffect, useState } from 'react'
import * as d from './dv'
import { BlockGroups } from './block-groups'
import { BlockHead } from './block-head'

export default function Home() {
    useEffect(() => {
        d.load_projects()
    }, [])
    return (
        <div className=" ">
            <BlockHead />

            <BlockGroups />
            <div className="h-8"></div>
        </div>
    )
}
