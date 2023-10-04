# voby-power-tooltip

<img width="250px" src="https://media.giphy.com/media/Rd6sPjQFVHOSwe9rbW/giphy.gif" />

A **powerful** and **elegant** alternative for all your tooltips and menu needs.

- **Different Types** - For every use context: Choose between _Hoverable_, _Static_ &amp; _Alert_ tooltips.
- **Fully Customizable** - Easily change default settings via props
- **Reliable Positioning** - Align your tooltip to your
target element with ease
- Tailwind CSS
- React Hooks

## DEMO

Base on [react-power-tooltip](https://justinrhodes1.github.io/react-power-tooltip/) pages to see all use cases.

## Installation

### NPM

```bash
pnpm install voby-tooltip
```

## Usage

**Important**: Set the position of the hoverable parent component to *relative*.

```tsx
import { $, $$, useMemo } from 'voby'
import { Tooltip } from '../../../../lib'

export const AlignPositions = () => {
    const hover = $<string | boolean>(false)

    // const hoverHandler = (side: boolean) => setHover(side)

    return <div class='relative text-sm w-[250px]'>
        <Tooltip
            show={useMemo(() => $$(hover) === 'left')}
            position="left top"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Top</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'left')}
            position="left center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'left')}
            position="left bottom"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Bottom</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'right')}
            position="right top"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Top</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'right')}
            position="right center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'right')}
            position="right bottom"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Bottom</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'top')}
            position="top left"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Left</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'top')}
            position="top center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'top')}
            position="top right"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Right</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'bottom')}
            position="bottom left"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Left</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'bottom')}
            position="bottom center"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Center</span>
        </Tooltip>
        <Tooltip
            show={useMemo(() => $$(hover) === 'bottom')}
            position="bottom right"
            arrowAlign="center"
            textboxWidth="auto"
            static
        >
            <span>Right</span>
        </Tooltip>
        <div class="square purpleGradient">
            <div class='absolute w-full h-full flex items-center justify-center text-[15px]'>
                <div class='w-[70%] flex flex-row justify-between'>
                    <span>Left</span>
                    <span>Right</span>
                </div>
            </div>
            <div class='absolute w-full h-full flex items-center justify-center text-[15px]'>
                <div class='h-[70%] flex flex-col justify-between items-center'>
                    <span>Top</span>
                    <span>Bottom</span>
                </div>
            </div>
            <div
                class="left"
                onMouseEnter={() => hover('left')}
                onMouseLeave={() => hover(false)}
            />
            <div
                class="top"
                onMouseEnter={() => hover('top')}
                onMouseLeave={() => hover(false)}
            />
            <div
                class="right"
                onMouseEnter={() => hover('right')}
                onMouseLeave={() => hover(false)}
            />
            <div
                class="bottom"
                onMouseEnter={() => hover('bottom')}
                onMouseLeave={() => hover(false)}
            />
        </div>
    </div>
}

```
## API

| Props           | Types / Options                                           | Default             | Description                                                             |
| --------------- | --------------------------------------------------------- | ------------------- | ----------------------------------------------------------------------- |
| show            | bool: false, true                                         | false               | Mount tooltip if true.                                                  |
| fontFamily      | string: font family                                       | 'inherit'           | Font family of text                                                     |
| fontSize        | string: px                                                | 'inherit'           | Font size of text                                                       |
| fontWeight      | string                                                    | 'bold'              | Font weight of text                                                     |
| color           | string                                                    | 'inherit'           | Font color of text                                                      |
| animation       | string: fade _or_ bounce                                  | 'fade'              | Mount/Unmount anmation. Custom animations: See advanced usage examples. |
| hoverBackground | string: hex colors                                        | '#ececec'           | Background color on hover                                               |
| hoverColor      | string: hex colors                                        | '#000000'           | Font color on hover                                                     |
| backgroundColor | string: hex colors                                        | '#ffffff'           | Background color                                                        |
| alert           | string: rgb colors                                        | false               | Pulse animation                                                         |
| textboxWidth    | string: px _or_ auto                                      | '150px'             | Width of the text box                                                   |
| padding         | string: px                                                | '15px 20px'         | Padding of text                                                         |
| borderRadius    | string: px                                                | '5px'               | Radius of corners                                                       |
| zIndex          | string: number                                            | '100'               | Z-index of tooltip                                                      |
| moveDown        | string: px                                                | '0px'               | Downward position adjustment                                            |
| moveRight       | string: px                                                | '0px'               | Right position adjustment                                               |
| static          | boolean: false _or_ true                                  | false               | Disable hover animations                                                |
| flat            | boolean: false _or_ true                                  | false               | Disable shadows                                                         |
| lineSeparated   | boolean: false _or_ true _or_ string: css border property | '1px solid #ececec' | Enable &mp; specify line separation between options                     |
| arrowAlign      | string: 'start' _or_ 'center' _or_ 'end'                  | 'start'             | Positions arrow relative to textbox                                     |
| position        | string: 'position1 position2'                             | 'right center'      | Positions tooltip relative to target element                            |



## Development

You're welcome to contribute to voby-power-tooltip.

To set up the project:

1.  Fork and clone the repository
2.  `$ npm install`
3.  `$ npm run dev`

The demo page will then be served on http://localhost:8000/ in watch mode, meaning you don't have refresh the page to see your changes.

## Contributors

<table>
  <tbody>
    <tr>
      <td align="center">
        <img src="https://github.com/justinrhodes1.png" width="120">
        <br />
        <a href="https://github.com/justinrhodes1">Justin Rhodes<a/>
      </td>
    </tr>
  </tbody>
</table>

## License

MIT