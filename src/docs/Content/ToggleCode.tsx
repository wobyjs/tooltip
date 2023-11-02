import { $, $$, Child, useEffect, useMemo } from 'woby'
// import Prism from 'prismjs' // Make sure to import Prism
// import 'prismjs/themes/prism.css' // Import the desired Prism theme CSS
import ArrowUp from '../../../svgx/src/assets/arrow-up'
import ArrowDown from '../../../svgx/src/assets/arrow-down'

export const ToggleCode = ({ children }: { children?: Child }) => {
    const open = $(false)

    // useEffect(() => {
    //     Prism.highlightAll()
    // })

    const clickHandler = () => {
        open(!open())
    }

    const SVG = useMemo(() => $$(open) ? ArrowUp : ArrowDown)

    return <>
        <div
            className="toggleCode"
            role="button"
            tabIndex={0}
            onClick={clickHandler}
        >
            <span>{() => $$(open) ? 'Hide Code Example' : 'Show Code Example'}</span>
            <img class='ml-[8px] w-[10px] inline-block' src={SVG} alt="" />
            <div class={[() => $$(open) ? 'display' : 'hidden']}>{children}</div>
        </div>
    </>
}

