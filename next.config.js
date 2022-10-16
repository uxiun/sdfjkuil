/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"
const urlPrefix = isProd? '/' + process.env.URL_PREFIX : undefined // if "" instead of undefined: error
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    assetPrefix: urlPrefix,
    basePath: urlPrefix,
    trailingSlash: true,
}

module.exports = nextConfig
