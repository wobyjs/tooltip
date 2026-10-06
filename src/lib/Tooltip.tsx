import { $$, $, useEffect, ObservableMaybe, Observable, isObservable, useMemo, defaults, customElement, HtmlString, HtmlBoolean, type ElementAttributes, type JSX, type Child } from 'woby'

import { Align, Side, TextBox, isSide } from './TextBox'
import { Arrow } from './Arrow'


export type TooltipType = {
    /** tailwind
    * border-b border-b-[#ececec]
    */
    lineSeparated?: ObservableMaybe<boolean | string>, position?: ObservableMaybe<string>,
    /** tailwind */
    hoverBackground?: ObservableMaybe<string>,
    /** tailwind */
    backgroundColor?: ObservableMaybe<string>,
    arrowAlign?: ObservableMaybe<Align>, moveDown?: ObservableMaybe<string>,
    moveRight?: ObservableMaybe<string>, moveLeft?: ObservableMaybe<string>,
    moveUp?: ObservableMaybe<string>, textAlign?: ObservableMaybe<string>, fontFamily?: ObservableMaybe<string>, fontWeight?: ObservableMaybe<string>,
    /** tailwind */
    fontSize?: ObservableMaybe<string>,
    /** tailwind */
    color?: ObservableMaybe<string>, animation?: ObservableMaybe<string>, zIndex?: ObservableMaybe<string>, flat?: ObservableMaybe<boolean>, show?: ObservableMaybe<boolean>,
    /** tailwind */
    hoverColor?: ObservableMaybe<string>,
    /** no tailwind */
    textboxWidth?: ObservableMaybe<string>,
    /** tailwind */
    padding?: ObservableMaybe<string>,
    /** tailwind */
    borderRadius?: ObservableMaybe<string>, shadowColor?: ObservableMaybe<string>, shadowShape?: ObservableMaybe<string>,
    static?: ObservableMaybe<boolean>, alert?: ObservableMaybe<string>,
    children?: JSX.Element,
    cls?: ObservableMaybe<string>,
    class?: ObservableMaybe<string>,
}

const tooltipDefs = () => ({
    // Override and append class contract
    cls: $('') as ObservableMaybe<string>,
    class: $('') as ObservableMaybe<string>,

    // Component-specific props - ALL must use $() for reactivity
    lineSeparated: $<boolean | string>('border-b border-b-[#ececec]') as ObservableMaybe<boolean | string>,
    position: $('bottom center', HtmlString) as ObservableMaybe<string>,
    hoverBackground: $('bg-[#ececec]', HtmlString) as ObservableMaybe<string>,
    hoverColor: $('text-[black]', HtmlString) as ObservableMaybe<string>,
    backgroundColor: $('bg-[white]', HtmlString) as ObservableMaybe<string>,
    textboxWidth: $('150px', HtmlString) as ObservableMaybe<string>,
    fontSize: $('[font-size:inherit]', HtmlString) as ObservableMaybe<string>,
    color: $('text-[black]', HtmlString) as ObservableMaybe<string>,
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

    // Parent ref and parent element
    parentRef: $<HTMLElement>() as Observable<HTMLElement>,
    parent: $<JSX.Element>() as ObservableMaybe<JSX.Element>,
    containerClass: $('') as ObservableMaybe<string>,

    // Children
    children: $<Child>(undefined),
})

