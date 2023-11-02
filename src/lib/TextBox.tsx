import { $, $$, useEffect, cloneElement, Child, useMemo, Observable, ObservableMaybe, jsx, getMeta, store, type JSX } from 'woby'


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

    hoverArrow: Observable<boolean>

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
    children?: Child

}


export const TextBox = (props: TextboxType): JSX.Element => {
    const hoverIndex = $<number>(null)
    const firstH = $<number>(null)
    const lastH = $<number>(null)
    const totH = $<number>(null)

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
        if (!rctStatic &&
            ((index === 0 && (isSide(position.side, 'bottom') || isAlignA(arrow, 'v-start'))) ||
                (index === lastIndex && (isSide(position.side, 'top') || isAlignA(arrow, 'v-end'))) ||
                numChildren === 1)) {
            return hoverArrow(true)
        }
        return hoverArrow(false)
    }

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
        children
    } = props

    const numberChildren = Array.isArray(children) ? children.length : 1
    const lastIndex = numberChildren - 1

    const adjChildren = [children].flat().map((child, index) => {
        const hover = useMemo(() => !tpStatic && $$(hoverIndex) === index)
        const nhover = useMemo(() => !$$(hover))

        //     whiteSpace: undefined,
        //     color: undefined,
        //     borderBottom: undefined,
        // }


        // if (!tpStatic && $$(hoverIndex) === index) {
        //     class.push(hoverColor)
        //     class.push(hoverBackground)
        // } else {
        //     class.push(color)
        //     class.push(backgroundColor)
        // }

        const style = { borderBottom: () => ($$(lineSeparated) && lastIndex !== index) ? $$(lineSeparated) : undefined }

        const childProps = {
            // ...child.props,
            ref: span => spanHeightsRef[`span${index + 1}`] = span,
            class: [padding, {
                'whitespace-nowrap': () => $$(width) === 'auto', [$$(hoverColor)]: hover, [$$(hoverBackground)]: hover, [$$(color)]: nhover,
                [$$(backgroundColor)]: nhover,
                [$$(lineSeparated)]: () => ($$(lineSeparated) && lastIndex !== index)
            },],
            // style,
            onMouseOver: () => onSpanHover(index, lastIndex, numberChildren)
        }
        return cloneElement(child, childProps)
    })
    const calcHPos = (align: ObservableMaybe<Align>, left: string, center: string, right: string) => {
        return isAlign(align, 'center')
            ? center : isAlign(align, 'left') ? left : right
    }
    const calcVPos = (perc: number, elHeight: number, divider: number, adjMove: number, totHeight?: number) => {
        return `calc(${perc}% - ${totHeight || 0}px - ${elHeight}px/${divider} + ${adjMove || 0}px)`
    }
    // TODO: REfactor
    const calcTopPos = (align: ObservableMaybe<Align>, elHeight: number, totHeight: number) => {
        if ($$(align) === 'center') {
            return calcVPos(50, elHeight, 2, null, totHeight)
        }
        if ($$(align) === 'bottom') {
            return calcVPos(100, elHeight, 2, -12, totHeight)
        }
        return calcVPos(0, elHeight, 2, 12, totHeight)
    }

    let left = $('')
    let right = $('')
    let top = $('8px')
    // Align: left, center, right
    const hLeftPos = useMemo(() => calcHPos(position.align, '100% - 50px', '50% - 40px', '0% - 30px'))
    const hRightPos = useMemo(() => calcHPos(position.align, '0% - 30px', '50% - 40px', '100% - 50px'))

    useEffect(() => {
        const { align } = position
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
                top(calcTopPos(align, $$(lineSeparated) ? -$$(lastH) + 1 : -$$(lastH), $$(totH)))
                break
            case 'v-center':
                top(`calc(0% - ${$$(totH)}px/2 + 11px)`)
                if (isAlign(align, 'center')) {
                    top(`calc(50% - ${$$(totH)}px/2)`)
                }
                if (isAlign(align, 'bottom')) {
                    top(`calc(100% - ${$$(totH)}px/2 - 11px)`)
                }
                break
            default:
                break
        }

        switch ($$(position.side)) {
            case 'top':
                top(calcVPos(0, $$(totH), 1, 13))
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
            if (move.left > 0) textBoxWidthValue += move.left
            if (move.right > 0) textBoxWidthValue += move.right
        }

        return textBoxWidthValue
    })

    const boxStyle = {
        left,
        right,
        top,
        width: textBoxWidthValue,
        borderRadius
    }

    const shColAdj = useMemo(() => $$(shCol).substr(0, $$(shCol).lastIndexOf(',')).replace(/[)]/g, ','))
    const shadow = useMemo(() => `${$$(shShape)} ${$$(shCol)}, 0 0 3px ${$$(shColAdj)}, 0.1), 0 0 0 1px ${$$(shColAdj)}, 0.15)`)
    const boxShadow = useMemo(() => $$(flat) ? null : $$(shadow))
    const alertStyle = useMemo(() => $$(alert) ? 'rpt-alert' : '')
    const rgb = useMemo(() => $$(alert) || 'rgb(248, 109, 109)')
    const alertShadow = useMemo(() => $$(alert) ? `0 0 0 ${$$(rgb).slice(0, $$(rgb).length - 1)}, 0.4)` : null)
    const noNeg = (number: number) => number > 0 ? number : 0

    return (
        <div
            class={[`absolute animation-none`, alertStyle]}
            style={{
                ...boxStyle,
                boxShadow: alertShadow,
                padding: `${move.down}px ${move.left}px ${move.up}px ${move.right}px`
            }}
        >
            <div
                class={[`absolute animation-none w-full h-full z-0`, borderRadius]}
                style={{
                    boxShadow,
                    height: () => `calc(100% - ${noNeg(move.down) + noNeg(move.up)}px)`,
                    width: () => `calc(100% - ${noNeg(move.left) + noNeg(move.right)}px)`
                }}
            />
            <div
                class={[`relative z-[2] 
[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
[&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px] }
`, backgroundColor, borderRadius]}
                onMouseLeave={unsetHover}
            >
                <div
                    class={[!tpStatic ? '[&_span]:cursor-pointer' : null, borderRadius, 'overflow-hidden']}>
                    {adjChildren}
                </div>
            </div>
        </div>
    )
}

