import { MOBILE_BREAKPOINT } from 'config';

export const isMobile = () => {
  return window.innerWidth < MOBILE_BREAKPOINT;
}