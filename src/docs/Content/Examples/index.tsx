import React, { Component } from 'react'
import { Animation } from './Animation'
import Types from './Types/Types'
import { Alert } from './Types/Alert'
import { Colors } from './Customization/Colors'
import { Shapes } from './Customization/Shapes'
import { AlignPositions } from './Positions/Align'
import { VerticalArrow } from './Positions/VerticalArrow'
import { HorizontalArrow } from './Positions/HorizontalArrow'
import { AdjustmentInner } from './Positions/AdjustmentInner'
import { AdjustmentOuter } from './Positions/AdjustmentOuter'
import { ToggleCode } from '../ToggleCode'
import {
    codeStatic,
    codeAlert,
    codeHoverable,
    codeFade,
    codeSlideUpDown,
    codeBounce,
    codeAlign,
    codeDefault,
    codeFont,
    codeCorners,
    codeHover,
    codeBackground,
    codeFlat,
    codeTop,
    codeCenterV,
    codeBottom,
    codeLeft,
    codeCenterH,
    codeRight,
    codeMoveUpNeg,
    codeMoveLeftNeg,
    codeMoveUp,
    codeMoveLeft
} from '../CodeSnippets'

export const Examples = () => <>
    <h1>Examples</h1>
    <h2 id="types">Types of tooltips</h2>
    <div
        className="flexContainer greyBkgr"
        style={{
            padding: '25px 0 135px 0'
        }}
    >
        <Types />
    </div>
    <ToggleCode>
        <div className="codeRow">
            <div>
                <pre>
                    <code className="language-javascript">
                        {codeHoverable}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeStatic}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeAlert}
                    </code>
                </pre>
            </div>
        </div>
    </ToggleCode>
    <Alert />
    <h2 id="animations">Animations</h2>
    <p style={{ lineHeight: '1.7' }}>
        <strong>Note: </strong>
        The slideUpDown animation is
        <i> not </i>
        included in this library. Check out the
        <a href="#custom-animations" style={{ fontSize: 'inherit', color: 'purple' }}> advanced section </a>
        for more info on how to add your own custom animations to this library.
    </p>
    <div
        className="flexContainer greyBkgr"
        style={{
            paddingBottom: '60px'
        }}
    >
        <Animation />
    </div>
    <ToggleCode>
        <div className="codeRow">
            <div>
                <pre>
                    <code className="language-javascript">
                        {codeFade}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeSlideUpDown}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeBounce}
                    </code>
                </pre>
            </div>
        </div>
    </ToggleCode>
    <h2 id="customization">Customization</h2>
    <div
        className="flexContainer greyBkgr colors"
        style={{
            paddingBottom: '80px'
        }}
    >
        <Shapes />
    </div>
    <ToggleCode>
        <div className="codeRow">
            <div>
                <pre>
                    <code className="language-javascript">
                        {codeDefault}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeFont}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeCorners}
                    </code>
                </pre>
            </div>
        </div>
    </ToggleCode>
    <div
        className="flexContainer greyBkgr colors"
        style={{
            paddingBottom: '80px',
            marginTop: '30px'
        }}
    >
        <Colors />
    </div>
    <ToggleCode>
        <div className="codeRow">
            <div>
                <pre>
                    <code className="language-javascript">
                        {codeHover}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeBackground}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeFlat}
                    </code>
                </pre>
            </div>
        </div>
    </ToggleCode>
    <h2 id="positions">Positions</h2>
    <h3 id="arrow-align" style={{ lineHeight: '1.7', marginBottom: '10px' }}>
        1)
        <strong> Arrow align </strong>
        relative to textbox (via arrowAlign prop)
        <p style={{ lineHeight: '1.7', marginTop: '10px', fontSize: 'inherit' }}>
            The arrowAlign prop aligns the arrow
            <strong> relative to the textbox side</strong>
            :
        </p>
        <ol style={{ listStyleType: 'disc', margin: '10px' }}>
            <li style={{ cursor: 'default' }}>
                arrowAlign:
                <strong> start </strong>
                = Aligns the arrow on the textbox side either on the top or left depending on the
                tooltip position.
            </li>
            <li style={{ cursor: 'default' }}>
                arrowAlign:
                <strong> center </strong>
                = Aligns the arrow central on the textbox side.
            </li>
            <li style={{ cursor: 'default' }}>
                arrowAlign:
                <strong> end </strong>
                = Aligns the arrow on the textbox side either on the bottom or right depending on the
                tooltip position.
            </li>
        </ol>
        <strong>Note: </strong>
        This prop does NOT determine the textbox side on which the
        arrow is placed (done implicitly via the position prop).
    </h3>
    <div
        className="flexContainer greyBkgr"
        style={{
            paddingBottom: '50px'
        }}
    >
        <VerticalArrow />
    </div>
    <ToggleCode>
        <div className="codeRow">
            <div>
                <pre>
                    <code className="language-javascript">
                        {codeTop}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeCenterV}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeBottom}
                    </code>
                </pre>
            </div>
        </div>
    </ToggleCode>
    <div
        className="flexContainer greyBkgr outer-hpos-container"
    >
        <HorizontalArrow />
    </div>
    <ToggleCode>
        <div className="codeRow">
            <div>
                <pre>
                    <code className="language-javascript">
                        {codeLeft}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeCenterH}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeRight}
                    </code>
                </pre>
            </div>
        </div>
    </ToggleCode>
    <h3 id="tooltip-positions" style={{ marginBottom: '0' }}>
        2)
        <strong> Tooltip positions </strong>
        relative to target element (via position prop)
    </h3>
    <h3 style={{ lineHeight: '1.7', marginTop: '0' }}>
        The position prop positions the tooltip
        <strong> relative to target element. </strong>
        It consists of a string with two positions:
        <ol style={{ listStyleType: 'disc', lineHeight: '1.7' }}>
            <li style={{ cursor: 'default' }}>
                <strong>First position: </strong>
                determins
                <strong> on which side </strong>
                of the target element to position the tooltip.
            </li>
            <li style={{ cursor: 'default' }}>
                <strong>Second position: </strong>
                determins
                <strong> how to align </strong>
                the tooltip on that side.
            </li>
        </ol>
        <strong>Note: </strong>
        The position prop implicitly determines on which textbox side the arrow will
        appear. To position the arrow relative to that textbox side use the arrowAlign prop.
    </h3>
    <pre>
        <code className="language-javascript">
            {codeAlign}
        </code>
    </pre>
    <div
        className="flexContainer greyBkgr tpPositionsContainer"
        style={{
            padding: '50px',
            overflow: 'scroll',
            overflowY: 'hidden'
        }}
    >
        <div className="tpPositions">
            <AlignPositions />
        </div>
    </div>
    <h3>
        3)
        <strong> Adjusting </strong>
        positions (via move props)
    </h3>
    <div
        className="flexContainer greyBkgr adjInnerContainer"
        style={{
            paddingBottom: '50px',
            overflow: 'scroll',
            overflowY: 'hidden'
        }}
    >
        <AdjustmentInner />
    </div>
    <ToggleCode>
        <div className="codeRow">
            <div>
                <pre>
                    <code className="language-javascript">
                        {codeMoveUpNeg}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeMoveLeftNeg}
                    </code>
                </pre>
                <pre />
            </div>
        </div>
    </ToggleCode>
    <h3 style={{ lineHeight: '1.5' }}>
        Positive move prop values extend the hoverable area from the target
        to the tooltip element. This allows the selection of tooltip options
        when the target is hovered.
    </h3>
    <div
        className="flexContainer greyBkgr adjOuterContainer"
        style={{
            paddingBottom: '140px',
            overflow: 'scroll',
            overflowY: 'hidden'
        }}
    >
        <AdjustmentOuter />
    </div>
    <ToggleCode>
        <div className="codeRow">
            <div>
                <pre>
                    <code className="language-javascript">
                        {codeMoveUp}
                    </code>
                </pre>
                <pre>
                    <code className="language-javascript">
                        {codeMoveLeft}
                    </code>
                </pre>
                <pre />
            </div>
        </div>
    </ToggleCode>
</>
