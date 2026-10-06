import { $$, $, ObservableMaybe, useMemo, defaults, customElement, HtmlBoolean, type ElementAttributes, type JSX } from 'woby'


const arrowDefs = () => ({
    // Component-specific props - ALL must use $() for reactivity
    isHovered: $(false, HtmlBoolean) as ObservableMaybe<boolean>,
    hovBkg: $('bg-[#ececec]') as ObservableMaybe<string>,
    bkgCol: $('bg-[white]') as ObservableMaybe<string>,
    flat: $(false, HtmlBoolean) as ObservableMaybe<boolean>,

    // Override and append class contract
    cls: $('') as ObservableMaybe<string>,
    class: $('') as ObservableMaybe<string>,
})

export const Arrow = defaults(arrowDefs, (props) => {
    const { isHovered, hovBkg, bkgCol, flat, cls, class: className } = props

    const backgroundColor = useMemo(() => $$(isHovered) ? $$(hovBkg) : $$(bkgCol))
    const boxShadow = useMemo(() => $$(flat) ? null : '[box-shadow:rgba(0,0,0,0.18)0px_0px_0px_1px]')

    return <div class={[`rotate-45 w-[14px] h-[14px] m-[3px] z-[1]`, backgroundColor, boxShadow, () => $$(cls) ?? '', className]} />
})

customElement('woby-arrow', Arrow)

declare module 'woby' {
    namespace JSX {
        interface IntrinsicElements {
            'woby-arrow': ElementAttributes<typeof Arrow>
        }
    }
}
