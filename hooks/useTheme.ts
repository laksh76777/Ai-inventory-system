import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import type { ThemeMode, User } from '../types';
import { useAuth } from './useAuth';

// Base color definitions
const VIOLET = { '50': '245 243 255', '100': '237 233 254', '200': '221 214 254', '300': '196 181 253', '400': '167 139 250', '500': '139 92 246', '600': '124 58 237', '700': '109 40 217', '800': '91 33 182', '900': '76 29 149', '950': '59 17 119' };
const EMERALD = { '50': '236 253 245', '100': '209 250 229', '200': '167 243 208', '300': '110 231 183', '400': '52 211 153', '500': '16 185 129', '600': '5 150 105', '700': '4 120 87', '800': '6 95 70', '900': '6 78 59', '950': '2 44 34' };
const SKY = { '50': '240 249 255', '100': '224 242 254', '200': '186 230 253', '300': '125 211 252', '400': '59 130 246', '500': '14 165 233', '600': '2 132 199', '700': '3 105 161', '800': '7 89 133', '900': '12 74 110', '950': '8 47 73' };
const AMBER = { '50': '255 251 235', '100': '254 243 199', '200': '253 230 138', '300': '252 211 77', '400': '251 191 36', '500': '245 158 11', '600': '217 119 6', '700': '180 83 9', '800': '146 64 14', '900': '120 53 15', '950': '77 29 4' };
const CYAN = { '50': '236 254 255', '100': '207 250 254', '200': '165 243 252', '300': '103 232 249', '400': '34 211 238', '500': '6 182 212', '600': '8 145 178', '700': '14 116 144', '800': '21 94 117', '900': '22 78 99', '950': '8 51 68' };

export const availableColors = {
    violet: VIOLET,
    emerald: EMERALD,
    sky: SKY,
    amber: AMBER,
    cyan: CYAN,
};

export type ThemeColorName = keyof typeof availableColors;

const categoryToColorName: Record<string, ThemeColorName> = {
    grocery: 'emerald',
    pharmacy: 'sky',
    electronics: 'cyan',
    hardware: 'amber',
    other: 'violet',
};

const getUserColorName = (user: User | null): ThemeColorName => {
    const category = user?.businessCategory || 'other';
    return categoryToColorName[category] || 'violet';
};

interface Theme {
  mode: ThemeMode;
  color: ThemeColorName;
}

interface ThemeContextType {
  theme: Theme;
  updateTheme: (newTheme: Partial<Theme>) => void;
  availableColors: typeof availableColors;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const getInitialTheme = (user: User | null): Theme => {
    try {
        const storedThemeJSON = localStorage.getItem('app-theme');
        if (storedThemeJSON) {
            const storedTheme = JSON.parse(storedThemeJSON);
            if (storedTheme.mode && storedTheme.color && availableColors[storedTheme.color]) {
                return storedTheme;
            }
        }
    } catch (error) {
        console.error("Failed to parse theme from localStorage", error);
    }
    
    const mode = (localStorage.getItem('app-theme-mode') as ThemeMode) || 'system';
    const color = getUserColorName(user);
    return { mode, color };
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme(currentUser));

  const updateTheme = (newTheme: Partial<Theme>) => {
    setTheme(prevTheme => {
        const updatedTheme = { ...prevTheme, ...newTheme };
        try {
            localStorage.setItem('app-theme', JSON.stringify(updatedTheme));
        } catch (e) {
            console.error("Failed to save theme to localStorage", e);
        }
        return updatedTheme;
    });
  };

  // Effect to apply color theme
  useEffect(() => {
    const activeColorPalette = availableColors[theme.color] || VIOLET;
    
    let cssVariables = '';
    for (const [shade, rgbValue] of Object.entries(activeColorPalette)) {
      cssVariables += `--color-primary-${shade}: ${rgbValue};\n`;
    }
    
    const styleElementId = 'dynamic-theme-style';
    let styleElement = document.getElementById(styleElementId) as HTMLStyleElement;
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleElementId;
        document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = `:root { ${cssVariables} }`;

  }, [theme.color]);

  // Effect to apply light/dark mode
  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme.mode === 'dark' || (theme.mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
        if (theme.mode === 'system') {
            if (mediaQuery.matches) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme.mode]);

  const value = useMemo(() => ({
    theme,
    updateTheme,
    availableColors
  }), [theme]);

  return React.createElement(ThemeContext.Provider, { value }, children);
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};