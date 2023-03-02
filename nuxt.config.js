require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

export default {
    dev: !isProduction,

    // When SPA
    loading: false,

    // When SSR
    ssr: false,

    loadingIndicator: {
        name: 'wandering-cubes',
        color: '#2F2519',
    },

    head: {
        title: 'CASOTA CMS',
        titleTemplate: '%s | CASOTA',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'title', content: 'CASOTA' },
            { name: 'description', content: 'CASOTA' },
            // { name: 'format-detection', content: 'telephone=no' },
            // { property: 'og:type', content: 'website' },
            // { property: 'og:url', content: 'https://wealth-managament.com.vn/' },
            // { property: 'og:title', content: 'Wealth Management - Quản lý tài chính' },
            // { property: 'og:description', content: 'Wealth Management là một tổ chức dịch vụ tài chính quốc tế' },
            // { property: 'og:image', content: 'https://wealth-managament.com.vn/images/thumbnail.png' },
            // { property: 'twitter:card', content: 'summary_large_image' },
            // { property: 'twitter:url', content: 'https://wealth-managament.com.vn/' },
            // { property: 'twitter:title', content: 'Wealth Management - Quản lý tài chính' },
            // { property: 'twitter:image', content: 'https://wealth-managament.com.vn/images/thumbnail.png' },
            // { property: 'twitter:description', content: 'Wealth Management là một tổ chức dịch vụ tài chính quốc tế' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },

    css: [
        '@/assets/main.scss',
        '@/assets/ant/main.less',
        '@fortawesome/fontawesome-free/css/all.css',
    ],

    plugins: [
        '@/plugins/api',
        { src: '@/plugins/axios', mode: 'client' },
        '@/plugins/ant-design',
        '@/plugins/filters',
        '@/plugins/global-components',
        '@/plugins/aos.js',
        { src: '@/plugins/google-maps', mode: 'client' },
    ],

    robots: [
        {
            UserAgent: '*',
            Disallow: process.env.APP_ENV === 'production'
                ? [
                    '/*.json',
                    '/*.xml',
                ]
                : '/',
        },
    ],

    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || '3000',
    },

    render: {
        http2: {
            push: true,
        },
    },

    buildModules: [
        '@nuxt/postcss8',
        '@nuxtjs/eslint-module',
        '@nuxtjs/fontawesome',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-analytics',
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
    ],

    axios: {
        baseURL: process.env.API_HOST,
    },

    // auth: {
    //     strategies: {
    //         local: {
    //             token: {
    //                 property: 'data.sid',
    //                 global: true,
    //                 required: true,
    //                 name: 'auth',
    //                 maxAge: 60 * 60 * 24 * 30,
    //                 type: false,
    //             },
    //             autoLogout: false,
    //             user: {
    //                 property: 'data.account',
    //                 autoFetch: true,
    //             },
    //             endpoints: {
    //                 login: {
    //                     url: `${process.env.API_HOST}/user/login`,
    //                     method: 'POST',
    //                 },
    //                 logout: {
    //                     url: `${process.env.API_HOST}/user/logout`,
    //                     method: 'GET',
    //                 },
    //                 user: {
    //                     url: `${process.env.API_HOST}/user/get_profile`,
    //                     method: 'POST',
    //                 },
    //             },
    //             redirect: {
    //                 login: '/login',
    //                 logout: '/',
    //                 callback: '/login',
    //                 home: '/',
    //             },
    //         },
    //     },
    // },

    // router: {
    //     middleware: ['auth'],
    // },

    googleFonts: {
        prefetch: true,
        preconnect: true,
        preload: true,
        download: false,
        families: {
            Cabin: [300, 400, 500, 600, 700],
        },
    },

    build: {
        transpile: [/^vue2-google-maps($|\/)/],
        postcss: {
            plugins: {
                tailwindcss: 'tailwind.config.js',
                autoprefixer: {},
                ...(process.env.APP_ENV === 'production' ? { cssnano: {} } : {}),
            },
        },
        loaders: {
            less: {
                javascriptEnabled: true,
            },
        },
        babel: {
            plugins: [
                [
                    'import',
                    {
                        libraryName: 'ant-design-vue',
                        libraryDirectory: 'es',
                        style: true,
                    },
                    'ant-design-vue',
                ],
            ],
        },
    },

    publicRuntimeConfig: {
        googleAnalytics: {
            id: process.env.GOOGLE_ANALYTICS_ID,
        },
    },

    env: {
        API_HOST: process.env.API_HOST || 'localhost',
        RSA_PUBLIC_KEY: process.env.RSA_PUBLIC_KEY,
    },
};
