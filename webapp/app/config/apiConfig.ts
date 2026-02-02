export interface ApiConfig {
  apiEndpoint: string;
}

const host = process.env.NEXT_PUBLIC_API_HOST || "localhost";
const port = process.env.NEXT_PUBLIC_API_PORT || "5052";

export const apiConfig: ApiConfig = {
  apiEndpoint: `http://${host}:${port}/api/users`,
};
