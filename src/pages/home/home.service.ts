import { API_URL } from '@/api-url.list';
import { Request, TrailData } from '@/core/services';
import { allSettled } from '@/core/tools/promise.tool';
// import { StringTool } from '@/tools';

export async function HomeService() {
  const seasons = Request(API_URL.seasons.current);
  const animeVideos = Request(API_URL.anime.getById.replace('{id}', '21'));

  return allSettled([
    {
      key: 'seasons',
      promise: seasons,
      customData: {
        title: 'Séries dessa Temporada',
        keyUri: 'series-dessa-temporada',
      },
    },
    // {
    //   key: 'animes',
    //   promise: animeVideos,
    // },
  ]).then((data) => {
    const homeData: Record<string, any>[] = [];
    const foo = TrailData.normalize(data);
    console.log(foo);
    return foo;
    //@ts-ignore: f
    // console.log(data);
    // data?.map(
    //   ({
    //     //@ts-ignore
    //     value: {
    //       data: { data: content },
    //     },
    //   }) => {
    //     if (Array.isArray(content)) {
    //       const dataSeason = [];
    //       for (let i = 0; i < content.length; i++) {
    //         if (i === 14) {
    //           break;
    //         }

    //         dataSeason.push({
    //           id: content[i].mal_id,
    //           title: content[i].title,
    //           src: content[i].images.jpg.large_image_url,
    //           navigate: {
    //             to: '?v=' + content[i].mal_id,
    //           },
    //         });
    //       }
    //       homeData.push({
    //         type: 'vertical',
    //         items: dataSeason,
    //         title: 'Seasons',
    //       });
    //     } else {
    //       const dataVideo = [];
    //       const promo = content?.['promo'];
    //       for (let i = 0; i < promo.length; i++) {
    //         if (i === 10) {
    //           break;
    //         }

    //         dataVideo.push({
    //           id: `video-${i}-${StringTool.encode(promo[i]?.title)}`,
    //           title: promo[i]?.title,
    //           src: promo[i]?.trailer?.images?.medium_image_url,
    //           navigate: {
    //             to: `?video=${i}`,
    //           },
    //         });
    //       }

    //       homeData.push({
    //         type: 'horizontal',
    //         items: dataVideo,
    //         title: 'Anime Videos',
    //       });
    //     }
    //   },
    // );

    return homeData;
  });
}
