import { TextBox } from './Tooltip/TextBox'
import { Arrow } from './Tooltip/Arrow'

import cssRules from './Tooltip/styles'

import React, { useState, useEffect, useRef } from 'react'

export const Tooltip = (properties: {
    lineSeparated: string, position: string, hoverBackground: string, backgroundColor: string, arrowAlign: string, moveDown: string, moveRight: string, moveLeft: string,
    moveUp: string, textAlign: string, fontFamily: string, fontWeight: string, fontSize: string, color: string, animation: string, zIndex: string, flat, show
}
) => {
    const props = {
        lineSeparated: '1px solid #ececec', position: 'right center', hoverBackground: 'bg-[#ececec]', backgroundColor: 'bg-[white]', arrowAlign: 'start', moveDown: '0px',
        moveRight: '0px', moveLeft: '0px', moveUp: '0px', textAlign: 'left', fontFamily: 'inherit', fontWeight: 'bold', fontSize: 'inherit', color: 'inherit',
        animation: '', zIndex: '100', ...properties
    }

    const [hoverArrow, setHoverArrow] = useState(false)
    const [show, setShow] = useState(props.show)
    const [mount, setMount] = useState(true)
    const [hasInitialized, setHasInitialized] = useState(false)
    // const tooltipRef = useRef(null)
    // const {
    //     lineSeparated = '1px solid #ececec', position = 'right center', hoverBackground = '#ececec', backgroundColor = 'white', arrowAlign = 'start', moveDown = '0px',
    //     moveRight = '0px', moveLeft = '0px', moveUp = '0px', textAlign = 'left', fontFamily = 'inherit', fontWeight = 'bold', fontSize = 'inherit', color = 'inherit',
    //     animation = '', zIndex = '100', flat,
    //     show
    // } = props



    useEffect(() => {
        // Injecting styles directly into header
        // if (!document.getElementById('rpt-css')) {
        //     const $style = document.createElement('style')
        //     $style.type = 'text/css'
        //     $style.id = 'rpt-css'
        //     document.head.appendChild($style)
        //     $style.innerHTML = cssRules
        // }

        // Basic prop type checking
        Object.keys(props).forEach((propName) => {
            const type = typeof props[propName]
            const text = `React-power-tooltip: [${propName}] prop should be a`
            if (propName !== 'children' && type !== 'boolean' && type !== 'string') {
                // eslint-disable-next-line
                console.error(`${text} string (check also units)`)
            }
        })
    })

    useEffect(() => {
        if (!hasInitialized) {
            setShow(props.show)
            setHasInitialized(true)
        }
    }, [hasInitialized, props.show])

    useEffect(() => {
        if (props.show) setMount(true)
        if (!props.animation) setMount(false)
    }, [props.show, props.animation])

    const hoverArrowHandler = (bool) => {
        setHoverArrow(bool)
    }

    const { lineSeparated: lines, position: pos, hoverBackground, backgroundColor, arrowAlign: arwAlign, moveDown, moveRight, moveLeft, moveUp, textAlign, fontFamily, fontWeight, fontSize, color, animation, zIndex, flat } = props

    // Sets if false no line; if true default line; if string custom line;
    const lineSeparated = typeof (lines) === 'boolean'
        ? '1px solid #ececec' : lines

    function isAlign(str) {
        return align ? align === str
            : position === str
    }

    function isSide(str) {
        return side === str
    }

    const position = {
        side: pos.split(' ')[0],
        align: pos.split(' ')[1],
        isAlign,
        isSide
    }

    const arrow = {
        isAlign,
        position: arwAlign
    }

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
        y: position.isSide('top') || position.isSide('bottom'),
        x: position.isSide('left') || position.isSide('right')
    }

    arrow.position = onAxis.y ? `h-${arrow.position}` : `v-${arrow.position}`

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
        animation: show ? `rpt-${animation} 0.2s` : `rpt-${animation}-out 0.15s`
    }

    return ((!animation && show) || (show && mount)) ? (
        <div
            className={classes}
            style={tooltipStyle}
            onAnimationEnd={() => { if (!show && animation) setMount(false) }}
        >
            <div className='flex justify-center'>
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
}




