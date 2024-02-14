import classNames from 'classnames';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { useTheme } from '@/theme';

import { onNavigate, ScreenNavigation } from '../../services';
import { ButtonStyle } from './button.style';

type buttomProps = {
  children?: React.ReactNode;
  extraClass?: string;
  active?: boolean;
  navigate?: onNavigate;
  assetName?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
  onClick?: any;
};

export const Button = forwardRef(function Button(
  {
    children,
    extraClass,
    active: isActive = false,
    navigate,
    onMouseEnter: parentMouseEnter,
    onMouseLeave: parentMouseLeave,
    onClick: parentMouseClick,
  }: buttomProps,
  ref: any,
) {
  const theme = useTheme();
  const style = ButtonStyle({ theme });
  const buttonRef = ref !== null ? ref : useRef(null);
  const hasNavigate = navigate !== undefined && Object.keys(navigate).length > 0;
  const [isMouseActive, setIsMouseActive] = useState(false);

  useEffect(() => {
    if (isActive || isMouseActive) {
      buttonRef?.current?.focus?.();
    } else {
      buttonRef?.current?.blur?.();
    }
  }, [isActive, isMouseActive]);

  if (children === null) {
    console.warn('Button empty');
    return null;
  }

  ScreenNavigation(isActive && hasNavigate, navigate);

  const styles = classNames([
    style.container,
    {
      [style.active]: isActive || isMouseActive,
    },
    extraClass,
  ]);

  const mouseEnterEvent = () => {
    if (parentMouseEnter) {
      return parentMouseEnter();
    }
    setIsMouseActive(true);
  };

  const mouseLeaveEvent = () => {
    if (parentMouseLeave) {
      return parentMouseLeave();
    }
    setIsMouseActive(false);
  };

  const onMouseDown = () => {
    if (parentMouseClick) {
      parentMouseClick?.();
    } else {
      navigate?.onEnter?.();
    }
  };

  return (
    <button
      className={styles}
      ref={buttonRef}
      onMouseDown={onMouseDown}
      onMouseEnter={mouseEnterEvent}
      onMouseLeave={mouseLeaveEvent}
    >
      {children}
    </button>
  );
});
