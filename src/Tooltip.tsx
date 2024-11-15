import { $$, $, useEffect, ObservableMaybe, Observable, isObservable, useMemo, getMeta, type JSX } from 'woby'

//https://www.menucool.com/tooltip/css-tooltip


import { styled } from 'woby-styled'
import { useComputedStyle, useInvert } from 'use-woby'

const tooltipDef = `text-left border-b-[#666] border-b border-dotted 
[&:hover_.tpcontents]:visible [&:hover_.tpcontents]:opacity-100
`

const tooltip = `inline-block relative 
[&:hover_.tpcontents]:visible [&:hover_.tpcontents]:opacity-100
`

const topDef = `bg-[#eeeeee] min-w-max box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `
const top = `absolute z-[99999999] left-2/4 -top-5 `

const top_i = `absolute overflow-hidden top-full after:content-[''] after:absolute after:-translate-x-2/4 after:-translate-y-2/4 after:rotate-45 after:left-2/4 `

const rightDef = `bg-[#eeeeee] min-w-max box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `
const right = `absolute z-[99999999] ml-5 left-full top-2/4 `
const right_i = `absolute overflow-hidden right-full after:content-[''] after:absolute after:translate-x-2/4 after:-translate-y-2/4 after:-rotate-45 after:left-0 after:top-2/4 `

const bottomDef = `bg-[#eeeeee] min-w-max box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `
const bottom = `absolute z-[99999999] left-2/4 top-10 `
const bottom_i = `absolute overflow-hidden bottom-full after:content-[''] after:absolute after:-translate-x-2/4 after:translate-y-2/4 after:rotate-45 after:left-2/4 `

const leftDef = `bg-[#eeeeee] min-w-max box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `
const left = `absolute z-[99999999] mr-5 right-full top-2/4 `
const left_i = `absolute overflow-hidden left-full after:content-[''] after:absolute after:-translate-x-2/4 after:-translate-y-2/4 after:-rotate-45 after:left-0 after:top-2/4 `


export const Tooltip = ({ children, class: cls = tooltipDef, className, ...props }: JSX.HTMLAttributes<HTMLDivElement>) => {
    return <div class={[tooltip, cls, className]} >
        {children}
    </div>
}

function cssMultiply(value: ObservableMaybe<string | number>, multiplier: number): string {
    const match = ($$(value) + '').match(/^(-?\d*\.?\d+)([a-z%]*)$/);

    if (!match)
        throw new Error(`Invalid CSS unit: ${$$(value)}`);

    const [, numericValue, unit] = match
    const result = +numericValue * multiplier

    return `${result}${unit}`
}

const x2 = (value: ObservableMaybe<string | number>) => cssMultiply(value, 2)

const translate = (x: ObservableMaybe<string>, y: ObservableMaybe<string>) => `translate(${$$(x)}, ${$$(y)})`

export type PositionType = 'top' | 'right' | 'bottom' | 'left'
export const TooltipContent = ({ children, style, class: cls = $(), className, static: st, position = 'top', arrowLocation = '50%', arrowSize = '12px', ...props }: JSX.HTMLAttributes<HTMLDivElement> &
{
    position?: ObservableMaybe<PositionType>,
    arrowLocation?: ObservableMaybe<string | number>,
    arrowSize?: ObservableMaybe<string | number>,
    static?: ObservableMaybe<boolean>,
}) => {
    const setDef = () => {
        if (!$$(cls))
            switch ($$(position)) {
                case 'top': (cls as Observable<string>)(topDef)
                case 'left': (cls as Observable<string>)(leftDef)
                case 'right': (cls as Observable<string>)(rightDef)
                case 'bottom': (cls as Observable<string>)(bottomDef)
            }
    }
    useEffect(setDef)
    setDef()

    const pos = useMemo(() => {
        switch ($$(position)) {
            case 'top': return top
            case 'right': return right
            case 'bottom': return bottom
            case 'left': return left
        }
    })
    const transform = useMemo(() => {
        switch ($$(position)) {
            case 'top': return translate('-' + $$(arrowLocation), '-100%')
            case 'left':
            case 'right': return translate('0', '-' + $$(arrowLocation))
            case 'bottom': return translate('-' + $$(arrowLocation), '0')
        }
    })
    const ali = useMemo(() => {
        switch ($$(position)) {
            case 'bottom':
            case 'top': return { left: arrowLocation }
            case 'left':
            case 'right': return { top: arrowLocation }
        }
    })
    const ii = useMemo(() => {
        switch ($$(position)) {
            case 'top': return top_i + styled`  
                margin-left:-${$$(arrowSize)};
                width:${x2(arrowSize)};
                height:${$$(arrowSize)};

                &::after{
                    width:${$$(arrowSize)};
                    height:${$$(arrowSize)};
                }
     `
            case 'right': return right_i + styled`  
                margin-top:-${$$(arrowSize)};
                width:${$$(arrowSize)};
                height:${x2(arrowSize)};

                &::after{
                    width:${$$(arrowSize)};
                    height:${$$(arrowSize)};
                }
     `
            case 'bottom': return bottom_i + styled`  
                margin-left:-${$$(arrowSize)};
                width:${x2(arrowSize)};
                height:${$$(arrowSize)};

                &::after{
                    width:${$$(arrowSize)};
                    height:${$$(arrowSize)};
                }
     `
            case 'left': return left_i + styled`  
                margin-top:-${$$(arrowSize)};
                width:${$$(arrowSize)};
                height:${x2(arrowSize)};

                &::after{
                    width:${$$(arrowSize)};
                    height:${$$(arrowSize)};
                }
     `
        }
    })

    const tp = $<HTMLDivElement>()
    const ir = $<HTMLElement>()

    const sty = useComputedStyle(tp, ['background-color', /^border-(?!.*-radius$)/, 'box-shadow'])
    // useEffect(() => console.log($$(sty)))
    return <div ref={tp} class={[pos, cls, () => $$(st) ? '' : 'invisible opacity-0', className, 'tpcontents']} style={[style, { transform }]} {...props}>
        {children}
        {() => <i ref={ir} class={[ii, styled`
                &::after{
                    ${Object.keys($$(sty)).map(k => `${k}:${$$(sty)[k]};\n`).join('')}
                }
            `]} style={ali}></i>}
    </div>
}
