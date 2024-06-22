export const API_URL = {
  anime: {
    getById: (animeId: number | string) => `v4/anime/${animeId}`,
    videos: (animeId: number | string) => `v4/anime/${animeId}/videos`,
  },
  seasons: {
    current: 'v4/seasons/now?filter=tv',
  },
};
