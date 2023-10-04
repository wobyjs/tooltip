import { Tooltip } from '../../../../lib'
import { $ } from 'voby'

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
