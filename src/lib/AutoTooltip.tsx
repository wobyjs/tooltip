//import cssRules from './Tooltip/styles'
import '../../dist/output.css'

import { $, $$, Observable, useEffect, type JSX } from 'woby'
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
    return <Tooltip show={show}
        class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
        {...properties}>{children}</Tooltip>
}



