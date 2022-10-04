/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
    ADMIN_PRIVATE_KEY: process.env.ADMIN_PRIVATE_KEY
  }
}

module.exports = nextConfig
