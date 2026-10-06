import { $, $$, useEffect, Child, useMemo, Observable, ObservableMaybe, jsx, store, defaults, customElement, HtmlString, HtmlBoolean, type ElementAttributes, type JSX } from 'woby'


type _Align = 'start' | 'end' | 'center' | 'bottom' | 'top' | 'right' | 'left'
export type Align = _Align | `v-${_Align}` | `h-${_Align}`
export type Side = 'bottom' | 'top' | 'left' | 'right'

export const isSide = (side: ObservableMaybe<Side>, str: Side) => $$(side) === str
export const isAlign = (align: ObservableMaybe<Align>, str: Align) => $$(align) === str
export const isAlignA = (position, str: string) => $$(position) === str

type TextboxType = {
    // lineSeparated?: boolean | string, position?: string,
    // /** tailwind */
    hoverBackground?: ObservableMaybe<string>, backgroundColor?: ObservableMaybe<string>, arrowAlign?: ObservableMaybe<Align>,
    moveDown?: ObservableMaybe<string>, moveRight?: ObservableMaybe<string>, moveLeft?: ObservableMaybe<string>,
    // moveUp?: string, textAlign?: string, fontFamily?: string, fontWeight?: string, fontSize?: string,
    // /** tailwind */
    color?: ObservableMaybe<string>, animation?: ObservableMaybe<string>, zIndex?: ObservableMaybe<string>, flat?: ObservableMaybe<boolean>, show?: ObservableMaybe<boolean>,
    hoverColor?: ObservableMaybe<string>,
    /** no tailwind */
    textboxWidth?: ObservableMaybe<string>,
    /** no tailwind */
    padding?: ObservableMaybe<string>,
    /** tailwind */
    borderRadius?: ObservableMaybe<string>, shadowColor?: ObservableMaybe<string>, shadowShape?: ObservableMaybe<string>,
    static?: ObservableMaybe<boolean>, alert?: ObservableMaybe<string>,

    hoverArrow: Observable<boolean>,

    arw: ObservableMaybe<Align>,
    pos: {
        side: ObservableMaybe<Side>
        align: ObservableMaybe<Align>
    },
    /** tailwind border-b-*/
    lines: ObservableMaybe<string>,
    move: {
        down: number
        up: number
        left: number
        right: number
    },
    children?: Child,
    cls?: ObservableMaybe<string>,
    class?: ObservableMaybe<string>,
}

const textBoxDefs = () => ({
    // Override and append class contract
    cls: $('') as ObservableMaybe<string>,
    class: $('') as ObservableMaybe<string>,

    // Component-specific props - ALL must use $() for reactivity
    hoverBackground: $('bg-[#ececec]') as ObservableMaybe<string>,
    backgroundColor: $('bg-[white]') as ObservableMaybe<string>,
    hoverColor: $('text-[black]') as ObservableMaybe<string>,
    color: $('text-[black]') as ObservableMaybe<string>,
    textboxWidth: $('150px') as ObservableMaybe<string>,
    padding: $('') as ObservableMaybe<string>,
    borderRadius: $('rounded-[5px]') as ObservableMaybe<string>,
    shadowColor: $('rgba(0,0,0,0.251)') as ObservableMaybe<string>,
    shadowShape: $('0 8px 15px') as ObservableMaybe<string>,
    alert: $('') as ObservableMaybe<string>,
    flat: $(false, HtmlBoolean) as ObservableMaybe<boolean>,
    static: $(false, HtmlBoolean) as ObservableMaybe<boolean>,

    // Internal props passed from parent Tooltip
    hoverArrow: $(false) as Observable<boolean>,
    arw: $('start') as ObservableMaybe<Align>,
    pos: $<{ side: ObservableMaybe<Side>; align: ObservableMaybe<Align> }>({ side: 'bottom', align: 'center' }),
    lines: $('border-b border-b-[#ececec]') as ObservableMaybe<string>,
    move: $<{ down: number; up: number; left: number; right: number }>({ down: 0, up: 0, left: 0, right: 0 }),

    // Children
    children: $<Child>(undefined),
})

