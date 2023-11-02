

import { codeInstallNpm } from './CodeSnippets'

export const Intro = () => <>
    <h1 class="pt-[75px]">Introduction</h1>
    <div class='mt-[15px]'>
        <img
            class='inline-block'
            src="https://img.shields.io/travis/justinrhodes1/woby-power-tooltip.svg"
            alt=""
        />
        <img
            class='my-0 mx-[20px] inline-block'
            src="https://img.shields.io/coveralls/github/justinrhodes1/woby-power-tooltip/master.svg"
            alt=""
        />
        <img
            class='inline-block'
            src="https://img.shields.io/bundlephobia/minzip/woby-power-tooltip.svg"
            alt=""
        />
    </div>
    <p class='leading-[1.5] mb-0'>
        React-power-tooltip is a powerful, fully customizable tooltip library. Besides the
        traditional tooltip purposes you can easily also use it as your popup or menu library:
    </p>
    <h3 class='leading-[2] p-0'>
        <ol class='list-decimal block [margin-block-start:1em] [margin-block-end:1em] [margin-inline-start:0px] [margin-inline-end:0px] [padding-inline-start:40px]'>
            <li class='cursor-default'>
                <strong>Ready-to-use defaults: </strong>
                Choose between hoverable, static &amp; alert tooltips.
            </li>
            <li class='cursor-default'>
                <strong>Fully customizable: </strong>
                Easily customize animations &amp; styles to your wishes.
            </li>
            <li class='cursor-default'>
                <strong>Pixel perfect positioning: </strong>
                Easily align your tooltip to your target element.
            </li>
            <li class='cursor-default'>
                <strong>No dependencies: </strong>
                no side-strings attached.
            </li>
        </ol>
    </h3>

    <p class='leading-[1.5] font-bold'>
        We are always open new ideas and improvements. Contribute on
        <a href="https://github.com/justinrhodes1/woby-power-tooltip/blob/master/CONTRIBUTING.md" class='text-[16px] text-[#680988]'> GitHub</a>
        !
    </p>
    <h1 class='pt-[30px]'>Installation</h1>
    <h2>Npm</h2>
    <pre>
        <code class='text-[#404040]'>{codeInstallNpm}</code>
    </pre>
</>
