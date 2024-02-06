import { $, $$, useMemo } from 'woby'
import { Tooltip } from '../../../../lib'

export const AlignPositions = () => {
    const hover = $<string | boolean>(false)

    // const hoverHandler = (side: boolean) => setHover(side)

    return <div class='relative text-sm w-[250px]'>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={useMemo(() => $$(hover) === 'left')}
            padding='py-[15px] px-[20px]'
            position="left top"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Top</span>
        </Tooltip>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={useMemo(() => $$(hover) === 'left')}
            padding='py-[15px] px-[20px]'
            position="left center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={useMemo(() => $$(hover) === 'left')}
            padding='py-[15px] px-[20px]'
            position="left bottom"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Bottom</span>
        </Tooltip>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={useMemo(() => $$(hover) === 'right')}
            padding='py-[15px] px-[20px]'
            position="right top"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Top</span>
        </Tooltip>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={useMemo(() => $$(hover) === 'right')}
            padding='py-[15px] px-[20px]'
            position="right center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={useMemo(() => $$(hover) === 'right')}
            padding='py-[15px] px-[20px]'
            position="right bottom"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Bottom</span>
        </Tooltip>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={useMemo(() => $$(hover) === 'top')}
            padding='py-[15px] px-[20px]'
            position="top left"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Left</span>
        </Tooltip>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={useMemo(() => $$(hover) === 'top')}
            padding='py-[15px] px-[20px]'
            position="top center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={useMemo(() => $$(hover) === 'top')}
            padding='py-[15px] px-[20px]'
            position="top right"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Right</span>
        </Tooltip>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={useMemo(() => $$(hover) === 'bottom')}
            padding='py-[15px] px-[20px]'
            position="bottom left"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Left</span>
        </Tooltip>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={useMemo(() => $$(hover) === 'bottom')}
            padding='py-[15px] px-[20px]'
            position="bottom center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={useMemo(() => $$(hover) === 'bottom')}
            padding='py-[15px] px-[20px]'
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
