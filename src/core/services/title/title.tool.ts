interface titleData {
  title: string;
  mal_id: string;
  title_english: string;
  title_japanese: string;
  synopsis: string;
  year: number;
  images: {
    jpg: {
      large_image_url: string;
      image_url: string;
    };
  };
  genres: Record<string, string>[];
  demographics: Record<string, string>[];
  trailer: {
    url: string;
    images: {
      maximum_image_url: string;
    };
  };
}

export function normalize(params: titleData) {
  const uuid = params.mal_id;
  return {
    type: 'title',
    title: params.title,
    otherTitles: {
      en: params.title_english,
      jp: params.title_japanese,
    },
    uuid: uuid,
    description: params.synopsis ?? '',
    genres: params?.genres?.map?.((genre) => genre.name) ?? [],
    jpStyle: params?.demographics?.map?.((genre) => genre.name) ?? [],
    year: params.year,
    trailer: params?.trailer?.url,
    background: params?.trailer?.images.maximum_image_url ?? params.images?.jpg.large_image_url,
    poster: params.images?.jpg.image_url,
    navigate: {
      to: `/title/${uuid}`,
    },
  };
}
