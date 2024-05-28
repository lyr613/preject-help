import { useEffect } from 'react'
import { BlockGroups } from './block-groups'
import { BlockHead } from './block-head'
import * as d from './dv'

export default function ModuleHome() {
    useEffect(() => {
        d.load_projects()
    }, [])
    return (
        <div className="">
            <BlockHead />

            <BlockGroups />
            <div className="h-8"></div>
        </div>
    )
}
