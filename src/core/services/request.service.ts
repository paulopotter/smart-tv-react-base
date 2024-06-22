import fetch from 'cross-fetch';

type RequestProps =
  | {
      baseUrl?: string;
      type?: 'GET' | 'POST';
      url: string;
      options?: Record<string, unknown>;
      headers?: Record<string, unknown>;
      params?: Record<string, unknown>;
    }
  | string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Request(props: RequestProps): Promise<any | Record<any, any>> {
  let url;
  //@ts-ignore: atualiza no build
  let baseUrl = __API_HOST__;
  let type = 'GET';
  let options = {};
  let headers = {};
  let params = {};

  if (typeof props === 'string') {
    url = props;
  } else {
    baseUrl = props?.baseUrl || baseUrl;
    type = props?.type || 'POST';
    url = props.url;
    options = props?.options || {};
    headers = props?.headers || {};
    params = props?.params || {};
  }
  const newUrl = new URL(url, baseUrl);

  const customOptions: Record<string, unknown> = {
    method: type,
    headers: {
      ...headers,
    },
    ...options,
  };

  if (type === 'GET') {
    const newParams = new URLSearchParams(params).toString();
    newUrl.search = newParams;
  } else if (type === 'POST') {
    customOptions['body'] = JSON.stringify({
      ...params,
    });
  }

  return (
    fetch(newUrl, customOptions)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((r: Record<string, any>) => {
        const response = r?.json() || r;
        return response?.data || response;
      })
      .catch((e) => {
        console.error(`[ERROR] Request < ${type} > - < ${newUrl} >`, e);
        return {};
      })
  );
}
