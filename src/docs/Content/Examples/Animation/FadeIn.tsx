import React, { useState } from 'react'
import { Tooltip } from '../../../../lib'

export const FadeIn = () => {
    const [show, setShow] = useState(false)
    const showTooltip = (bool: boolean) => setShow(bool)

    return <div
        onMouseOver={() => showTooltip(true)}
        onMouseLeave={() => showTooltip(false)}
        className="hoverDiv"
    >
        <span style={{ marginBottom: '15px' }}>Hover Me</span>
        <span style={{ fontSize: '14px' }}><strong>Fade</strong></span>
        <Tooltip
            show={show}
            animation="fade"
            arrowAlign="center"
            position="bottom center"
            color="black"
            fontSize="14px"
        >
            <span>Our Technology</span>
            <span>Our Story</span>
        </Tooltip>
    </div>
}
