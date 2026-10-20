/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */



import { Platform } from 'react-native';

export const Colors = {
  forest: '#153D2E',
  ivory: '#F6F5EF',
  lime: '#C4F06A',
  white: '#FFFFFF',
  sage: '#DDE9E0',
  ink: '#24332B',
  muted: '#758078',
  border: '#E4E8E1',
  success: '#26734D',
  warning: '#A96516',
  error: '#B42318',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  card: 24,
  pill: 999,
} as const;

export const Typography = {
  size: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    display: 32,
  },
  lineHeight: {
    tight: 20,
    normal: 24,
    relaxed: 28,
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    rounded: 'System',
    mono: 'Menlo',
  },
  android: {
    sans: 'normal',
    rounded: 'normal',
    mono: 'monospace',
  },
  default: {
    sans: 'normal',
    rounded: 'normal',
    mono: 'monospace',
  },
});

export const BottomTabInset = Platform.select({
  ios: 50,
  android: 80,
  default: 0,
}) ?? 0;

export const MaxContentWidth = 560;
