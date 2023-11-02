//import cssRules from './Tooltip/styles'
import '../../dist/output.css'

import { $, $$, Observable, useEffect } from 'woby'

import type { JSX } from 'woby/jsx-runtime'
import { Tooltip, TooltipType } from './Tooltip'


export const AutoTooltip = <T extends HTMLElement,>({ children, parent, ...properties }: TooltipType & { parent?: Observable<T> } = {}): JSX.Element => {
    const show = $(false)
    useEffect(() => {
        const p = $$(parent)
        if (!p) return

        const on = () => show(true)
        const off = () => show(false)
        p.addEventListener('mouseenter', on)
        p.addEventListener('mouseleave', off)

        return () => {
            p.removeEventListener('mouseenter', on)
            p.removeEventListener('mouseleave', off)
        }
    })
    return <Tooltip show={show} {...properties}>{children}</Tooltip>
}



