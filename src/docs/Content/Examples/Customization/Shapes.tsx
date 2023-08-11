import { Tooltip } from '../../../../lib'

export const Shapes = () => <>
    <h3 class='w-[95%] mb-0'><strong>Shapes / Fonts</strong></h3>
    <div class="row w-[95%] ">
        <div>
            <p class='mb-[10px]'>Default</p>
            <div class="vPlaceHolder">
                <Tooltip show>
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
