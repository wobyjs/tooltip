import { $$, $, useEffect, useMemo, defaults, customElement, HtmlBoolean, HtmlClass, HtmlString, type ElementAttributes, type ObservableMaybe, type Observable, type JSX, type Child } from 'woby'

import { styled } from '@woby/styled'
// import { useComputedStyle } from '@woby/use'

const tooltipDef = `
[&:hover_.tpcontents]:visible [&:hover_.tpcontents]:opacity-100
`

// tp-trigger is a JS hook class used by TooltipContent to find its parent trigger
const tooltip = `inline-block relative tp-trigger
[&:hover_.tpcontents]:visible [&:hover_.tpcontents]:opacity-100
`

// Theme hook: consuming apps may set --tooltip-bg/--tooltip-fg/--tooltip-border/--tooltip-shadow
// on any ancestor (e.g. :root[data-theme="..."]) to recolor every tooltip; these custom
// properties inherit through the shadow-DOM boundary like any other CSS var. Defaults below
// (light bg, black text) reproduce the pre-upgrade hardcoded look for apps that set nothing.
const topDef = `bg-[var(--tooltip-bg,#eeeeee)] text-[var(--tooltip-fg,#000000)] min-w-max box-border border shadow-[0_1px_8px_var(--tooltip-shadow,#000000)] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[var(--tooltip-border,#000000)] `
const top_i = `absolute overflow-hidden top-full after:content-[''] after:absolute after:-translate-x-2/4 after:-translate-y-2/4 after:rotate-45 after:left-2/4 `

const rightDef = `bg-[var(--tooltip-bg,#eeeeee)] text-[var(--tooltip-fg,#000000)] min-w-max box-border border shadow-[0_1px_8px_var(--tooltip-shadow,#000000)] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[var(--tooltip-border,#000000)] `
const right_i = `absolute overflow-hidden right-full after:content-[''] after:absolute after:translate-x-2/4 after:-translate-y-2/4 after:-rotate-45 after:left-0 after:top-2/4 `

const bottomDef = `bg-[var(--tooltip-bg,#eeeeee)] text-[var(--tooltip-fg,#000000)] min-w-max box-border border shadow-[0_1px_8px_var(--tooltip-shadow,#000000)] transition-opacity duration-[0.5s] px-5 py-2.5 rounded-lg border-solid border-[var(--tooltip-border,#000000)] `
const bottom_i = `absolute overflow-hidden bottom-full after:content-[''] after:absolute after:-translate-x-2/4 after:translate-y-2/4 after:rotate-45 after:left-2/4 `

const leftDef = `bg-[var(--tooltip-bg,#eeeeee)] text-[var(--tooltip-fg,#000000)] min-w-max box-border border shadow-[0_1px_8px_var(--tooltip-shadow,#000000)] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[var(--tooltip-border,#000000)] `
const left_i = `absolute overflow-hidden left-full after:content-[''] after:absolute after:-translate-x-2/4 after:-translate-y-2/4 after:-rotate-45 after:left-0 after:top-2/4 `


// --- Tooltip ---

const tooltipDefs = () => ({
    cls: $('', HtmlClass) as ObservableMaybe<string>,
    class: $('', HtmlClass) as ObservableMaybe<string>,
    children: $<Child>() as ObservableMaybe<Child>,
})

export const Tooltip = defaults(tooltipDefs, (props) => {
    const { children, cls, class: className, ...rest } = props
    return (
        <div
            class={[tooltip, () => $$(cls) || tooltipDef, className]}
            {...rest}
        >
            {children}
        </div>
    )
})

customElement('woby-tooltip', Tooltip)


// --- TooltipContent ---

function cssMultiply(value: ObservableMaybe<string>, multiplier: number): string {
    const val = $$(value)
    const match = val.match(/^(-?\d*\.?\d+)([a-z%]*)$/)

    if (!match)
        throw new Error(`Invalid CSS unit: ${val}`)

    const [, numericValue, unit] = match
    const result = (numericValue ? +numericValue : 0) * multiplier

    return `${result}${unit}`
}

const x2 = (value: ObservableMaybe<string>) => cssMultiply(value, 2)

