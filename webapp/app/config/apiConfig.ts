export interface ApiConfig {
  apiEndpoint: string;
}

const host = "localhost";
const port = process.env.NEXT_PUBLIC_API_PORT || "5052";

export const apiConfig: ApiConfig = {
  apiEndpoint: `http://${host}:${port}/api/users`,
};
