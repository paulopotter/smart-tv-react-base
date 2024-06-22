import { TitleData } from '../title';
import { VideoData } from '../video';

export function normalize(params: any) {
  const trails = Object.entries(params);
  if (trails.length <= 0) {
    return;
  }
  const data = trails?.map((data: any, index: number) => {
    let items;
    let type = data[1]?.type;
    if (type === 'title') {
      items = data[1]?.content?.map(TitleData.normalize);
    } else if (type === 'promo') {
      items = VideoData.getPromo(data[1]?.content);
      type = 'video';
    } else if (type === 'episodes') {
      items = VideoData.getEpisodes(data[1]?.content);
      type = 'video';
    }

    if (!Array.isArray(items)) {
      return {};
    }

    return {
      title: data[1]?.title ?? '',
      items: items,
      type: type,
      id: `${type}-${index}`,
    };
  });

  return {
    type: 'trail',
    content: data.filter((content) => content.items),
  };
}
