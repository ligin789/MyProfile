import { createContext, useContext } from 'react';

/**
 * "Ready" flips to true the moment the preloader curtain starts to open —
 * fonts are loaded by then, so SplitText measurements are safe and intro
 * timelines can play against fully-styled text.
 */
const AppReadyContext = createContext(false);

export function AppReadyProvider({ value, children }) {
  return <AppReadyContext.Provider value={value}>{children}</AppReadyContext.Provider>;
}

export function useAppReady() {
  return useContext(AppReadyContext);
}
