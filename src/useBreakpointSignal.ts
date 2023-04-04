import { $, type Signal, useComputed$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { matchMedia } from './match-media';

/** The current state of a layout breakpoint. */
export interface BreakpointState {
  /** Whether any breakpoint is currently matching. */
  matches: boolean;
  /**
   * A key boolean pair for each query provided to the useBreakpointSignal method,
   * with its current matched state.
   */
  breakpoints: {
    [key: string]: boolean;
  };
}

/**
 * A key boolean pair for each query provided,
 * with its current matched state.
 */
interface InternalBreakpoints {
  [key: string]: boolean;
}

export const useBreakpointSignal = (
  queryValue: string | readonly string[]
): Readonly<Signal<BreakpointState>> => {
  const queryValues = Array.isArray(queryValue) ? queryValue : [queryValue];
  const registeredQueries: string[] = [];
  const internalState = useSignal<InternalBreakpoints>({});

  const handler = $((e: MediaQueryListEvent) => {
    internalState.value = { ...internalState.value, [e.media]: e.matches };
  });

  const registerQuery = $((query: string) => {
    if (registeredQueries.includes(query)) {
      return;
    }

    const mql = matchMedia(query);
    mql.addEventListener('change', handler);
    internalState.value = { ...internalState.value, [query]: mql.matches };
    registeredQueries.push(query);
  });

  useVisibleTask$(({ cleanup }) => {
    queryValues.forEach((query) => registerQuery(query));

    cleanup(() => {
      queryValues.forEach((query) => matchMedia(query).removeEventListener('change', handler));
    });
  });

  return useComputed$<BreakpointState>(() => {
    const matches = Object.entries(internalState.value || {}).reduce((acc, cur) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, currentMatches] = cur;
      acc = acc || currentMatches;
      return acc;
    }, false);
    return { matches, breakpoints: internalState.value };
  });
};
