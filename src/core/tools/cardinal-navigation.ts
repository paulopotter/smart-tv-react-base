type directions = 'left' | 'right' | 'up' | 'down';

export function cardinalNavigation(
  currentValue: number,
  direction: 'left' | 'right',
  jumpSize: number,
  gapSize: number = 0,
): number {
  if (direction === 'right') {
    return currentValue - jumpSize - gapSize;
  }
  return currentValue + jumpSize + gapSize;
}

export function getNextPosition(currentValue: number, limit: number = 0, direction: directions = 'left'): number {
  if (direction === 'right' || direction === 'down') {
    return Math.min(currentValue + 1, limit);
  }

  if (direction === 'left' || direction === 'up') {
    return Math.max(currentValue - 1, limit);
  }

  return 0;
}
