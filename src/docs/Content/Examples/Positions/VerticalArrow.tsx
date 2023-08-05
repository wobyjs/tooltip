import React from 'react'
import { Tooltip } from '../../../../lib'

export const VerticalArrow = () => <>
    <h3 style={{ width: '95%', marginBottom: '0' }}>
        <strong>Vertically </strong>
        (when tooltip positioned left / right of target)
    </h3>
    <div className="row v-pos-container">
        <div>
            <p>
                Arrow align:
                <strong> start</strong>
            </p>
            <div className="vPlaceHolder">
                <Tooltip
                    show
                    textboxWidth="auto"
                    lineSeparated
                >
                    <span>Longer Option 1</span>
                    <span>Longer Option 2</span>
                </Tooltip>
            </div>
        </div>
        <div>
            <p>
                Arrow align:
                <strong> center</strong>
            </p>
            <div className="vPlaceHolder">
                <Tooltip
                    show
                    arrowAlign="center"
                    textboxWidth="auto"
                    lineSeparated
                >
                    <span>Longer Option 1</span>
                    <span>Longer Option 2</span>
                </Tooltip>
            </div>
        </div>
        <div>
            <p>
                Arrow align:
                <strong> end</strong>
            </p>
            <div className="vPlaceHolder">
                <Tooltip
                    show
                    arrowAlign="end"
                    textboxWidth="auto"
                    lineSeparated
                >
                    <span>Longer Option 1</span>
                    <span>Longer Option 2</span>
                </Tooltip>
            </div>
        </div>
    </div>
</>
