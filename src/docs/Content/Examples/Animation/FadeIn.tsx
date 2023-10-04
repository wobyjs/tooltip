import { $, Ref } from 'voby'
import { Tooltip } from '../../../../lib'
import { Refs } from 'voby/dist/types/types'

export const FadeIn = () => {
    // const show = $(false)
    // const showTooltip = (bool: boolean) => show(bool)

    // return <div
    //     onMouseOver={() => showTooltip(true)}
    //     onMouseLeave={() => showTooltip(false)}
    //     class="hoverDiv"
    // >
    return <Tooltip
        // show={show}
        parent={() => <div class="hoverDiv">
            <span class='mb-[15px]'>Hover Me</span>
            <span class='text-[14px]'><strong>Fade</strong></span>
        </div>
        }
        animation="fade"
        arrowAlign="center"
        position="bottom center"
        color="black"
        fontSize="14px"
    >
        <span>Our Technology</span>
        <span>Our Story</span>
    </Tooltip>
    // </div>
}
