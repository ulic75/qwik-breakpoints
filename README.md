# Qwik Breakpoints

This package provides utilities to build responsive UIs that react to screen-size changes.

## useBreakpointSignal

A layout **breakpoint** is a viewport size threshold at which a layout shift can occur. The viewport size ranges between breakpoints corresponde to different standard screen sizes.

`useBreakpointSignal` lets you evaluate media queries to determine the current screen size and react to changes when the viewport size crosses a breakpoint.

```tsx
import { component$, useComputed$ } from '@builder.io/qwik';
import { Breakpoints, useBreakpointSignal } from 'qwik-breakpoints';

export default component$(() => {
  const bpSignal = useBreakpointSignal([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ]);

  const currentScreenSize = useComputed$(() => {
    const displayNameMap = new Map([
      [Breakpoints.XSmall, 'XSmall'],
      [Breakpoints.Small, 'Small'],
      [Breakpoints.Medium, 'Medium'],
      [Breakpoints.Large, 'Large'],
      [Breakpoints.XLarge, 'XLarge'],
    ]);
    for (const query of Object.keys(bpSignal.value.breakpoints)) {
      if (bpSignal.value.breakpoints[query]) {
        return displayNameMap.get(query) ?? 'Unknown';
      }
    }
  });

  return (
    <>
      <p>Resize your browser window to see the current screen size change.</p>
      <p>
        The current screen size is <strong>{currentScreenSize.value}</strong>
      </p>
    </>
  );
});
```

### React to changes to the viewport

```ts
const layoutChanges = useBreakpointSignal([
  '(orientation: portrait)',
  '(orientation: landscape)',
]);

useVisibleTask$(({ track }) => {
  track(() => layoutChanges.value);
  updateMyLayoutForOrientationChange();
}
```

### Predefined breakpoints

The built-in `Breakpoints` constant offers the following predefinded breakpoints for convenience, [originally drawn from the Material Design specification](https://material.io/archive/guidelines/layout/responsive-ui.html).

| Breakpoint name  | Media query                                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| XSmall           | (max-width: 599.98px)                                                                                                                                |
| Small            | (min-width: 600px) and (max-width: 959.98px)                                                                                                         |
| Medium           | (min-width: 960px) and (max-width: 1279.98px)                                                                                                        |
| Large            | (min-width: 1280px) and (max-width: 1919.98px)                                                                                                       |
| XLarge           | (min-width: 1920px)                                                                                                                                  |
| Handset          | (max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)                                                |
| Tablet           | (min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape) |
| Web              | (min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)                                                     |
| HandsetPortrait  | (max-width: 599.98px) and (orientation: portrait)                                                                                                    |
| TabletPortrait   | (min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)                                                                             |
| WebPortrait      | (min-width: 840px) and (orientation: portrait)                                                                                                       |
| HandsetLandscape | (max-width: 959.98px) and (orientation: landscape)                                                                                                   |
| TabletLandscape  | (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)                                                                           |
| WebLandscape     | (min-width: 1280px) and (orientation: landscape)                                                                                                     |

You can use these predefined breakpoints with useBreakpointSignal.

```tsx
const result = useBreakpointSignal([
  Breakpoints.HandsetLandscape,
  Breakpoints.HandsetPortrait
]);

return {
  result.value.matches
  ? <div>Handset</div>
  : <div>Not Handset</div>
}
```
