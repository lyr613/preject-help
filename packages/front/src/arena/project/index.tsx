import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { PageConfig } from './config'
import { Rout } from '@/routs'

interface p {
    rout?: string
}
/** , rkey outlet,  */
export default function MainAccess(p: p) {
    if (!p.rout) {
        return <Outlet />
    }
    switch (p.rout) {
        case Rout.target.project.config:
            return <PageConfig />
    }
    return <Outlet />
}
