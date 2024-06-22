import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { ScreenNavigation } from '@/core';
import { useThemeStoreInContext } from '@/theme';

import { VideoStyle } from './video.style';

const enum NavigateElements {
  menu,
  buttons,
  info,
}

export function VideoPage() {
  const VideoData: any = useLoaderData();
  const theme = useThemeStoreInContext('theme');
  const style = VideoStyle({ theme });

  // const [activeElement, setActiveElement] = useState<NavigateElements>(NavigateElements.buttons);
  // const [activeButtons, setActiveButtons] = useState(0);
  // const [shouldScrolled, setShouldScrolled] = useState(false);
  // const [buttons, setButtons] = useState(VideoData.buttons);
  const routeNavigate = useNavigate();

  const pageNavigation = {
    onBack() {
      routeNavigate(-1);
    },
  };

  ScreenNavigation(true, pageNavigation);

  return (
    <>
      <h1>Pagina de video</h1>
    </>
  );
}
