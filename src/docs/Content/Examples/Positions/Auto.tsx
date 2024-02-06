import { Tooltip } from '../../../../lib'
import { $ } from 'woby'

const ref = $<HTMLDivElement>()
export const Auto = () => <>
    <h3 class='w-[95%] mb-0'><strong>Auto</strong></h3>
    <div class="adjOuter">
        <div ref={ref} class='cursor-pointer w-[150px] p-[15px] h-[100px] text-center relative text-sm flex items-center justify-center mt-20 rounded-[5px] border-2 border-solid border-[#4b4b4b] bg-[rgba(137,27,211,0.4)]'>
            <h3>Target element</h3>
            <Tooltip
                class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                parent={ref}
                padding='py-[15px] px-[20px]'
                arrowAlign="center"
                position="top center"
                textAlign="center"
                textboxWidth="120px"
                moveUp="40px"
                hoverBackground="bg-[#3b0586]"
                hoverColor="text-[white]"
            >
                <span>
                    moveUp
                    <br />
                    40px
                </span>
            </Tooltip>
            <Tooltip
                class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                parent={ref}
                padding='py-[15px] px-[20px]'
                arrowAlign="center"
                position="left center"
                textAlign="center"
                textboxWidth="120px"
                moveLeft="40px"
                hoverBackground="bg-[#3b0586]"
                hoverColor="text-[white]"
            >
                <span>
                    moveLeft
                    <br />
                    40px
                </span>
            </Tooltip>
            <Tooltip
                class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                parent={ref}
                padding='py-[15px] px-[20px]'
                arrowAlign="center"
                position="bottom center"
                textAlign="center"
                textboxWidth="120px"
                moveDown="40px"
                hoverBackground="bg-[#3b0586]"
                hoverColor="text-[white]"
            >
                <span>
                    moveDown
                    <br />
                    40px
                </span>
            </Tooltip>
            <Tooltip
                class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                parent={ref}
                padding='py-[15px] px-[20px]'
                arrowAlign="center"
                position="right center"
                textAlign="center"
                textboxWidth="120px"
                moveRight="40px"
                hoverBackground="bg-[#3b0586]"
                hoverColor="text-[white]"
            >
                <span>
                    moveRight
                    <br />
                    40px
                </span>
            </Tooltip>

        </div>
    </div>
</>
