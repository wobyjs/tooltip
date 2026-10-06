
import { $, $$, Observable, useEffect, defaults, customElement, HtmlString, HtmlBoolean, type ElementAttributes, type JSX, type Child, type ObservableMaybe } from 'woby'
import { Tooltip, TooltipType } from './Tooltip'
import { Align } from './TextBox'

const autoTooltipDefs = () => ({
    cls: $('') as ObservableMaybe<string>,
    class: $('') as ObservableMaybe<string>,
    parent: $<HTMLElement>() as Observable<HTMLElement>,
    children: $<Child>(undefined),
    // Include all TooltipType props
    lineSeparated: $<boolean | string>('border-b border-b-[#ececec]') as ObservableMaybe<boolean | string>,
    position: $('bottom center', HtmlString) as ObservableMaybe<string>,
    hoverBackground: $('bg-[#ececec]', HtmlString) as ObservableMaybe<string>,
    hoverColor: $('text-[black]', HtmlString) as ObservableMaybe<string>,
    backgroundColor: $('bg-[white]', HtmlString) as ObservableMaybe<string>,
    textboxWidth: $('150px', HtmlString) as ObservableMaybe<string>,
    fontSize: $('[font-size:inherit]', HtmlString) as ObservableMaybe<string>,
    color: $('text-inherit', HtmlString) as ObservableMaybe<string>,
    borderRadius: $('rounded-[5px]', HtmlString) as ObservableMaybe<string>,
    shadowColor: $('rgba(0,0,0,0.251)', HtmlString) as ObservableMaybe<string>,
    shadowShape: $('0 8px 15px', HtmlString) as ObservableMaybe<string>,
    moveDown: $('0px', HtmlString) as ObservableMaybe<string>,
    moveRight: $('0px', HtmlString) as ObservableMaybe<string>,
    moveLeft: $('0px', HtmlString) as ObservableMaybe<string>,
    moveUp: $('0px', HtmlString) as ObservableMaybe<string>,
    arrowAlign: $<Align>('start') as ObservableMaybe<Align>,
    textAlign: $('left', HtmlString) as ObservableMaybe<string>,
    fontFamily: $('inherit', HtmlString) as ObservableMaybe<string>,
    fontWeight: $('bold', HtmlString) as ObservableMaybe<string>,
    zIndex: $('100', HtmlString) as ObservableMaybe<string>,
    animation: $('') as ObservableMaybe<string>,
    flat: $(false, HtmlBoolean) as ObservableMaybe<boolean>,
    show: $(false, HtmlBoolean) as ObservableMaybe<boolean>,
    static: $(false, HtmlBoolean) as ObservableMaybe<boolean>,
    alert: $('') as ObservableMaybe<string>,
})

export const AutoTooltip = defaults(autoTooltipDefs, (props) => {
    const { parent, children, cls, class: className, show: showProp, ...rest } = props
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
        {...rest}>{children}</Tooltip>
})

customElement('woby-auto-tooltip', AutoTooltip)

declare module 'woby' {
    namespace JSX {
        interface IntrinsicElements {
            'woby-auto-tooltip': ElementAttributes<typeof AutoTooltip>
        }
    }
}
