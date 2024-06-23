export const API_URL = {
  anime: {
    getById: (animeId: number | string) => `v4/anime/${animeId}`,
    videos: (animeId: number | string) => `v4/anime/${animeId}/videos`,
    top: 'v4/top/anime?type=tv',
  },
  seasons: {
    current: 'v4/seasons/now?filter=tv',
  },
};
