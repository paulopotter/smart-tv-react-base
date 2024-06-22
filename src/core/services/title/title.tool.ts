export function normalize(params: Record<string, unknown>) {
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
    // @ts-ignore: array
    genres: params?.genres?.map?.((genre: Record<string, string>) => genre.name) ?? [],
    // @ts-ignore: array
    jpStyle: params?.demographics?.map?.((genre: Record<string, string>) => genre.name) ?? [],
    year: params.year,
    //@ts-ignore: object
    trailer: params?.trailer?.url,
    //@ts-ignore: object
    background: params.images?.jpg.large_image_url,
    //@ts-ignore: object
    poster: params.images?.jpg.image_url,
    navigate: {
      to: `/title/${uuid}`,
    },
  };
}
