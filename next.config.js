/** @type {import('next').NextConfig} */
const urlPrefix = process.env.URL_PREFIX ? '/' + process.env.URL_PREFIX : ''
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = {
    assetPrefix: urlPrefix,
    basePath: urlPrefix,
    trailingSlash: true,
    ...nextConfig
}