export const TextBox = defaults(textBoxDefs, (props) => {
    const {
        arw: arrow,
        pos: position,
        lines: lineSeparated,
        static: tpStatic,
        textboxWidth: width,
        shadowColor: shCol,
        shadowShape: shShape,
        move,
        backgroundColor,
        padding,
        borderRadius,
        hoverBackground,
        hoverColor,
        color,
        alert,
        flat,
        children,
        cls,
        class: className,
        ...rest
    } = props

    const hoverIndex = $<number | null>(null)
    const firstH = $<number | null>(null)
    const lastH = $<number | null>(null)
    const totH = $<number | null>(null)

    const spanHeightsRef = store({})

    store.on(spanHeightsRef, () => {
        const heights = Object.keys(spanHeightsRef)
            .map(key => spanHeightsRef[key].clientHeight)
        const firsth = heights[0]
        const lasth = heights[heights.length - 1]
        const toth = heights.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        totH(toth)
        firstH(firsth)
        lastH(lasth)
    })

    const unsetHover = () => {
        hoverIndex(null)
        props.hoverArrow(false)
    }

    // Set & unset hover state
    const onSpanHover = (index: number, lastIndex: number, numChildren: number) => {
        hoverIndex(index)
        const { static: rctStatic, arw: arrow, pos: position, hoverArrow } = props
        const posVal = $$(position)
        if (!rctStatic &&
            ((index === 0 && (isSide(posVal.side, 'bottom') || isAlignA(arrow, 'v-start'))) ||
                (index === lastIndex && (isSide(posVal.side, 'top') || isAlignA(arrow, 'v-end'))) ||
                numChildren === 1)) {
            return hoverArrow(true)
        }
        return hoverArrow(false)
    }

    const numberChildren = Array.isArray(children) ? children.length : 1
    const lastIndex = numberChildren - 1

    const adjChildren = [children].flat().map((child, index) => {
        const hover = useMemo(() => !$$(tpStatic) && $$(hoverIndex) === index)
        const nhover = useMemo(() => !$$(hover))

        const childProps = {
            ref: span => spanHeightsRef[`span${index + 1}`] = span,
            class: [padding, {
                'whitespace-nowrap': () => $$(width) === 'auto',
                [$$(hoverColor)]: hover,
                [$$(hoverBackground)]: hover,
                [$$(color)]: nhover,
                [$$(backgroundColor)]: nhover,
                [$$(lineSeparated)]: () => ($$(lineSeparated) && lastIndex !== index)
            }],
            onMouseOver: () => onSpanHover(index, lastIndex, numberChildren)
        }
        //@ts-ignore
        return jsx(child, { ...childProps })
    })

    const calcHPos = (align: ObservableMaybe<Align>, left: string, center: string, right: string) => {
        return isAlign(align, 'center')
            ? center : isAlign(align, 'left') ? left : right
    }
    const calcVPos = (perc: number, elHeight: number, divider: number, adjMove: number | null, totHeight?: number | null) => {
        return `calc(${perc}% - ${totHeight ?? 0}px - ${elHeight}px/${divider} + ${adjMove ?? 0}px)`
    }

    const calcTopPos = (align: ObservableMaybe<Align>, elHeight: number | null, totHeight: number | null) => {
        if ($$(align) === 'center') {
            return calcVPos(50, elHeight ?? 0, 2, null, totHeight ?? 0)
        }
        if ($$(align) === 'bottom') {
            return calcVPos(100, elHeight ?? 0, 2, -12, totHeight ?? 0)
        }
        return calcVPos(0, elHeight ?? 0, 2, 12, totHeight ?? 0)
    }

    let left = $('')
    let right = $('')
    let top = $('8px')

    const hLeftPos = useMemo(() => calcHPos($$(position).align, '100% - 50px', '50% - 40px', '0% - 30px'))
    const hRightPos = useMemo(() => calcHPos($$(position).align, '0% - 30px', '50% - 40px', '100% - 50px'))

    useEffect(() => {
        const posVal = $$(position)
        const { align } = posVal
        switch ($$(arrow)) {
            case 'h-start':
                left(`calc(${$$(hRightPos)})`)
                break
            case 'h-end':
                right(`calc(${$$(hLeftPos)})`)
                break
            case 'v-start':
                top(calcTopPos(align, $$(firstH), null))
                break
            case 'v-end':
                top(calcTopPos(align, $$(lineSeparated) ? -($$(lastH) ?? 0) + 1 : -($$(lastH) ?? 0), $$(totH) ?? 0))
                break
            case 'v-center':
                top(`calc(0% - ${$$(totH) ?? 0}px/2 + 11px)`)
                if (isAlign(align, 'center')) {
                    top(`calc(50% - ${$$(totH) ?? 0}px/2)`)
                }
                if (isAlign(align, 'bottom')) {
                    top(`calc(100% - ${$$(totH) ?? 0}px/2 - 11px)`)
                }
                break
            default:
                break
        }

        switch (posVal.side) {
            case 'top':
                top(calcVPos(0, $$(totH) ?? 0, 1, 13))
                break
            case 'left':
                right('8px')
                break
            case 'right':
                left('8px')
                break
            default:
                break
        }
    })

    const textBoxWidthValue = useMemo(() => {
        let textBoxWidthValue: number | string = $$(width)

        if (textBoxWidthValue !== 'auto') {
            textBoxWidthValue = Number($$(width).slice(0, -2))
            const moveVal = $$(move)
            if (moveVal.left > 0) textBoxWidthValue += moveVal.left
            if (moveVal.right > 0) textBoxWidthValue += moveVal.right
        }

        return textBoxWidthValue
    })

    const boxStyle = useMemo(() => ({
        left,
        right,
        top,
        width: textBoxWidthValue,
        borderRadius
    }))

    const shColAdj = useMemo(() => $$(shCol).substr(0, $$(shCol).lastIndexOf(',')).replace(/[)]/g, ','))
    const shadow = useMemo(() => `${$$(shShape)} ${$$(shCol)}, 0 0 3px ${$$(shColAdj)}, 0.1), 0 0 0 1px ${$$(shColAdj)}, 0.15)`)
    const boxShadow = useMemo(() => $$(flat) ? null : $$(shadow))
    const alertStyle = useMemo(() => $$(alert) ? 'rpt-alert' : '')
    const rgb = useMemo(() => $$(alert) || 'rgb(248, 109, 109)')
    const alertShadow = useMemo(() => $$(alert) ? `0 0 0 ${$$(rgb).slice(0, $$(rgb).length - 1)}, 0.4)` : null)
    const noNeg = (number: number) => number > 0 ? number : 0

    const moveVal = $$(move)

    return (
        <div
            class={[`absolute animation-none`, alertStyle, () => $$(cls) ?? $$(className)]}
            style={{
                ...boxStyle,
                boxShadow: alertShadow,
                padding: `${moveVal.down}px ${moveVal.left}px ${moveVal.up}px ${moveVal.right}px`
            }}
            {...rest}
        >
            <div
                class={[`absolute animation-none w-full h-full z-0`, borderRadius]}
                style={{
                    boxShadow,
                    height: () => `calc(100% - ${noNeg(moveVal.down) + noNeg(moveVal.up)}px)`,
                    width: () => `calc(100% - ${noNeg(moveVal.left) + noNeg(moveVal.right)}px)`
                }}
            />
            <div
                class={[`relative z-[2] w-full`, backgroundColor, borderRadius]}
                onMouseLeave={unsetHover}
            >
                <div
                    class={[!tpStatic ? '[&_span]:cursor-pointer w-full' : null, borderRadius, 'overflow-hidden']}>
                    {adjChildren}
                </div>
            </div>
        </div>
    )
})

customElement('woby-text-box', TextBox)

declare module 'woby' {
    namespace JSX {
        interface IntrinsicElements {
            'woby-text-box': ElementAttributes<typeof TextBox>
        }
    }
}
