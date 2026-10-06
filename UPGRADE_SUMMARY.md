# Tooltip Library Upgrade Summary

## Overview

Upgraded the `@woby/tooltip` library to align with `/dom`, `/dom-customelement`, and `/woby` skill requirements for web component reactivity.

## Changes Made

### 1. **src/lib/Tooltip.tsx** - Converted to use `defaults()` pattern

**Before:**
- Plain function component without `defaults()`
- Props were not reactive when used as CustomElement
- Attributes set via HTML would not update component state

**After:**
- Wrapped with `defaults(tooltipDefs, (props) => { ... })`
- All props declared in `defaults()` with `$()` for reactivity
- Proper HTML type converters (`HtmlString`, `HtmlBoolean`)
- CustomElement registered: `'woby-tooltip-lib'`
- Follows `cls` override, `class` append contract

**Key improvements:**
- ✅ All props use `$()` in defaults for reactivity
- ✅ HTML attributes are now reactive (e.g., `position`, `hoverBackground`)
- ✅ Proper type conversion with `HtmlString` and `HtmlBoolean`
- ✅ CustomElement works with HTML attributes
- ✅ Position logic is reactive using `useMemo()`

### 2. **src/lib/TextBox.tsx** - Converted to use `defaults()` pattern

**Before:**
- Plain function component
- Props not reactive for CustomElement usage

**After:**
- Wrapped with `defaults(textBoxDefs, (props) => { ... })`
- All props declared with `$()` for reactivity
- CustomElement registered: `'woby-text-box'`
- Proper class contract with `cls` and `class` props

**Key improvements:**
- ✅ Props reactive when passed from parent
- ✅ Works as standalone CustomElement
- ✅ Proper prop forwarding

### 3. **src/lib/Arrow.tsx** - Converted to use `defaults()` pattern

**Before:**
- Simple function component without `defaults()`

**After:**
- Wrapped with `defaults(arrowDefs, (props) => { ... })`
- All props declared with `$()` for reactivity
- CustomElement registered: `'woby-arrow'`

**Key improvements:**
- ✅ Reactive when used as CustomElement
- ✅ Proper `cls`/`class` contract

### 4. **src/Tooltip.tsx** - Already using `defaults()` correctly

This file was already properly structured with:
- ✅ `defaults()` pattern
- ✅ CustomElement registration: `'woby-tooltip'` and `'woby-tooltip-content'`
- ✅ Proper `cls` override, `class` append contract
- ✅ Reactive position styling with `useMemo()`

## Pattern Compliance

All components now follow the **Woby CustomElement pattern**:

```typescript
// 1. Define defaults with $() for reactive props
const componentDefs = () => ({
    cls: $('') as ObservableMaybe<string>,      // Override
    class: $('') as ObservableMaybe<string>,     // Append
    // ... other props with $()
})

// 2. Wrap with defaults()
export const Component = defaults(componentDefs, (props) => {
    const { cls, class: className, ...rest } = props

    // 3. cls overrides defaults, class appends
    return (
        <div class={[() => $$(cls) ?? 'default-styles', className]} {...rest}>
            {/* content */}
        </div>
    )
})

// 4. Register as CustomElement
customElement('component-name', Component)

// 5. Declare TypeScript types
declare module 'woby' {
    namespace JSX {
        interface IntrinsicElements {
            'component-name': ElementAttributes<typeof Component>
        }
    }
}
```

## Reactivity Verification

Created `test-reactivity.html` to verify:

1. **Attribute Initialization** - HTML attributes appear in component
2. **Attribute Reactivity** - `setAttribute()` updates component
3. **Type Conversion** - `HtmlString`, `HtmlBoolean` work correctly
4. **Class Contract** - `cls` overrides, `class` appends

### Test Examples:

```html
<!-- Reactive position attribute -->
<woby-tooltip-content position="top"></woby-tooltip-content>
<script>
element.setAttribute('position', 'bottom') // Component updates reactively
</script>

<!-- cls override, class append -->
<woby-tooltip cls="custom-override" class="shadow-lg">
  <!-- Result: "custom-override shadow-lg" (no defaults) -->
</woby-tooltip>
```

## Why This Matters

### The Problem Before

Without `defaults()`, HTML attributes were not reactive:

```typescript
// ❌ WRONG: Non-reactive
const Component = ({ value }) => <div>{value}</div>
customElement('my-component', Component)
```

```html
<my-component value="initial"></my-component>
<script>
element.setAttribute('value', 'changed') // Component doesn't update!
</script>
```

### The Solution After

With `defaults()`, all props are reactive:

```typescript
// ✅ CORRECT: Reactive
const Component = defaults(() => ({
    value: $('')  // $() makes it reactive
}), ({ value }) => <div>{value}</div>)
customElement('my-component', Component)
```

```html
<my-component value="initial"></my-component>
<script>
element.setAttribute('value', 'changed') // Component updates! ✅
</script>
```

## Key Takeaways

1. **Always use `defaults()`** for CustomElements
2. **All props must have `$()`** in defaults for reactivity
3. **Use type converters** (`HtmlString`, `HtmlBoolean`, `HtmlNumber`)
4. **Follow cls/class contract**: `cls` overrides, `class` appends
5. **Register CustomElement** in the same file as the component
6. **Use `useMemo()`** for reactive derived values

## Files Modified

- ✅ `src/lib/Tooltip.tsx` - Converted to defaults()
- ✅ `src/lib/TextBox.tsx` - Converted to defaults()
- ✅ `src/lib/Arrow.tsx` - Converted to defaults()
- ✅ `test-reactivity.html` - Added verification tests

## Files Already Correct

- ✅ `src/Tooltip.tsx` - Already using defaults() correctly

## Testing

Run the test file:
```bash
# Start dev server
pnpm dev

# Open test-reactivity.html in browser
# http://localhost:5173/test-reactivity.html
```

Verify:
- Attributes initialize correctly
- `setAttribute()` triggers updates
- Position changes reactively
- cls/class contract works as expected

## References

- `/woby` skill - Woby framework patterns
- `/dom-customelement` skill - CustomElement testing with Chrome DevTools MCP
- `/dom` skill - DOM master skill coordination
