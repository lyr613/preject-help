import ModuleHome from '@/arena/home'
import ModuleProject from '@/arena/project'
import { useEffect, useState } from 'react'
import { HashRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { Rout } from './routs'

function App() {
    useEffect(() => {
        const themes = ['', 'theme-orange', 'theme-red', 'theme-purple']
        const i = (Math.random() * themes.length) | 0
        document.body.className = themes[i]
    }, [])
    return (
        <HashRouter>
            <RouteBox />
        </HashRouter>
    )
}

function RouteBox() {
    const navi = useNavigate()
    useEffect(() => {
        const ob = Rout._dev.goto$.subscribe((cfg) => {
            if ('deep' in cfg) {
                navi(cfg.deep)
            } else {
                navi(cfg.to, {
                    replace: cfg.replace,
                })
            }
        })
        return () => ob.unsubscribe()
    }, [])
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route path={Rout._dev.l1.project} element={<ModuleProject />}>
                    {Object.values(Rout.target.project).map((target) => (
                        <Route key={target} path={target} element={<ModuleProject rout={target} />} />
                    ))}
                </Route>
                <Route index element={<ModuleHome />} />
                <Route path="*" element={<ModuleHome />} />
            </Route>
        </Routes>
    )
}

export default App
