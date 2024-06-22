import { TitleData } from '../title';

export function normalize(params: any) {
  const trails = Object.entries(params);

  const data = trails?.map((data: any, index: number) => {
    const items = data[1]?.content?.map(TitleData.normalize);
    const type = items[0].type;

    return {
      title: data[1]?.title ?? '',
      items: items,
      type: type,
      id: `${items[0].type}-${index}`,
    };
  });

  return {
    type: 'trail',
    content: data,
  };
}
