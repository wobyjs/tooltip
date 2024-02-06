import { useEffect, $ } from 'woby'
import { Tooltip } from '../../../../lib'
import logo from '../../../../assets/logo.svg'

export const Alert = () => {
    const alternate = $(false)

    // useEffect(() => {
    setInterval(() => {
        alternate(!alternate())
    }, 5000)
    // })

    return <>
        <h3 class='mt-[25px]'>Static alert example</h3>
        <div class='mt-[5px] mx-auto mb-[30px] py-0 px-[30px] w-full border-solid border-[lightgrey]
                h-[65px] bg-[white] text-[12px] flex flex-row justify-between items-center'>
            <img
                src={logo}
                class='h-[60%] left-[50px]'
                alt=""
            />
            <div class='text-[13px] font-bold w-[190px] flex justify-between'
            >
                <span
                    class='relative ml-[30px]'
                >
                    Shopping Cart
                    <Tooltip
                        class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                        show={alternate}
                        padding='py-[15px] px-[20px]'
                        hoverBackground="bg-[#3b0586]"
                        hoverColor="white"
                        textboxWidth="150px"
                        animation="bounce"
                        arrowAlign="start"
                        position="bottom center"
                        alert="rgb(51,22,236)"
                        static
                    >
                        <span>New Item added!</span>
                    </Tooltip>
                </span>
                <span>Contact</span>
            </div>
        </div>
    </>
}