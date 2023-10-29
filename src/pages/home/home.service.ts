import { Request } from '@/core/services';

export async function HomeService() {
  const request = Request({ baseUrl: 'https://api.jikan.moe/v4' });

  const seasons = request.get('/seasons/now');
  const animeVideos = request.get('/anime/40357/videos');

  return Promise.allSettled([seasons, animeVideos]).then((data) => {
    const homeData: Record<string, any>[] = [];

    data?.map(
      ({
        //@ts-ignore
        value: {
          data: { data: content },
        },
      }) => {
        if (Array.isArray(content)) {
          const dataSeason = [];
          for (let i = 0; i < content.length; i++) {
            if (i === 3) {
              break;
            }

            dataSeason.push({
              title: content[i].title,
              src: content[i].images.jpg.large_image_url,
            });
          }
          homeData.push({
            type: 'vertical',
            items: dataSeason,
            title: 'Seasons',
          });
        } else {
          const dataVideo = [];
          const promo = content?.['promo'];
          for (let i = 0; i < promo.length; i++) {
            if (i === 3) {
              break;
            }

            dataVideo.push({
              title: promo[i]?.title,
              src: promo[i]?.trailer?.images?.medium_image_url,
            });
          }

          homeData.push({
            type: 'horizontal',
            items: dataVideo,
            title: 'Anime Videos',
          });
        }
      },
    );

    // console.info({ data }, { homeData });
    return homeData;
  });
}
