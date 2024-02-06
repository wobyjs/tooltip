import { Tooltip } from '../../lib'
import '../styles.css'

export const Header = () => <div class="flexContainer purpleGradient header">
    <div class="ribbon">
        <a
            class='text-[white]'
            href="https://github.com/justinrhodes1/woby-power-tooltip/fork"
        >
            Fork me on GitHub
        </a>
    </div>
    <h1>
        React-power-
        <span
            class='relative inline-block'
        >
            tooltip
            <Tooltip
                class='[&_span]:block [&_span]:cursor-pointer [&_span]:box-border
    [&_span_p]:text-[90%] [&_span_p]:font-normal [&_span_p]:leading-[12px] [&_span_p]:text-inherit [&_span_p]:opacity-0 [&_span_p]:p-0 [&_span_p]:m-0 [&_span_p]:mt-[6px]'
                padding='py-[15px] px-[20px]'
                show
                color="text-[black]"
                arrowAlign="center"
                position="bottom center"
                fontSize="13px"
                textboxWidth="auto"
                moveDown="-4px"
                static
            >
                <span>Simple &amp; Easy!</span>
            </Tooltip>
        </span>
    </h1>
    <br />
    <br />
    <br />
    <h2>A flexible, lightweight tooltip &amp; menu library. </h2>
    <div class="github-btn-bar flex flex-row justify-between w-[165px]">
        <a class="github-button" href="https://github.com/justinrhodes1/woby-power-tooltip" data-size="large" data-show-count="true" aria-label="Star justinrhodes1/woby-power-tooltip on GitHub">Star</a>
        <a class="github-button" href="https://github.com/justinrhodes1/woby-power-tooltip/fork" data-icon="octicon-repo-forked" data-size="large" aria-label="Fork justinrhodes1/woby-power-tooltip on GitHub">Fork</a>
    </div>
</div>
