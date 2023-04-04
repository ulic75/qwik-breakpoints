# API

- [Methods](#methods)
  - [useBreakpointSignal](#usebreakpointsignal)
  - [mediaMatcher](#mediamatcher)
- [Interfaces](#interfaces)
- [Constants](#constants)

---

## Methods

### useBreakpointSignal

Gets a signal of results for the given queries that will emit new results for any changes in matching of the given queries.

|                                          |                                        |
| ---------------------------------------- | -------------------------------------- |
| **Paramaters**                           |                                        |
| value<br />`string \| readonly string[]` | One or more media queries to check.    |
| **Returns**                              |                                        |
| `Readonly<Signal<BreakpointState>>`      | A signal of matches for given queries. |

### mediaMatcher

Evaluates the given media query and returns the native MediaQueryList from which results can be retrieved. Confirms the layout engine will trigger for the selector query provided and returns the MediaQueryList for the query provided.

|                     |
| ------------------- |
| **Parameters**      |
| query<br />`string` |
| **Returns**         |
| `MediaQueryList`    |

## Interfaces

---

### BreakpointState

The current state of the layout breakpoint.

**Properties**
| Name | Description |
| ---- | --- |
| breakpoints: { [key: string]: boolean; } | A key boolean pair for each query provided to useBreakpointSignal |
| matches: boolean | Whether there are currently matching breakpoints |

## Constants

---

### Breakpoints

```ts
const Breakpoints: {
  XSmall: string;
  Small: string;
  Medium: string;
  Large: string;
  XLarge: string;
  Handset: string;
  Tablet: string;
  Web: string;
  HandsetPortrait: string;
  TabletPortrait: string;
  WebPortrait: string;
  HandsetLandscape: string;
  TabletLandscape: string;
  WebLandscape: string;
};
```
