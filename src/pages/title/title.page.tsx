import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { ScreenNavigation } from '@/core';
import { useThemeStoreInContext } from '@/theme';

import { TitleStyle } from './title.style';

const enum NavigateElements {
  menu,
  buttons,
  info,
}

export function TitlePage() {
  const TitleData: any = useLoaderData();
  const theme = useThemeStoreInContext('theme');
  const style = TitleStyle({ theme });

  // const [activeElement, setActiveElement] = useState<NavigateElements>(NavigateElements.buttons);
  // const [activeButtons, setActiveButtons] = useState(0);
  // const [shouldScrolled, setShouldScrolled] = useState(false);
  // const [buttons, setButtons] = useState(TitleData.buttons);
  const routeNavigate = useNavigate();

  const pageNavigation = {
    onBack() {
      routeNavigate(-1);
    },
  };

  ScreenNavigation(true, pageNavigation);

  return (
    <>
      <h1>Pagina de titulo</h1>
    </>
  );
}
