// export variables from environment variables (.env)
export const API_KEY = process.env.REACT_APP_API_KEY;
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  sampleEndpoint: `${BASE_URL}/api/v1/sample`,
};
