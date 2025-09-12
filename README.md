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
pnpm i woby woby-styled use-woby @woby/tooltip
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


### **Requirements**

- **Woby.js**: For observables and reactivity.
- **Tailwind CSS**: For utility-first styling.
- **Woby-styled**: For styled components with dynamic styles.

---

### **License**

This component is open-source under the [MIT License](https://opensource.org/licenses/MIT). Contributions and feedback are welcome!