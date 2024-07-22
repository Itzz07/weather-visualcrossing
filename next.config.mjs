/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    WEATHER_URL: process.env.WEATHER_URL,
  },
};

export default nextConfig;
