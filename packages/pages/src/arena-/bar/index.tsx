import React, { useState, useEffect } from 'react'
import { Rt } from 'router-'
import style from './style.module.scss'

/** Some */
export default function Bar() {
    return (
        <div className={style.Bar}>
            <button
                onClick={() => {
                    Rt.next('home')
                }}
            >
                项目
            </button>
            <button
                onClick={() => {
                    Rt.next('tran')
                }}
            >
                转换
            </button>
        </div>
    )
}
