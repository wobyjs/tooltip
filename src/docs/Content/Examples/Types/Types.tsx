import { Tooltip } from '../../../../lib'

const Types = () => {
    return (
        <div class="row types w-[95%] justify-around">
            <div>
                <p>
                    <strong>Hoverable </strong>
                    (default)
                </p>
                <div class="vPlaceHolder">
                    <Tooltip
                        class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                        padding='py-[15px] px-[20px]'
                        show
                        textboxWidth="150px"
                        lineSeparated
                        position='right center'
                    >
                        <span>Our Technology</span>
                        <span>Our story</span>
                    </Tooltip>
                </div>
            </div>
            <div>
                <p>
                    <strong>Static </strong>
                    (via static prop)
                </p>
                <div class="vPlaceHolder">
                    <Tooltip
                        class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                        padding='py-[15px] px-[20px]'
                        show
                        textboxWidth="150px"
                        lineSeparated
                        static
                        position='right center'
                    >
                        <span>Our story:</span>
                        <span>Show static text which provides some additional information.</span>
                    </Tooltip>
                </div>
            </div>
            <div>
                <p>
                    <strong>Alert </strong>
                    (via alert prop)
                </p>
                <div class="vPlaceHolder">
                    <Tooltip
                        class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                        padding='py-[15px] px-[20px]'
                        show
                        textboxWidth="150px"
                        alert="rgb(100, 0, 100)"
                        lineSeparated
                        position='right center'
                    >
                        <span>Our Technology</span>
                        <span>Our story</span>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default Types
