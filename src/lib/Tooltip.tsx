import { $$, $, useEffect, ObservableMaybe, Observable, isObservable, useMemo, getMeta, type JSX } from 'voby'
import { Align, Side, TextBox, isSide } from './TextBox'
import { Arrow } from './Arrow'

//import cssRules from './Tooltip/styles'
import '../../dist/output.css'

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
    children?: JSX.Element
}

export const Tooltip = <T extends HTMLElement>(properties: TooltipType & { parentRef?: Observable<HTMLElement>, parent?: JSX.Child /* | ((props: { ref: Refs }) => Child), */ } = {}): JSX.Element => {
    const props = {
        /** tailwind */
        hoverBackground: 'bg-[#ececec]',
        /** tailwind */
        hoverColor: 'text-[black]',
        /** tailwind */
        backgroundColor: 'bg-[white]',
        /** not tailwind */
        textboxWidth: '150px',
        /** tailwind */
        fontSize: '[font-size:inherit]',
        /** tailwind */
        color: 'text-inherit',
        padding: 'py-[15px] px-[20px]',
        borderRadius: 'rounded-[5px]',
        shadowColor: 'rgba(0,0,0,0.251)', shadowShape: '0 8px 15px', moveDown: '0px', moveRight: '0px', moveLeft: '0px', moveUp: '0px',
        position: 'right center', arrowAlign: $<Align>('start'), textAlign: 'left', fontFamily: 'inherit', fontWeight: 'bold',

        zIndex: '100', animation: '', show: false, ...properties
    }

    const { position: pos, lineSeparated: lines, arrowAlign: arwAlign,
        hoverBackground, backgroundColor,
        moveDown, moveRight, moveLeft, moveUp,
        textAlign, fontFamily, fontWeight, fontSize, color, zIndex, animation, flat, parentRef: pf, parent: Parent,
        // shadowColor, shadowShape, textboxWidth, padding, borderRadius, hoverColor,
    } = props

    const show = /* $$(parent) ? props.show : */ (isObservable(props.show) ? props.show : $(props.show))
    const parentRef: Observable<HTMLElement> = isObservable(pf) ? pf : $(pf)

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
    // const tooltipRef = useRef(null)
    // const {
    //     lineSeparated = '1px solid #ececec', position = 'right center', hoverBackground = '#ececec', backgroundColor = 'white', arrowAlign = 'start', moveDown = '0px',
    //     moveRight = '0px', moveLeft = '0px', moveUp = '0px', textAlign = 'left', fontFamily = 'inherit', fontWeight = 'bold', fontSize = 'inherit', color = 'inherit',
    //     animation = '', zIndex = '100', flat,
    //     show
    // } = props

    // useEffect(() => {
    // //     // Injecting styles directly into header
    // //     // if (!document.getElementById('rpt-css')) {
    // //     //     const $style = document.createElement('style')
    // //     //     $style.type = 'text/css'
    // //     //     $style.id = 'rpt-css'
    // //     //     document.head.appendChild($style)
    // //     //     $style.innerHTML = cssRules
    // //     // }

    // //     // Basic prop type checking
    // //     Object.keys(props).forEach((propName) => {
    // //         const type = typeof $$(props[propName])
    // //         const text = `React-power-tooltip: [${propName}] prop should be a`
    // //         if (propName !== 'children' && type !== 'boolean' && type !== 'string') {
    // //             // eslint-disable-next-line
    // //             console.error(`${text} string (check also units)`)
    // //         }
    // //     })
    // // })

    // useEffect(() => {
    //     show(props.show())
    // })

    useEffect(() => {
        if ($$(show)) mount(true)
        if (!$$(animation)) mount(false)
    })

    // const hoverArrowHandler = (bool) => {
    //     setHoverArrow(bool)
    // }

    // const {
    //     hoverBackground = '#ececec', hoverColor = 'black', backgroundColor = 'white', textboxWidth = '150px', padding = '15px 20px', borderRadius = '5px',
    //     shadowColor = 'rgba(0,0,0,0.251)', shadowShape = '0 8px 15px', moveDown = '0px', moveRight = '0px', moveLeft = '0px', moveUp = '0px',
    //     position: pos = 'right center', arrowAlign: arwAlign = 'start', textAlign = 'left', fontFamily = 'inherit', fontWeight = 'bold', fontSize = 'inherit', color = 'inherit',
    //     zIndex = '100', animation = '', lineSeparated: lines,
    //     flat,
    // } = props


    // const { lineSeparated: lines, position: pos, hoverBackground, backgroundColor, arrowAlign: arwAlign, moveDown, moveRight, moveLeft, moveUp, textAlign, fontFamily, fontWeight, fontSize, color, animation, zIndex, flat } = props

    // Sets if false no line; if true default line; if string custom line;
    const lineSeparated: Observable<string> = typeof ($$(lines)) === 'boolean'
        ? $('border-b border-b-[#ececec]') : (isObservable(lines) ? lines : $(lines)) as Observable<string>

    const position = {
        side: $$(pos).split(' ')[0] as Side,
        align: $$(pos).split(' ')[1] as Align,
    }

    const arrow = $($$(arwAlign))//isObservable(arwAlign) ? arwAlign : $(arwAlign)

    const { side, align } = position
    const classes = ['absolute flex']
    let tooltipStyle = {}
    let bottom

    // const arrange = (top, left, right, height, width, cssSel) => {
    //     tooltipStyle = { top, left, right, height, width }
    //     classes.push(cssSel)
    // }

    switch (side) {
        case 'bottom':
            classes.push('top-full left-0 w-full justify-center')
            break
        case 'top':
            classes.push('left-0 w-full justify-center')
            bottom = '100%'
            break
        case 'right':
            classes.push('top-0 left-full h-full justify-start')
            break
        default:
            classes.push('top-0 right-full h-full justify-end')
            break
    }

    const onAxis = {
        y: isSide(position.side, 'top') || isSide(position.side, 'bottom'),
        x: isSide(position.side, 'left') || isSide(position.side, 'right')
    }

    arrow((onAxis.y ? `h-${$$(arrow)}` : `v-${$$(arrow)}`) as Align)

    const num = str => Number(str.slice(0, -2))
    const move = {
        down: num(moveDown),
        up: num(moveUp),
        left: num(moveLeft),
        right: num(moveRight)
    }

    const oneMovePropIsNeg = move.down < 0 || move.up < 0
        || move.left < 0 || move.right < 0

    switch (align) {
        case 'left':
            if (onAxis.y) classes.push('!justify-start')
            break
        case 'right':
            if (onAxis.y) classes.push('!justify-end')
            break
        case 'bottom':
            if (onAxis.x) classes.push('items-end')
            break
        case 'top':
            break
        default:
            if (onAxis.x) {
                classes.push('items-center')
                if (!oneMovePropIsNeg) {
                    move.down *= 2
                    move.up *= 2
                }
            }
            if (onAxis.y && !oneMovePropIsNeg) {
                move.right *= 2
                move.left *= 2
            }
            break
    }

    const adjustment = `${move.down}px ${move.left}px ${move.up}px ${move.right}px`

    tooltipStyle = {
        ...tooltipStyle,
        zIndex,
        color,
        bottom,
        fontSize,
        textAlign,
        fontFamily,
        fontWeight,
        padding: oneMovePropIsNeg ? null : adjustment,
        margin: oneMovePropIsNeg ? adjustment : null,
        animation: () => $$(show) ? `rpt-${$$(animation)} 0.2s` : `rpt-${$$(animation)}-out 0.15s`
    }

    const e = useMemo(() => ((!$$(animation) && $$(show)) || ($$(show) && $$(mount))) ? (
        <div
            className={classes}
            style={tooltipStyle}
            onAnimationEnd={() => { if (!$$(show) && $$(animation)) mount(false) }}
        >
            <div class='flex justify-center'            >
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
                    arw={arrow}
                    move={move}
                />
            </div>
        </div>
    ) : null
    )

    return useMemo(() => $$(Parent) ? <div class="relative" ref={parentRef}>{Parent}{e}</div> : e)
}



