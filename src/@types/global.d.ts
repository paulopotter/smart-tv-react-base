import { ThemeI } from '../theme/theme.style';
declare global {
  namespace Jss {
    export interface Theme extends ThemeI {}
  }
  interface Window {
    SmartTvOS: string;
  }
}

export {};
