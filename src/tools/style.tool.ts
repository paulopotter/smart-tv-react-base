export function px(value: number): string {
  if (window.innerWidth > 1280) {
    return `${value * 1.5}px`;
  }

  return `${value}px`;
}

export function border(width: number, color: string, style: string = 'solid'): string {
  return `${px(width)} ${style} ${color}`;
}
