// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/css/app.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      script: [
        // {
        //   hid: 'gtm',
        //   innerHTML: 'window.dataLayer = window.dataLayer || [];(function (w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':new Date().getTime(),event:\'gtm.js\'}); var f = d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src= \'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);})(window,document,\'script\',\'dataLayer\',\'GTM-PNRPS64\');'
        // }
      ]
    }
  },
  runtimeConfig: {
    public: {
      SERVER_CORE_URL: process.env.SERVER_CORE_URL,
      SERVER_IMAGE_URL: process.env.SERVER_IMAGE_URL,
      SERVER_REPORTS_URL: process.env.SERVER_REPORTS_URL,
    },
  },
  modules: [
    '@nuxt/image-edge',
    '@vite-pwa/nuxt',
    'nuxt-time',
  ],

  // pwa: {
  //   registerType: 'autoUpdate',
  //   manifest: {
  //     name: "Iranecar",
  //     short_name: "Iraneacr",
  //     theme_color: '#BB133E',
  //     description: "نرم افزار جامع خدمات خودرویی",
  //     icons: [
  //       {
  //         src: 'icons/icon_64x64.png',
  //         sizes: '64x64',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'icons/icon_144x144.png',
  //         sizes: '144x144',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'icons/icon_192x192.png',
  //         sizes: '192x192',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'icons/icon_512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //       },
  //     ],
  //   },
  //   workbox: {
  //     navigateFallback: '/',
  //     globPatterns: ['**/*.{js,css,html,png}'],
  //   },
  //   devOptions: {
  //     enabled: true,
  //     type: "module",
  //   }
  // }
})
