import React, { useEffect, useRef } from 'react'
import { render } from 'react-dom'
// eslint-disable-next-line
import Prism from 'prismjs'

import { Header } from './Content/Header'
import { SideNav } from './Content/SideNav'
import { Intro } from './Content/Intro'
import { BasicUsage } from './Content/BasicUsage'
import { AdvancedUsage } from './Content/AdvancedUsage'
import { Examples } from './Content/Examples'
import { Api } from './Content/Api'

import './styles.css'
import './prism.css'

// const usePrismHighlight = (codeBlockRef) => {
//     useEffect(() => {
//         if (codeBlockRef.current) {
//             Prism.highlightElement(codeBlockRef.current)
//         }
//     }, [codeBlockRef])
// }

export const Demo = () => {
    const codeBlockRef = useRef()
    useEffect(() => {
        if (codeBlockRef.current)
            Prism.highlightAll()
    }, [codeBlockRef])
    // usePrismHighlight(codeBlockRef)
    return (
        <div className="flexContainer">
            <Header />
            <div className="content">
                <div className="side">
                    <SideNav />
                </div>
                <div ref={codeBlockRef} className="main">
                    <section id="install"><Intro /></section>
                    <section id="basic"><BasicUsage /></section>
                    <section id="examples"><Examples /></section>
                    <section id="advanced"><AdvancedUsage /></section>
                    <section id="api"><Api /></section>
                </div>
            </div>
        </div>
    )
}

render(<Demo />, document.getElementById('app'))
