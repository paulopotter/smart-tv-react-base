import { createContext, useContext, useRef } from 'react';
import { createStore, useStore } from 'zustand';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export type ThemeStoreType = {
  background: Color | '';
  text: {
    primary: Color | '';
    secondary: Color | '';
  };
  button: {
    background: Color | '';
    selected: Color | '';
    active: Color | '';
    text: {
      primary: Color | '';
      secondary: Color | '';
      tertiary: Color | '';
    };
  };
  progressBar: {
    background: Color | '';
    primary: Color | '';
  };
  card: {
    border: Color | '';
  };
};

export const ThemeStoreContext = createContext(null);

export const ThemeStoreProvider = ({ children }: any) => {
  const storeRef = useRef<any>();
  if (!storeRef.current) {
    storeRef.current = createStore((set: any): { theme: THEME; updateTheme: any } => ({
      theme: formatTheme(),

      updateTheme: (themeUpdated: any) => set((): Record<'theme', THEME> => ({ theme: formatTheme(themeUpdated) })),
    }));
  }
  return <ThemeStoreContext.Provider value={storeRef.current}>{children}</ThemeStoreContext.Provider>;
};

export const useThemeStoreInContext = (selector?: string): any => {
  const store = useContext(ThemeStoreContext);
  if (!store) {
    throw new Error('Missing StoreProvider');
  }
  let selected = (state: any) => state;

  if (selector !== undefined) {
    selected = (state: any) => state?.[selector];
  }

  return useStore(store, selected);
};

export const useTheme = (): THEME => {
  const store = useContext(ThemeStoreContext);
  if (!store) {
    throw new Error('Missing StoreProvider');
  }

  return useStore(store, (state: any) => state.theme);
};

export const useDefaultTheme = (): any => {
  return formatTheme();
};

const formatTheme = (themeUpdated?: ThemeStoreType): THEME => {
  return {
    font: {
      family: ['Open Sans', 'sans-serif'],
      size: {
        1: 12,
        2: 16,
        3: 20,
        4: 24,
        5: 28,
        6: 32,
        7: 36,
        8: 40,
        9: 42,
        10: 46,
        11: 50,
        12: 54,
        13: 58,
        14: 62,
      },
    },
    color: {
      black: '#000',
      white: '#fff',
      primary: '#fff',
      secondary: '#27272F',
      red: '#FF0E0E',
    },
    background: themeUpdated?.background ?? '',
    text: {
      primary: themeUpdated?.text?.primary ?? '',
      secondary: themeUpdated?.text?.secondary ?? '',
    },
    button: {
      background: themeUpdated?.button?.background ?? '',
      selected: themeUpdated?.button?.selected ?? '',
      active: themeUpdated?.button?.active ?? '',
      text: {
        primary: themeUpdated?.button?.text?.primary ?? '',
        secondary: themeUpdated?.button?.text?.secondary ?? '',
        tertiary: themeUpdated?.button?.text?.tertiary ?? '',
      },
    },
    progressBar: {
      background: themeUpdated?.progressBar?.background ?? '',
      primary: themeUpdated?.progressBar?.primary ?? '',
    },
    card: {
      border: themeUpdated?.card?.border ?? '',
    },
    screen: {
      width: 1280,
      height: 720,
    },
  };
};

export type THEME = Partial<ThemeStoreType> & {
  font: {
    family: string[];
    size: Record<number, number>;
  };
  color: {
    black: Color;
    white: Color;
    primary: Color;
    secondary: Color;
    red: Color;
  };
  screen: Record<'width' | 'height', number>;
};
