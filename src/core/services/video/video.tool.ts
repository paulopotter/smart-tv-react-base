export function normalize(params: Record<string, unknown>, content: 'episodes' | 'promo' = 'episodes') {
  if (content === 'episodes') {
    const uuid = params.mal_id;
    return {
      type: 'video',
      title: params.title,
      uuid: uuid,
      number: params.episode,
      //@ts-ignore: object
      poster: params.images?.jpg.image_url,
      navigate: {
        to: `/video/${uuid}`,
      },
    };
  } else if (content === 'promo') {
    //@ts-ignore: object
    const uuid = params?.trailer?.youtube_id;
    return {
      type: 'video',
      title: params.title,
      uuid: uuid,
      number: null,
      //@ts-ignore: object
      poster: params.trailer?.images?.medium_image_url,
      navigate: {
        to: `/video/${uuid}`,
      },
    };
  }
  return {};
}

export function getEpisodes(params: any) {
  return params.episodes?.map((item: any) => normalize(item));
}

export function getPromo(params: any) {
  return params.promo?.map((item: any) => normalize(item, 'promo'));
}
