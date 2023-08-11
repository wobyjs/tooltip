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
                        show
                        textboxWidth="150px"
                        lineSeparated
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
                        show
                        textboxWidth="150px"
                        lineSeparated
                        static
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
                        show
                        textboxWidth="150px"
                        alert="rgb(100, 0, 100)"
                        lineSeparated
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
