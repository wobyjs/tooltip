import { useEffect, $ } from 'woby'
import { render } from 'woby'
// eslint-disable-next-line
// import Prism from 'prismjs'

import '../../dist/output.css'
import { Tooltip, TooltipContent } from '../Tooltip'


export const Demo = () => {
    const codeBlockRef = $()
    // useEffect(() => {
    //     if (codeBlockRef)
    //         Prism.highlightAll()
    // })
    // usePrismHighlight(codeBlockRef)
    return <div class='place-items-center h-screen bg-gray-100'>
        DEMO
        <br />
        <br />
        <br />
        <br />
        <br />
        <table class='[&_td]:h-[7rem] [&_td]:w-[7rem] [&_td]:text-center '>
            <tbody>
                <tr><td></td><td>  <div class="top">
                    <Tooltip>Top
                        <TooltipContent position='top' class={`bg-[#009cdc] text-[white] min-w-[300px] box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `}>
                            <h3 class='font-[22px] font-bold'>Lorem Ipsum</h3>
                            <ul>
                                <li>Aliquam ac odio ut est</li>
                                <li>Cras porttitor orci</li>
                            </ul>
                        </TooltipContent>
                    </Tooltip>
                </div></td><td></td></tr>
                <tr><td>
                    <Tooltip>
                        Left
                        <TooltipContent position='left'>
                            <h3>Lorem Ipsum</h3>
                            <ul>
                                <li>Aliquam ac odio ut est aliquet tempor vitae sed arcu</li>
                                <li>Cras porttitor orci ac porta gravida</li>
                            </ul>
                        </TooltipContent>
                    </Tooltip>
                </td><td></td><td >
                        <Tooltip>Right
                            <TooltipContent position='right' class='min-w-[200px] w-[400px] translate-x-0 -translate-y-2/4 text-[#EEEEEE] bg-[#444444] box-border shadow-[0_1px_8px_rgba(0,0,0,0.5)] transition-opacity duration-[0.8s] p-5 rounded-lg left-full top-2/4'>
                                <img src="https://www.menucool.com/tooltip/cssttp/tooltip-head.jpg" />
                                <h3 class='font-[22px] font-bold'>Fade in Effect</h3>
                                <ul>
                                    <li>This demo has fade in/out effect.</li>
                                    <li>It is using CSS opacity, visibility, and transition property to toggle the tooltip.</li>
                                    <li>Other demos are using display property<em>(none or block)</em> for the toggle.</li>
                                </ul>
                            </TooltipContent>
                        </Tooltip></td></tr>
                <tr><td></td><td>
                    <Tooltip>
                        Bottom
                        <TooltipContent position='bottom' class={`bg-[#eeeeee] min-w-[400px] box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `}>
                            <img class='w-[400px]' src="https://www.menucool.com/tooltip/cssttp/css-tooltip-image.jpg" />
                            <h3 class='font-[22px] font-bold'>CSS Tooltip</h3>
                            <p>The CSS tooltip appears when user moves the mouse over an element, or when user tap the element with a mobile device.</p>
                        </TooltipContent>
                    </Tooltip>

                </td><td></td></tr>
            </tbody>
        </table>

        <br />
        <br />
        <br />
        <br />
        <br />

        <Tooltip>
            Static & Multiple
            <TooltipContent position='top' static>
                Top
            </TooltipContent>
            <TooltipContent position='bottom' static>
                Bottom
            </TooltipContent>


            <TooltipContent position='left'>
                Left
            </TooltipContent>

            <TooltipContent position='right' >
                Right
            </TooltipContent>
        </Tooltip>

    </div >
}

render(<Demo />, document.getElementById('app'))
