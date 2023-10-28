import { CardHorizontal } from './horizontal';
import { CardVertical } from './vertical';

export type Card = {
  type: 'vertical' | 'horizontal';
  active?: boolean;
  variant?: 'border' | 'zoom' | 'border-zoom';
  image?: {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
  };
};

export function Card(props: Card): JSX.Element | null {
  if (props.type === 'vertical') {
    return <CardVertical {...props} />;
  }
  if (props.type === 'horizontal') {
    return <CardHorizontal {...props} />;
  }
  return null;
}
