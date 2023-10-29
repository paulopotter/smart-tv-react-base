import axios from 'axios';

export function Request({ baseUrl }: { baseUrl: string }) {
  return axios.create({
    baseURL: baseUrl,
  });
}
