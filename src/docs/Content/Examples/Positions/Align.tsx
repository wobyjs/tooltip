import React, { useState } from 'react'
import { Tooltip } from '../../../../lib'

export const AlignPositions = () => {
    const [hover, setHover] = useState(false)

    // const hoverHandler = (side: boolean) => setHover(side)

    return <div style={{ position: 'relative', fontSize: '14px', width: '250px' }}>
        <Tooltip
            show={hover === 'left'}
            position="left top"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Top</span>
        </Tooltip>
        <Tooltip
            show={hover === 'left'}
            position="left center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            show={hover === 'left'}
            position="left bottom"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Bottom</span>
        </Tooltip>
        <Tooltip
            show={hover === 'right'}
            position="right top"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Top</span>
        </Tooltip>
        <Tooltip
            show={hover === 'right'}
            position="right center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            show={hover === 'right'}
            position="right bottom"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Bottom</span>
        </Tooltip>
        <Tooltip
            show={hover === 'top'}
            position="top left"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Left</span>
        </Tooltip>
        <Tooltip
            show={hover === 'top'}
            position="top center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            show={hover === 'top'}
            position="top right"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Right</span>
        </Tooltip>
        <Tooltip
            show={hover === 'bottom'}
            position="bottom left"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Left</span>
        </Tooltip>
        <Tooltip
            show={hover === 'bottom'}
            position="bottom center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            show={hover === 'bottom'}
            position="bottom right"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Right</span>
        </Tooltip>
        <div className="square purpleGradient">
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px'
            }}
            >
                <div style={{
                    width: '70%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
                >
                    <span>Left</span>
                    <span>Right</span>
                </div>
            </div>
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px'
            }}
            >
                <div style={{
                    height: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                >
                    <span>Top</span>
                    <span>Bottom</span>
                </div>
            </div>
            <div
                className="left"
                onMouseEnter={() => setHover('left')}
                onMouseLeave={() => setHover(false)}
            />
            <div
                className="top"
                onMouseEnter={() => setHover('top')}
                onMouseLeave={() => setHover(false)}
            />
            <div
                className="right"
                onMouseEnter={() => setHover('right')}
                onMouseLeave={() => setHover(false)}
            />
            <div
                className="bottom"
                onMouseEnter={() => setHover('bottom')}
                onMouseLeave={() => setHover(false)}
            />
        </div>
    </div>
}
