import { Tooltip } from '../../../../lib'
import { $ } from 'woby'

export const VerticalArrow = () => <>
    <h3 class='w-[95%] mb-0'>
        <strong>Vertically </strong>
        (when tooltip positioned left / right of target)
    </h3>
    <div class="row v-pos-container mb-[40px] w-[95%]">
        <div>
            <p>
                Arrow align:
                <strong> start</strong>
            </p>
            <div class="vPlaceHolder">
                <Tooltip
                    class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                    position='right center'
                    padding='py-[15px] px-[20px]'
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
            <p class='mb-[40px]'>
                Arrow align:
                <strong> center</strong>
            </p>
            <div class="vPlaceHolder">
                <Tooltip
                    class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                    position='right center'
                    padding='py-[15px] px-[20px]'
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
            <p class='mb-[65px]'>
                Arrow align:
                <strong> end</strong>
            </p>
            <div class="vPlaceHolder">
                <Tooltip
                    class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                    position='right center'
                    padding='py-[15px] px-[20px]'
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
