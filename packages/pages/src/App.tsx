import Home from 'arena-/home'
import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import { Rt } from 'router-'
import { SubHotKey } from 'subject-/hot-key'

function App() {
    useEffect(() => {
        const ob = SubHotKey.sub_app_hot_key()
        // setTimeout(() => {
        //     SubOption.load()
        // }, 0)

        return () => {
            ob.unsubscribe()
        }
    }, [])
    return (
        <div className="App">
            <HashRouter>
                <Routebox />
            </HashRouter>
        </div>
    )
}

function Routebox() {
    const rt = useHistory()
    useEffect(() => {
        const ob = Rt.pusher$.subscribe((next) => {
            const cur = rt.location.pathname
            if (next !== cur) {
                rt.push(next)
            }
        })
        return () => {
            ob.unsubscribe()
        }
    }, [rt])
    return (
        <Switch>
            <Route component={Home} />
        </Switch>
    )
}

export default App
