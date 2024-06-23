import { API_URL } from '@/api-url.list';
import { Request, TrailData } from '@/core/services';
import { allSettled } from '@/core/tools/promise.tool';

export async function HomeService() {
  const seasons = Request(API_URL.seasons.current);
  const anime1Videos = Request(API_URL.anime.videos('21'));
  const anime2Videos = Request(API_URL.anime.videos('49458'));
  const highlight = Request(API_URL.anime.top);

  return allSettled([
    {
      key: 'highlight',
      promise: highlight,
      customData: {
        title: 'Highlight',
        keyUri: 'highlight',
        type: 'highlight',
      },
    },
    {
      key: 'seasons',
      promise: seasons,
      customData: {
        title: 'Séries dessa Temporada',
        keyUri: 'series-dessa-temporada',
        type: 'title',
      },
    },
    {
      key: 'animes',
      promise: anime1Videos,
      customData: {
        title: 'Episódios do One Piece',
        keyUri: 'episodes-videos',
        type: 'episodes',
      },
    },
    {
      key: 'animes-2',
      promise: anime1Videos,
      customData: {
        title: 'Videos promocionais do One Piece',
        keyUri: 'promo-videos',
        type: 'promo',
      },
    },
    {
      key: 'animes-3',
      promise: anime2Videos,
      customData: {
        title: 'Episódios do Konosuba',
        keyUri: 'episodes-videos',
        type: 'episodes',
      },
    },
    {
      key: 'animes-4',
      promise: anime2Videos,
      customData: {
        title: 'Videos promocionais do Konosuba',
        keyUri: 'promo-videos',
        type: 'promo',
      },
    },
  ]).then(TrailData.normalize);
}
