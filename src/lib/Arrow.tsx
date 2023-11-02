import { $$, ObservableMaybe, useMemo, type JSX } from 'woby'
//

export const Arrow = ({ isHovered, hovBkg, bkgCol, flat }: { isHovered: ObservableMaybe<boolean>, hovBkg: ObservableMaybe<string>, bkgCol: ObservableMaybe<string>, flat?: ObservableMaybe<boolean> }): JSX.Element => {
    const backgroundColor = useMemo(() => $$(isHovered) ? $$(hovBkg) : $$(bkgCol))
    // const boxShadow = flat ? null : 'shadow-[rgba(0,0,0,.18)0_0_0_1px]'
    const boxShadow = useMemo(() => $$(flat) ? null : '[box-shadow:rgba(0,0,0,0.18)0px_0px_0px_1px]')

    return <div class={[`rotate-45 w-[15px] h-[15px] m-[3px] z-[1]`, backgroundColor, boxShadow]} />
}