export const Tooltip = defaults(tooltipDefs, (props) => {
    const {
        lineSeparated: lines,
        position: pos,
        arrowAlign: arwAlign,
        hoverBackground,
        backgroundColor,
        moveDown,
        moveRight,
        moveLeft,
        moveUp,
        textAlign,
        fontFamily,
        fontWeight,
        fontSize,
        color,
        zIndex,
        animation,
        flat,
        parentRef: pf,
        parent: Parent,
        containerClass,
        show: showProp,
        cls,
        class: className,
        children,
        ...rest
    } = props

    // Derive show observable - use showProp if it's observable, otherwise create new
    const show = isObservable(showProp) ? showProp : $(showProp)
    const parentRef = (isObservable(pf) ? pf : $(pf)) as Observable<HTMLElement | undefined>

    useEffect(() => {
        const p = $$(parentRef)
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

    const hoverArrow = $(false)
    const mount = $(true)

    useEffect(() => {
        if ($$(show)) mount(true)
        if (!$$(animation)) mount(false)
    })

    // Sets if false no line; if true default line; if string custom line;
    const lineSeparated: Observable<string> = typeof ($$(lines)) === 'boolean'
        ? $('border-b border-b-[#ececec]') : (isObservable(lines) ? lines : $(lines)) as Observable<string>

    // Make position reactive using useMemo
    const position = useMemo(() => ({
        side: $$(pos).split(' ')[0] as Side,
        align: $$(pos).split(' ')[1] as Align,
    }))

    const arrow = $($$(arwAlign))

    const classes = useMemo(() => {
        const baseClasses = ['absolute', 'flex']
        const side = $$(position).side
        const align = $$(position).align

        switch (side) {
            case 'bottom':
                baseClasses.push('top-full', 'left-0', 'w-full', 'justify-center')
                break
            case 'top':
                baseClasses.push('left-0', 'w-full', 'justify-center')
                break
            case 'right':
                baseClasses.push('top-0', 'left-full', 'h-full', 'justify-start')
                break
            default:
                baseClasses.push('top-0', 'right-full', 'h-full', 'justify-end')
                break
        }

        const onAxis = {
            y: isSide(side, 'top') || isSide(side, 'bottom'),
            x: isSide(side, 'left') || isSide(side, 'right')
        }

        const num = (str: string) => Number(str.slice(0, -2))
        const move = {
            down: num($$(moveDown)),
            up: num($$(moveUp)),
            left: num($$(moveLeft)),
            right: num($$(moveRight))
        }

        const oneMovePropIsNeg = move.down < 0 || move.up < 0
            || move.left < 0 || move.right < 0

        switch (align) {
            case 'left':
                if (onAxis.y) baseClasses.push('!justify-start')
                break
            case 'right':
                if (onAxis.y) baseClasses.push('!justify-end')
                break
            case 'bottom':
                if (onAxis.x) baseClasses.push('items-end')
                break
            case 'top':
                break
            default:
                if (onAxis.x) {
                    baseClasses.push('items-center')
                }
                break
        }

        return baseClasses.join(' ')
    })

    const tooltipStyle = useMemo(() => {
        const side = $$(position).side
        const align = $$(position).align

        const num = (str: string) => Number(str.slice(0, -2))
        const move = {
            down: num($$(moveDown)),
            up: num($$(moveUp)),
            left: num($$(moveLeft)),
            right: num($$(moveRight))
        }

        const oneMovePropIsNeg = move.down < 0 || move.up < 0
            || move.left < 0 || move.right < 0

        const adjustment = `${move.down}px ${move.left}px ${move.up}px ${move.right}px`

        return {
            zIndex: $$(zIndex),
            color: $$(color),
            bottom: side === 'top' ? '100%' : undefined,
            fontSize: $$(fontSize),
            textAlign: $$(textAlign),
            fontFamily: $$(fontFamily),
            fontWeight: $$(fontWeight),
            padding: oneMovePropIsNeg ? null : adjustment,
            margin: oneMovePropIsNeg ? adjustment : null,
            animation: $$(show) ? `rpt-${$$(animation)} 0.2s` : `rpt-${$$(animation)}-out 0.15s`
        }
    })

    const num = (str: string) => Number(str.slice(0, -2))
    const move = useMemo(() => ({
        down: num($$(moveDown)),
        up: num($$(moveUp)),
        left: num($$(moveLeft)),
        right: num($$(moveRight))
    }))

    // Update arrow based on position
    useEffect(() => {
        const side = $$(position).side
        const onAxis = {
            y: isSide(side, 'top') || isSide(side, 'bottom'),
            x: isSide(side, 'left') || isSide(side, 'right')
        }
        arrow((onAxis.y ? `h-${$$(arrow)}` : `v-${$$(arrow)}`) as Align)
    })

    const e = useMemo(() => ((!$$(animation) && $$(show) && $$(children)) || ($$(show) && $$(mount)) && $$(children)) ? (
        <div
            class={classes}
            style={tooltipStyle}
            onAnimationEnd={() => { if (!$$(show) && $$(animation)) mount(false) }}
        >
            <div class='flex justify-center'>
                <Arrow
                    isHovered={hoverArrow}
                    hovBkg={hoverBackground}
                    bkgCol={backgroundColor}
                    flat={flat}
                />
                <TextBox
                    {...props}
                    hoverArrow={hoverArrow}
                    lines={lineSeparated}
                    pos={position}
                    arw={arrow as any}
                    move={move}
                />
            </div>
        </div>
    ) : null
    )

    return useMemo(() => $$(Parent) ? <div class={[() => $$(cls) ?? $$(containerClass) ?? 'relative', className]} ref={parentRef}>{Parent}{e}</div> : e)
})

customElement('woby-tooltip-lib', Tooltip)

declare module 'woby' {
    namespace JSX {
        interface IntrinsicElements {
            'woby-tooltip-lib': ElementAttributes<typeof Tooltip>
        }
    }
}
