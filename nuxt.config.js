export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'js-cookie'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  auth: {
    strategies: {
      local: {
        user: {
          property: false
        },
        token: {
          property: 'auth_token',
          type: 'Token',
          maxAge: 7200
        },
        endpoints: {
          login: { url: 'token/login/', method: 'post' },
          logout: { url: 'token/logout/', method: 'post' },
          user: { url: 'accounts/data/', method: 'get'},
        },
      },
    },
    redirect: {
      login: '/login',
      home: '/home',
      logout: '/'
    },
    rewriteRedirects: false
  },
  axios: {
      baseURL: 'http://127.0.0.1:8000/'
  },
  router: {
    middleware: ['auth']
  }
}
