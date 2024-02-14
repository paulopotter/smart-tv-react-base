export function adaptResolution(value: number): number {
  let valuePx = value;
  if (window.innerWidth > 1280) {
    valuePx = value * 1.5;
  }

  return Math.round(Math.ceil(valuePx));
}

export function px(value: number): string {
  return `${adaptResolution(value)}px`;
}
export function border(width: number, color: string, style: string = 'solid'): string {
  return `${px(width)} ${style} ${color}`;
}
