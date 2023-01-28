export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const API_KEY = process.env.REACT_APP_API_KEY;

const apiConfig = {
  baseUrl: BASE_URL,
  apiKey: API_KEY,
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  test: () => `https://metanode.co/json/eng.json`
};

export default apiConfig;
