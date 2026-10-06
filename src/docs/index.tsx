import { useEffect, $ } from 'woby'
import { render } from 'woby'

// import '../../dist/tooltip.css'
// import '../../build/tooltip.css'
import './input.css'
import { Tooltip, TooltipContent, PositionType } from '../Tooltip'


export const Demo = () => {
    const codeBlockRef = $()

    // Additional tooltip samples with different styles
    const samples: { position: PositionType, bg: string, text: string, title: string }[] = [
        { position: 'top', bg: 'bg-[#009cdc]', text: 'text-white', title: 'Blue Top Tooltip' },
        { position: 'bottom', bg: 'bg-[#444444]', text: 'text-white', title: 'Dark Bottom Tooltip' },
        { position: 'left', bg: 'bg-[#ff6b6b]', text: 'text-white', title: 'Red Left Tooltip' },
        { position: 'right', bg: 'bg-[#4ecdc4]', text: 'text-black', title: 'Teal Right Tooltip' },
    ]

    return <div class='flex flex-col items-center h-screen bg-gray-100 relative mx-auto w-[80%] p-8'>
        <h1 class='text-3xl font-bold mb-8 text-gray-800'>TOOLTIP DEMO - CustomElement Web Components</h1>

        <div class='grid grid-cols-3 gap-8 mb-12'>
            {/* Original demo tooltips */}
            <div class="flex justify-center">
                <Tooltip>
                    Top
                    <TooltipContent position='top' class={`bg-[#009cdc] text-[white] min-w-[300px] box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `}>
                        <h3 class='text-[22px] font-bold'>Lorem Ipsum</h3>
                        <ul>
                            <li>Aliquam ac odio ut est</li>
                            <li>Cras porttitor orci</li>
                        </ul>
                    </TooltipContent>
                </Tooltip>
            </div>
            <div class="flex justify-center">
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
            </div>
            <div class="flex justify-center">
                <Tooltip>
                    Right
                    <TooltipContent position='right' class='min-w-[200px] w-[400px] translate-x-0 -translate-y-2/4 text-[#EEEEEE] bg-[#444444] box-border shadow-[0_1px_8px_rgba(0,0,0,0.5)] transition-opacity duration-[0.8s] p-5 rounded-lg'>
                        <img src="https://picsum.photos/400/200?random=1" alt="Tooltip Demo" class="w-full h-auto rounded mb-3" />
                        <h3 class='text-[22px] font-bold'>Fade in Effect</h3>
                        <ul>
                            <li>This demo has fade in/out effect.</li>
                            <li>It is using CSS opacity, visibility, and transition.</li>
                        </ul>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>

        <div class='flex justify-center mb-12'>
            <Tooltip>
                Bottom
                <TooltipContent position='bottom' class={`bg-[#eeeeee] min-w-[400px] box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `}>
                    <img class='w-[400px] h-[250px] object-cover rounded mb-3' src="https://picsum.photos/400/250?random=2" alt="CSS Tooltip Demo" />
                    <h3 class='text-[22px] font-bold'>CSS Tooltip</h3>
                    <p>The CSS tooltip appears when user moves the mouse over an element.</p>
                </TooltipContent>
            </Tooltip>
        </div>

        {/* Additional color permutations */}
        <div class='grid grid-cols-4 gap-6 mb-12'>
            {samples.map((sample, i) => (
                <Tooltip>
                    <span class="px-4 py-2 rounded cursor-pointer hover:scale-105 transition-transform">
                        {sample.title}
                    </span>
                    <TooltipContent position={sample.position} class={`${sample.bg} ${sample.text} min-w-[250px] p-4 rounded-lg shadow-lg`}>
                        <h3 class='text-lg font-bold mb-2'>{sample.title}</h3>
                        <p>Position: {sample.position}</p>
                        <p>Style: Custom background color</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>

        {/* Static tooltips */}
        <div class='mt-8 p-6 bg-white rounded-lg shadow-md'>
            <h2 class='text-xl font-semibold mb-4'>Static & Multiple Tooltips</h2>
            <Tooltip>
                Hover for Multiple
                <TooltipContent position='top' static>
                    Top Static
                </TooltipContent>
                <TooltipContent position='bottom' static>
                    Bottom Static
                </TooltipContent>
                <TooltipContent position='left'>
                    Left Dynamic
                </TooltipContent>
                <TooltipContent position='right'>
                    Right Dynamic
                </TooltipContent>
            </Tooltip>
        </div>
    </div>
}

render(<Demo />, document.getElementById('app'))
