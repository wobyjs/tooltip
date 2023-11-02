import { $, $$, useMemo } from 'woby'
import { Tooltip } from '../../../../lib'

export const AlignPositions = () => {
    const hover = $<string | boolean>(false)

    // const hoverHandler = (side: boolean) => setHover(side)

    return <div class='relative text-sm w-[250px]'>
        <Tooltip
            show={useMemo(() => $$(hover) === 'left')}
            position="left top"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Top</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'left')}
            position="left center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'left')}
            position="left bottom"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Bottom</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'right')}
            position="right top"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Top</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'right')}
            position="right center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'right')}
            position="right bottom"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Bottom</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'top')}
            position="top left"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Left</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'top')}
            position="top center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'top')}
            position="top right"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Right</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'bottom')}
            position="bottom left"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Left</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'bottom')}
            position="bottom center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'bottom')}
            position="bottom right"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Right</span>
        </Tooltip>
        <div class="square purpleGradient">
            <div class='absolute w-full h-full flex items-center justify-center text-[15px]'>
                <div class='w-[70%] flex flex-row justify-between'>
                    <span>Left</span>
                    <span>Right</span>
                </div>
            </div>
            <div class='absolute w-full h-full flex items-center justify-center text-[15px]'>
                <div class='h-[70%] flex flex-col justify-between items-center'>
                    <span>Top</span>
                    <span>Bottom</span>
                </div>
            </div>
            <div
                class="left"
                onMouseEnter={() => hover('left')}
                onMouseLeave={() => hover(false)}
            />
            <div
                class="top"
                onMouseEnter={() => hover('top')}
                onMouseLeave={() => hover(false)}
            />
            <div
                class="right"
                onMouseEnter={() => hover('right')}
                onMouseLeave={() => hover(false)}
            />
            <div
                class="bottom"
                onMouseEnter={() => hover('bottom')}
                onMouseLeave={() => hover(false)}
            />
        </div>
    </div>
}
