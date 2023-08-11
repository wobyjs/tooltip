import { Tooltip } from '../../../../lib'

export const HorizontalArrow = () => <>
    <h3 class='w-[95%] mb-0'>
        <strong>Horizontally </strong>
        (when tooltip positioned above / below target)
    </h3>
    <div class="row h-pos-container w-[95%]">
        <div class='flex flex-col items-center'>
            <p>
                Arrow align:
                <strong> start</strong>
            </p>
            <div class="hPlaceHolder right-1/4">
                <Tooltip
                    show
                    arrowAlign="start"
                    position="bottom center"
                    textboxWidth="auto"
                    lineSeparated
                >
                    <span>Longer Option 1</span>
                    <span>Longer Option 2</span>
                </Tooltip>
            </div>
        </div>
        <div class='flex flex-col items-center'>
            <p>
                Arrow align:
                <strong> center</strong>
            </p>
            <div class="hPlaceHolder">
                <Tooltip
                    show
                    arrowAlign="center"
                    position="bottom center"
                    textboxWidth="auto"
                    lineSeparated
                >
                    <span>Longer Option 1</span>
                    <span>Longer Option 2</span>
                </Tooltip>

            </div>
        </div>
        <div class='flex flex-col items-center'>
            <p>
                Arrow align:
                <strong> end</strong>
            </p>
            <div class="hPlaceHolder left-1/4">
                <Tooltip
                    show
                    arrowAlign="end"
                    position="bottom center"
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
