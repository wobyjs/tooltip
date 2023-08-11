import React from 'react' //
import clsx from 'clsx'

export const Arrow = ({ isHovered, hovBkg, bkgCol, flat }) => {
    const backgroundColor = isHovered ? hovBkg : bkgCol
    // const boxShadow = flat ? null : '0 0 0 1px rgba(0,0,0,.18)'
    const boxShadow = flat ? null : 'box-shadow[0_0_0_1px_rgba(0,0,0,.18)]'

    return (
        <div
            className={clsx(`rotate-45 w-[15px] h-[15px] m-[3px] z-[1]`, backgroundColor, boxShadow)}
        />
    )
}

