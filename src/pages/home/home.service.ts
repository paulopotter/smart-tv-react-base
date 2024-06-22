import { API_URL } from '@/api-url.list';
import { Request, TrailData } from '@/core/services';
import { allSettled } from '@/core/tools/promise.tool';

export async function HomeService() {
  const seasons = Request(API_URL.seasons.current);
  const animeVideos = Request(API_URL.anime.videos.replace('{id}', '21'));

  return allSettled([
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
      promise: animeVideos,
      customData: {
        title: 'Episódios do One Piece',
        keyUri: 'episodes-videos',
        type: 'episodes',
      },
    },
    {
      key: 'animes-2',
      promise: animeVideos,
      customData: {
        title: 'Videos promocionais do One Piece',
        keyUri: 'promo-videos',
        type: 'promo',
      },
    },
  ]).then(TrailData.normalize);
}
