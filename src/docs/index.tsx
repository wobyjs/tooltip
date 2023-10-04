import { useEffect, $ } from 'voby'
import { render } from 'voby'
// eslint-disable-next-line
// import Prism from 'prismjs'

import { Header } from './Content/Header'
import { SideNav } from './Content/SideNav'
import { Intro } from './Content/Intro'
import { BasicUsage } from './Content/BasicUsage'
import { AdvancedUsage } from './Content/AdvancedUsage'
import { Examples } from './Content/Examples'
import { Api } from './Content/Api'

import '../../dist/output.css'
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
    const codeBlockRef = $()
    useEffect(() => {
        if (codeBlockRef)
            Prism.highlightAll()
    })
    // usePrismHighlight(codeBlockRef)
    return <div class="flexContainer">
        <Header />
        <div class="content">
            <div class="side">
                <SideNav />
            </div>
            <div ref={codeBlockRef} class="main">
                <section id="install"><Intro /></section>
                <section id="basic"><BasicUsage /></section>
                <section id="examples"><Examples /></section>
                <section id="advanced"><AdvancedUsage /></section>
                <section id="api"><Api /></section>
            </div>
        </div>
    </div>
}

render(<Demo />, document.getElementById('app'))
