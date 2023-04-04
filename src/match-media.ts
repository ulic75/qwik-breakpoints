export const matchMedia = (query: string): MediaQueryList => {
  const internalMatchMedia =
    window && window.matchMedia ? window.matchMedia.bind(window) : noopMatchMedia;
  return internalMatchMedia(query);
};

/** No-op matchMedia replacement for non-browser platforms. */
function noopMatchMedia(query: string): MediaQueryList {
  // Use `as any` here to avoid adding additional necessary properties for
  // the noop matcher.
  return {
    matches: query === 'all' || query === '',
    media: query,
    addListener: () => {},
    removeListener: () => {},
  } as any;
}
