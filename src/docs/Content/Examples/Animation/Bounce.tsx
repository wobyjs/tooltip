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
            show={show}
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

