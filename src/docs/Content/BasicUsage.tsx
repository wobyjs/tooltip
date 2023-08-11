import { codeBasicComp, codeBasicTp } from './CodeSnippets'

export const BasicUsage = () => <>
    <h1>Basic Usage</h1>
    <h3>
        1) Import the tooltip into your stateful react component file (see below).
    </h3>
    <pre>
        <code class="language-javascript">
            import Tooltip from &#39;voby-power-tooltip&#39;
        </code>
    </pre>
    <h3 class='pt-2.5 pb-0 px-0'>
        2) Add a hover state &amp; mouse event handler to the enclosing target component.
    </h3>
    <h3 class='pt-0 pb-2.5 px-0'>
        <b> Important: </b>
        Set the position of the target component to
        <i> relative</i>
        .
    </h3>
    <pre>
        <code class="language-javascript">
            {codeBasicComp}
        </code>
    </pre>
    <h3>
        3) Add the tooltip inside the target element.
    </h3>
    <pre>
        <code class="language-javascript">
            {codeBasicTp}
        </code>
    </pre>
</>