export type PositionType = 'top' | 'right' | 'bottom' | 'left'

const tooltipContentDefs = () => ({
    cls: $('', HtmlClass) as ObservableMaybe<string>,
    class: $('', HtmlClass) as ObservableMaybe<string>,
    static: $(false, HtmlBoolean) as ObservableMaybe<boolean>,
    position: $('top') as ObservableMaybe<PositionType>,
    arrowLocation: $('50%', HtmlString) as ObservableMaybe<string>,
    arrowSize: $('12px', HtmlString) as ObservableMaybe<string>,
    pointerEvents: $(false, HtmlBoolean) as ObservableMaybe<boolean>,
    children: $<Child>() as ObservableMaybe<Child>,
    style: undefined as any,
})

export const TooltipContent = defaults(tooltipContentDefs, (props) => {
    const { children, style, cls, class: className, static: st, position, arrowLocation, arrowSize, pointerEvents, ...rest } = props

    // Compute default class based on position when cls not provided
    const computedCls = useMemo(() => {
        const c = $$(cls)
        if (c) return c
        switch ($$(position)) {
            case 'top': return topDef
            case 'left': return leftDef
            case 'right': return rightDef
            case 'bottom': return bottomDef
            default: return topDef
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

    const tooltipRef = $<HTMLDivElement>()
    const ir = $<HTMLElement>()

    // Fixed positioning: computed on mouseenter of the nearest .tp-trigger ancestor.
    // position: fixed escapes overflow:hidden/auto clipping from scroll containers.
    const posStyle = $<Record<string, string>>({ position: 'fixed', left: '-9999px', top: '-9999px' })

    useEffect(() => {
        const el = $$(tooltipRef)
        if (!el) return

        const trigger = el.closest('.tp-trigger') as HTMLElement
        if (!trigger) return

        const update = () => {
            const rect = trigger.getBoundingClientRect()
            const gap = 6
            const pos = $$(position) as PositionType

            switch (pos) {
                case 'top':
                    posStyle({
                        position: 'fixed',
                        left: `${rect.left + rect.width / 2}px`,
                        top: `${rect.top - gap}px`,
                        transform: 'translateX(-50%) translateY(-100%)',
                    })
                    break
                case 'bottom':
                    posStyle({
                        position: 'fixed',
                        left: `${rect.left + rect.width / 2}px`,
                        top: `${rect.bottom + gap}px`,
                        transform: 'translateX(-50%)',
                    })
                    break
                case 'left':
                    posStyle({
                        position: 'fixed',
                        left: `${rect.left - gap}px`,
                        top: `${rect.top + rect.height / 2}px`,
                        transform: 'translateX(-100%) translateY(-50%)',
                    })
                    break
                case 'right':
                    posStyle({
                        position: 'fixed',
                        left: `${rect.right + gap}px`,
                        top: `${rect.top + rect.height / 2}px`,
                        transform: 'translateY(-50%)',
                    })
                    break
            }
        }

        trigger.addEventListener('mouseenter', update)
        return () => trigger.removeEventListener('mouseenter', update)
    })

    // TODO: Re-enable when useComputedStyle import is fixed
    // const sty = useComputedStyle(tooltipRef, ['background-color', /^border-(?!.*-radius$)/, 'box-shadow'])
    const sty = $({})

    return (
        <div
            ref={tooltipRef}
            class={[
                'z-[99999999]',
                computedCls,
                () => $$(st) ? '' : 'invisible opacity-0',
                () => $$(pointerEvents) ? '' : 'pointer-events-none',
                className,
                'tpcontents',
            ]}
            style={[style, posStyle]}
            {...rest}
        >
            {children}
            {() => <i ref={ir} class={[ii, styled`
                &::after{
                    ${Object.keys($$(sty)).map(k => `${k}:${$$(sty)[k]};\n`).join('')}
                }
            `]} style={ali}></i>}
        </div>
    )
})

customElement('woby-tooltip-content', TooltipContent)

declare module 'woby' {
    namespace JSX {
        interface IntrinsicElements {
            'woby-tooltip': ElementAttributes<typeof Tooltip>
            'woby-tooltip-content': ElementAttributes<typeof TooltipContent>
        }
    }
}
