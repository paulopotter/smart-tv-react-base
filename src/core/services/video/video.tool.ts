interface videoData {
  title: string;
  navigate: {
    to: string;
  };
}

interface videoNormalize extends episodeData, promoData {
  type: 'episodes' | 'promo';
}

interface episodeData extends videoData {
  mal_id: string;
  images: {
    jpg: {
      large_image_url: string;
      image_url: string;
    };
  };
  episodes: 0;
}
interface promoData extends videoData {
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
}

export function normalize(params: videoNormalize) {
  const knowledTypes = ['episodes', 'promo'];
  if (!knowledTypes.includes(params.type)) {
    return {};
  }

  let uuid = '';
  let number = null;
  let poster = '';

  if (params.type === 'episodes') {
    uuid = params.mal_id;
    number = params.episodes;
    poster = params.images?.jpg.image_url;
  } else if (params.type === 'promo') {
    uuid = params?.trailer?.youtube_id;
    number = null;
    poster = params.trailer?.images?.medium_image_url;
  }
  return {
    type: 'video',
    _typeof: params.type,
    title: params.title,
    uuid: uuid,
    number: number,
    poster: poster,
    navigate: {
      to: `/video/${uuid}`,
    },
  };
}

export function getEpisodes(params: Record<'episodes', episodeData[]>) {
  return params.episodes?.map((item) => normalize({ type: 'episodes', ...item } as videoNormalize));
}

export function getPromo(params: Record<'promo', promoData[]>) {
  return params.promo?.map((item) => normalize({ type: 'promo', ...item } as videoNormalize));
}
