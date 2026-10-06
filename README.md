# @woby/tooltip

### Tooltip Component Documentation

This documentation explains the `Tooltip` and `TooltipContent` components designed for flexible tooltip positioning and styling in a web application using **Woby.js** and **Tailwind CSS**.

---

### **Overview**

This tooltip system provides:
- **Dynamic positioning** (`top`, `right`, `bottom`, `left`).
- **Customizable styles** for tooltips and arrows.
- **Automatic tooltip visibility** on hover.
- Integration with **Tailwind CSS** and **Woby.js observables** for reactivity.

---

### Installation

```ps
pnpm i woby @woby/styled @woby/use @woby/tooltip
```

### **Usage**

#### **Basic Tooltip Example**

```tsx
import { Tooltip, TooltipContent } from './Tooltip';

const App = () => (
  <div class="flex items-center justify-center h-screen">
    <Tooltip>
      Hover me
      <TooltipContent position="top">
        <p>This is a tooltip!</p>
      </TooltipContent>
    </Tooltip>
  </div>
);

export default App;
```

---

### **Props**

#### **Tooltip**
| Prop Name | Type                             | Default              | Description                                  |
|-----------|----------------------------------|----------------------|----------------------------------------------|
| `children`| `JSX.Element`                   | `undefined`          | The content inside the tooltip container.   |
| `class`   | `string`                        | `tooltipDef`         | Custom class for tooltip container.         |
| `className`| `string`                       | `undefined`          | Additional class for tooltip container.     |

#### **TooltipContent**
| Prop Name      | Type                                      | Default    | Description                                                                 |
|----------------|-------------------------------------------|------------|-----------------------------------------------------------------------------|
| `position`     | `'top' | 'right' | 'bottom' | 'left'`     | `'top'`   | Tooltip position relative to its parent.                                   |
| `arrowLocation`| `ObservableMaybe<string \| number>`        | `'50%'`    | Arrow's location relative to the tooltip (`50%` for centered).             |
| `arrowSize`    | `ObservableMaybe<string \| number>`        | `'12px'`   | Arrow size.                                                                |
| `static`       | `ObservableMaybe<boolean>`               | `false`    | If `true`, keeps the tooltip always visible.                               |
| `class`        | `string`                                 | Dynamic    | Dynamic class for tooltip styling based on position.                       |
| `style`        | `ObservableMaybe<CSSStyleDeclaration>`   | `undefined`| Custom styles for tooltip content.                                         |

---

### **Advanced Examples**

#### **Dynamic Arrow Size and Location**

```tsx
<Tooltip>
  Hover for details
  <TooltipContent 
    position="right" 
    arrowLocation="75%" 
    arrowSize="16px"
  >
    <p>Tooltip with a custom arrow size and location.</p>
  </TooltipContent>
</Tooltip>
```

#### **Custom Styling**

You can override default styles using Tailwind classes or inline styles:

```tsx
<Tooltip class="bg-blue-500 text-white p-2 rounded">
  Hover for info
  <TooltipContent 
    position="bottom" 
    class="bg-yellow-300 text-black shadow-lg"
    arrowSize="8px"
  >
    <p>Custom styled tooltip!</p>
  </TooltipContent>
</Tooltip>
```

---

### **Theming (CSS Custom Properties)**

`TooltipContent`'s default styling (used whenever `class`/`cls` is not overridden) is driven by CSS custom properties instead of hardcoded colors, so it can respond to a host app's theme without needing per-instance class overrides:

| Custom Property     | Default Fallback | Applies To                      |
|---------------------|-------------------|----------------------------------|
| `--tooltip-bg`      | `#eeeeee`         | Tooltip background color        |
| `--tooltip-fg`      | `#000000`         | Tooltip text color               |
| `--tooltip-border`  | `#000000`         | Tooltip border color             |
| `--tooltip-shadow`  | `#000000`         | Tooltip drop-shadow color        |

Set these on `:root` (or any ancestor, including inside a shadow root) to retheme every default-styled tooltip in the app:

```css
:root {
  --tooltip-bg: #1e293b;
  --tooltip-fg: #f8fafc;
  --tooltip-border: #334155;
  --tooltip-shadow: #000000;
}
```

To support multiple themes, map these properties from your own theme tokens per `data-theme` value:

```css
:root[data-theme="dark"] {
  --tooltip-bg: var(--qm-pop);
  --tooltip-fg: var(--qm-ink);
}
```

Properties set on `document.documentElement` cascade correctly through shadow DOM into `woby-tooltip-content`'s internally rendered markup, since CSS custom properties inherit across shadow boundaries. An explicit `class`/`cls` override on a given `<TooltipContent>` instance (e.g. `class="bg-yellow-300 text-black"`) takes precedence for that instance and is unaffected by these variables.

---

### **Requirements**

- **Woby.js**: For observables and reactivity.
- **Tailwind CSS**: For utility-first styling.
- **@woby/styled**: For styled components with dynamic styles.

---

### **License**

This component is open-source under the [MIT License](https://opensource.org/licenses/MIT). Contributions and feedback are welcome!