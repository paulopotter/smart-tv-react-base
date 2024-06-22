import classNames from 'classnames';
import { forwardRef, useEffect, useRef, useState } from 'react';

import {
  //type assets, getAsset,
  useThemeStoreInContext,
} from '@/theme';
import { StringTool } from '@/tools';

import { onNavigate, ScreenNavigation } from '../../services';
import { ButtonStyle } from './button.style';

type buttomProps = {
  children?: React.ReactNode;
  extraClass?: string;
  active?: boolean;
  navigate?: onNavigate;
  // assetName?: keyof typeof assets;
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
    assetName,
    onMouseEnter: parentMouseEnter,
    onMouseLeave: parentMouseLeave,
    onClick: parentMouseClick,
  }: buttomProps,
  ref: any,
) {
  const theme = useThemeStoreInContext('theme');
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

  ScreenNavigation(isActive && hasNavigate, navigate);

  const styles = classNames([
    style.container,
    {
      [style.active]: isActive || isMouseActive,
    },
    extraClass,
  ]);

  if (children === null && assetName === null) {
    console.warn('Button empty');
    return null;
  }

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

  return (
    <button
      className={styles}
      ref={buttonRef}
      onMouseDown={() => {
        if (parentMouseClick) {
          parentMouseClick?.();
        } else {
          navigate?.onEnter?.();
        }
      }}
      onMouseEnter={mouseEnterEvent}
      onMouseLeave={mouseLeaveEvent}
    >
      {/* {!StringTool.isNil(assetName) && (
        <img
          src={getAsset(assetName!, isActive)}
          alt=""
          className={classNames([
            style.icon,
            {
              [style.iconActive]: isActive,
            },
          ])}
        />
      )} */}
      {children}
    </button>
  );
});
