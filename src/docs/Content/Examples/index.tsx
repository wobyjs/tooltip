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
import { Auto } from './Positions/Auto'

export const Examples = () => <>
    <h1>Examples</h1>
    <h2 id="types">Types of tooltips</h2>
    <div class="flexContainer greyBkgr pt-[25px] pb-[135px] px-0">
        <Types />
    </div>
    <ToggleCode>
        <div class="codeRow">
            <div>
                <pre>
                    <code class="language-javascript">
                        {codeHoverable}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeStatic}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeAlert}
                    </code>
                </pre>
            </div>
        </div>
    </ToggleCode>
    <Alert />
    <h2 id="animations">Animations</h2>
    <p class='leading-[1.7]'>
        <strong>Note: </strong>
        The slideUpDown animation is
        <i> not </i>
        included in this library. Check out the
        <a href="#custom-animations" class='text-[inherit] text-[purple]'> advanced section </a>
        for more info on how to add your own custom animations to this library.
    </p>
    <div class="flexContainer greyBkgr pb-[60px]">
        <Animation />
    </div>
    <ToggleCode>
        <div class="codeRow">
            <div>
                <pre>
                    <code class="language-javascript">
                        {codeFade}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeSlideUpDown}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeBounce}
                    </code>
                </pre>
            </div>
        </div>
    </ToggleCode>
    <h2 id="customization">Customization</h2>
    <div class="flexContainer greyBkgr colors pb-[100px]">
        <Shapes />
    </div>
    <ToggleCode>
        <div class="codeRow">
            <div>
                <pre>
                    <code class="language-javascript">
                        {codeDefault}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeFont}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeCorners}
                    </code>
                </pre>
            </div>
        </div>
    </ToggleCode>
    <div class="flexContainer greyBkgr colors mt-[30px] pb-20">
        <Colors />
    </div>
    <ToggleCode>
        <div class="codeRow">
            <div>
                <pre>
                    <code class="language-javascript">
                        {codeHover}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeBackground}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeFlat}
                    </code>
                </pre>
            </div>
        </div>
    </ToggleCode>
    <h2 id="positions">Positions</h2>
    <h3 id="arrow-align" class='leading-[1.7] mb-2.5'>
        1)
        <strong> Arrow align </strong>
        relative to textbox (via arrowAlign prop)
        <p class='leading-[1.7] text-[inherit] mt-2.5'>
            The arrowAlign prop aligns the arrow
            <strong> relative to the textbox side</strong>
            :
        </p>
        <ol class='list-disc m-2.5 ml-12'>
            <li class='cursor-default'>
                arrowAlign:
                <strong> start </strong>
                = Aligns the arrow on the textbox side either on the top or left depending on the
                tooltip position.
            </li>
            <li class='cursor-default'>
                arrowAlign:
                <strong> center </strong>
                = Aligns the arrow central on the textbox side.
            </li>
            <li class='cursor-default'>
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
    <div class="flexContainer greyBkgr pb-[50px]">
        <VerticalArrow />
    </div>
    <ToggleCode>
        <div class="codeRow">
            <div>
                <pre>
                    <code class="language-javascript">
                        {codeTop}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeCenterV}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeBottom}
                    </code>
                </pre>
            </div>
        </div>
    </ToggleCode>
    <div class="flexContainer greyBkgr outer-hpos-container">
        <HorizontalArrow />
    </div>
    <ToggleCode>
        <div class="codeRow">
            <div>
                <pre>
                    <code class="language-javascript">
                        {codeLeft}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeCenterH}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeRight}
                    </code>
                </pre>
            </div>
        </div>
    </ToggleCode>
    <h3 id="tooltip-positions" class='mb-0'>
        2)
        <strong> Tooltip positions </strong>
        relative to target element (via position prop)
    </h3>
    <h3 class='leading-[1.7] mt-0'>
        The position prop positions the tooltip
        <strong> relative to target element. </strong>
        It consists of a string with two positions:
        <ol class='list-disc leading-[1.7] ml-12'>
            <li class='cursor-default'>
                <strong>First position: </strong>
                determins
                <strong> on which side </strong>
                of the target element to position the tooltip.
            </li>
            <li class='cursor-default'>
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
        <code class="language-javascript">
            {codeAlign}
        </code>
    </pre>
    <div class="flexContainer greyBkgr tpPositionsContainer overflow-scroll overflow-y-hidden p-[50px]">
        <div class="tpPositions">
            <AlignPositions />
        </div>
    </div>
    <h3>
        3)
        <strong> Adjusting </strong>
        positions (via move props)
    </h3>
    <div class="flexContainer greyBkgr adjInnerContainer overflow-scroll overflow-y-hidden pb-[50px]">
        <AdjustmentInner />
    </div>
    <ToggleCode>
        <div class="codeRow">
            <div>
                <pre>
                    <code class="language-javascript">
                        {codeMoveUpNeg}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeMoveLeftNeg}
                    </code>
                </pre>
                <pre />
            </div>
        </div>
    </ToggleCode>
    <h3 class='leading-[1.5]'>
        Positive move prop values extend the hoverable area from the target
        to the tooltip element. This allows the selection of tooltip options
        when the target is hovered.
    </h3>
    <div class="flexContainer greyBkgr adjOuterContainer overflow-scroll overflow-y-hidden pb-[140px]">
        <AdjustmentOuter />
    </div>
    <ToggleCode>
        <div class="codeRow">
            <div>
                <pre>
                    <code class="language-javascript">
                        {codeMoveUp}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeMoveLeft}
                    </code>
                </pre>
                <pre />
            </div>
        </div>
    </ToggleCode>

    <h3 class='leading-[1.5]'>
        AutoTooltip
    </h3>
    <div class="flexContainer greyBkgr adjOuterContainer overflow-scroll overflow-y-hidden pb-[140px]">
        <Auto />
    </div>

    <ToggleCode>
        <div class="codeRow">
            <div>
                <pre>
                    <code class="language-javascript">
                        {codeMoveUp}
                    </code>
                </pre>
                <pre>
                    <code class="language-javascript">
                        {codeMoveLeft}
                    </code>
                </pre>
                <pre />
            </div>
        </div>
    </ToggleCode>
</>
