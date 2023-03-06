/*const { i18n } = require('./i18n.config');*/

/** @type {import('next').NextConfig} */
const rewrites = () => {
    return [
        {
            source: "/api/:path*",
            destination: "http://localhost:8080/api/:path*",
        },
    ];
};

const nextConfig = {
    env: {
        API_ENDPOINT: process.env.API_ENDPOINT,
        URL: process.env.URL,
    },
    reactStrictMode: true,
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };
        return config;
    },
    images: {
        loader: 'akamai',
        path: '/',
    },
    swcMinify: true,
    rewrites,
    // i18n: {
    //     locales: ['en', 'vi'],
    //     defaultLocale: 'vi',
    //     localeDetection: false,
    // },
};

module.exports = nextConfig;
