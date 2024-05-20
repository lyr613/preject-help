import React, { useEffect } from 'react'
import { HashRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { Rout } from './routs'
import { Util } from './util'
const LazyHome = React.lazy(() => import('@/arena/home'))

function App() {
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
                {/* <Route
                    path={Rout._dev.l1.guzhi}
                    element={
                        <React.Suspense fallback={null}>
                            <LazyHome />
                        </React.Suspense>
                    }
                >
                    {Object.values(Rout.target.guzhi).map((target) => (
                        <Route key={target} path={target} element={<LazyHome target={target} />} />
                    ))}
                </Route> */}
                <Route
                    index
                    element={
                        <React.Suspense fallback={null}>
                            <LazyHome />
                        </React.Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <React.Suspense fallback={null}>
                            <LazyHome />
                        </React.Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}

export default App
