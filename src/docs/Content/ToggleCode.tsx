import React, { useState, ReactNode, useRef, useEffect } from 'react'
import ArrowUp from '../../assets/arrow-up.svg'
import ArrowDown from '../../assets/arrow-down.svg'
import Prism from 'prismjs'

export const ToggleCode = (props: { children?: ReactNode }) => {
    const [open, setOpen] = useState(false)

    //   componentDidUpdate() {
    //     // eslint-disable-next-line
    //     Prism.highlightAll();
    //   }

    const codeBlockRef = useRef()
    useEffect(() => {
        if (codeBlockRef.current)
            Prism.highlightAll()
    }, [codeBlockRef])

    const clickHandler = () => setOpen(!open)


    const { children } = props
    const SVG = open ? ArrowUp : ArrowDown

    return <>
        <div ref={codeBlockRef}
            className="toggleCode"
            role="button"
            tabIndex={0}
            onClick={clickHandler}
        >
            <span>{open ? 'Hide Code Example' : 'Show Code Example'}</span>
            <img
                className='ml-[8px] w-[10px]'
                src={SVG}
                alt=""
            />
        </div>
        {open ? children : null}
    </>
}