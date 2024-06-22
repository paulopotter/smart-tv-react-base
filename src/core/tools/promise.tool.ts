/* eslint-disable @typescript-eslint/no-explicit-any */

type configType = {
  key: string;
  promise: Promise<any>;
  customData?: Record<string, any> | undefined;
}[];

export function allSettled(config: configType): Promise<Record<string, any>> {
  const settledPromises = config.map((data) => data.promise);
  return Promise.allSettled(settledPromises).then((data: any) => {
    const response = {};
    data.map(({ value }: any, i: number) => {
      //@ts-ignore: TODO: see later
      if (config[i]?.customData !== undefined && Object.keys(config[i]?.customData)?.length > 0) {
        //@ts-ignore: TODO: see later
        response[config[i].key] = {
          content: value.data,
          //@ts-ignore: TODO: see later
          ...config[i].customData,
        };
      } else {
        //@ts-ignore: TODO: see later
        response[config[i].key] = value.data;
      }
    });
    return response;
  });
}
