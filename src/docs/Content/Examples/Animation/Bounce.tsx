import { $ } from 'woby'
import { Tooltip } from '../../../../lib'

export const Bounce = () => {
    const show = $(false)
    const showTooltip = (bool: boolean) => show(bool)

    return <div
        onMouseOver={() => showTooltip(true)}
        onMouseLeave={() => showTooltip(false)}
        class="hoverDiv"
    >
        <span class='mb-[15px]'>Hover Me</span>
        <span class='text-[14px]'><strong>Bounce</strong></span>
        <Tooltip
            class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
            show={show}
            padding='py-[15px] px-[20px]'
            animation="bounce"
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

