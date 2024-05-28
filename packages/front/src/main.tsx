import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './style'
import React from 'react'

document.getElementById('root')!.innerHTML = ''
ReactDOM.createRoot(document.getElementById('root') as HTMLElement, {}).render(<App />)
