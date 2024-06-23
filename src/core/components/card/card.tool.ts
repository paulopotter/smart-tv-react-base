export const HORIZONTAL_CARDS = ['horizontal', 'live', 'top-watched', 'video', 'continue-watching'] as const;
export const VERTICAL_CARDS = ['vertical', 'title'] as const;

type horizontalSupportedCard = (typeof HORIZONTAL_CARDS)[number];
type verticalSupportedCard = (typeof VERTICAL_CARDS)[number];

export type SupportedCards = horizontalSupportedCard | verticalSupportedCard;

export function isHorizontalCard(type: string): boolean {
  return HORIZONTAL_CARDS.includes(type as unknown as horizontalSupportedCard);
}
export function isVerticalCard(type: string): boolean {
  return VERTICAL_CARDS.includes(type as unknown as verticalSupportedCard);
}
export function isSupportedContent(type: string): boolean {
  return isHorizontalCard(type) || isVerticalCard(type) || type === 'highlight';
}
