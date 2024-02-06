import { Tooltip } from '../../../../lib'

export const Shapes = () => <>
    <h3 class='w-[95%] mb-0'><strong>Shapes / Fonts</strong></h3>
    <div class="row w-[95%] ">
        <div>
            <p class='mb-[10px]'>Default</p>
            <div class="vPlaceHolder">
                <Tooltip
                    class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                    position='right center'
                    padding='py-[15px] px-[20px]'
                    show>
                    <span>
                        Our Technology
                        <p>Some text</p>
                    </span>
                    <span>Our Story</span>
                </Tooltip>
            </div>
        </div>
        <div>
            <p>Text / shadows</p>
            <div class="vPlaceHolder">
                <Tooltip
                    class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                    position='right center'
                    padding='py-[15px] px-[20px]'
                    show
                    textAlign="right"
                    fontWeight="normal"
                    shadowShape="0 3px 6px"
                    lineSeparated
                >
                    <span>Our Technology</span>
                    <span>Our Story</span>
                </Tooltip>
            </div>
        </div>
        <div>
            <p>Corners / lines</p>
            <div class="vPlaceHolder">
                <Tooltip
                    class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                    position='right center'
                    padding='py-[15px] px-[20px]'
                    show
                    borderRadius="0px"
                    lineSeparated="border-b-[3px] border-b-[#ececec]"
                >
                    <span>Our Technology</span>
                    <span>Our Story</span>
                </Tooltip>
            </div>
        </div>
    </div>
</>
