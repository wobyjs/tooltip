


import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

export const TextBox = (props) => {
    const [hoverIndex, setHoverIndex] = useState(null)
    const [firstH, setFirstH] = useState(null)
    const [lastH, setLastH] = useState(null)
    const [totH, setTotH] = useState(null)

    const textBoxRef = useRef(null)
    const spanHeightsRef = useRef({})

    useEffect(() => {
        const heights = Object.keys(spanHeightsRef.current)
            .map(key => spanHeightsRef.current[key].clientHeight)
        const firstH = heights[0]
        const lastH = heights[heights.length - 1]
        const totH = heights.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        setTotH(totH)
        setFirstH(firstH)
        setLastH(lastH)
    }, [])

    const unsetHover = () => {
        setHoverIndex(null)
        props.hoverArrow(false)
    }

    // Set & unset hover state
    const onSpanHover = (index, lastIndex, numChildren) => {
        setHoverIndex(index)
        const { static: rctStatic, arw: arrow, pos: position, hoverArrow } = props
        if (!rctStatic &&
            ((index === 0 && (position.isSide('bottom') || arrow.isAlign('v-start'))) ||
                (index === lastIndex && (position.isSide('top') || arrow.isAlign('v-end'))) ||
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
        textBoxWidth: width,
        shadowColor: shCol,
        shadowShape: shShape,
        move,
        backgroundColor,
        padding,
        borderRadius,
        hoverBackground,
        hoverColor,
        alert,
        flat,
        children
    } = props

    const numberChildren = React.Children.count(children)
    const lastIndex = numberChildren - 1

    const adjChildren = React.Children.map(children, (child, index) => {
        const className = [backgroundColor, padding,]
        if (width === 'auto') className.push('whitespace-nowrap')
        if (!tpStatic && hoverIndex === index) {
            className.push(hoverColor)
            className.push(hoverBackground)
        }

        const style = { borderBottom: (lineSeparated && lastIndex !== index) ? lineSeparated : undefined }

        const childProps = {
            ...child.props,
            ref: span => spanHeightsRef.current[`span${index + 1}`] = span,
            className: className.join(' '), style,
            onMouseOver: () => onSpanHover(index, lastIndex, numberChildren)
        }
        return React.cloneElement(child, childProps)
    })
    const calcHPos = (left, center, right) => {
        return position.isAlign('center')
            ? center : position.isAlign('left') ? left : right
    }
    const calcVPos = (perc: number, elHeight: number, divider: number, adjMove: number, totHeight?: number) => {
        return `calc(${perc}% - ${totHeight || 0}px - ${elHeight}px/${divider} + ${adjMove || 0}px)`
    }
    // TODO: REfactor
    const calcTopPos = (elHeight, totHeight) => {
        if (position.align === 'center') {
            return calcVPos(50, elHeight, 2, null, totHeight)
        }
        if (position.align === 'bottom') {
            return calcVPos(100, elHeight, 2, -12, totHeight)
        }
        return calcVPos(0, elHeight, 2, 12, totHeight)
    }

    let left = ''
    let right = ''
    let top = '8px'
    // Align: left, center, right
    const hLeftPos = calcHPos('100% - 50px', '50% - 40px', '0% - 30px')
    const hRightPos = calcHPos('0% - 30px', '50% - 40px', '100% - 50px')

    switch (arrow.position) {
        case 'h-start':
            left = `calc(${hRightPos})`
            break
        case 'h-end':
            right = `calc(${hLeftPos})`
            break
        case 'v-start':
            top = calcTopPos(firstH, null)
            break
        case 'v-end':
            top = calcTopPos(lineSeparated ? -lastH + 1 : -lastH, totH)
            break
        case 'v-center':
            top = `calc(0% - ${totH}px/2 + 11px)`
            if (position.isAlign('center')) {
                top = `calc(50% - ${totH}px/2)`
            }
            if (position.isAlign('bottom')) {
                top = `calc(100% - ${totH}px/2 - 11px)`
            }
            break
        default:
            break
    }

    switch (position.side) {
        case 'top':
            top = calcVPos(0, totH, 1, 13)
            break
        case 'left':
            right = '8px'
            break
        case 'right':
            left = '8px'
            break
        default:
            break
    }

    let textBoxWidthValue = width

    if (textBoxWidthValue !== 'auto') {
        textBoxWidthValue = Number(width.slice(0, -2))
        if (move.left > 0) textBoxWidthValue += move.left
        if (move.right > 0) textBoxWidthValue += move.right
    }

    const boxStyle = {
        left,
        right,
        top,
        width: textBoxWidthValue,
        borderRadius
    }

    const shColAdj = shCol.substr(0, shCol.lastIndexOf(',')).replace(/[)]/g, ',')
    const shadow = `${shShape} ${shCol}, 0 0 3px ${shColAdj}, 0.1), 0 0 0 1px ${shColAdj}, 0.15)`
    const boxShadow = flat ? null : shadow
    const alertStyle = alert ? 'rpt-alert' : ''
    const rgb = alert || 'rgb(248, 109, 109)'
    const alertShadow = alert ? `0 0 0 ${rgb.slice(0, rgb.length - 1)}, 0.4)` : null
    const noNeg = number => number > 0 ? number : 0

    return (
        <div
            className={`rpt-textbox-container absolute ${alertStyle}`}
            style={{
                ...boxStyle,
                boxShadow: alertShadow,
                padding: `${move.down}px ${move.left}px ${move.up}px ${move.right}px`
            }}
        >
            <div
                className={clsx("rpt-shadow-container", borderRadius,)}
                style={{
                    boxShadow,
                    height: `calc(100% - ${noNeg(move.down) + noNeg(move.up)}px)`,
                    width: `calc(100% - ${noNeg(move.left) + noNeg(move.right)}px)`
                }}
            />
            <div
                className={clsx(`relative z-[2] 
[&_span]:block [&_span]:cursor-text [&_span]:box-border
[&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-60 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px] }
`, borderRadius, backgroundColor)}
                onMouseLeave={unsetHover}
            >
                <div
                    className={clsx(!tpStatic ? '[&_span]:cursor-pointer' : null, borderRadius, 'overflow-hidden')}                >
                    {adjChildren}
                </div>
            </div>
        </div>
    )
}

