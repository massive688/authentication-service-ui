import { defineConfig } from 'umi';

export default defineConfig({
  devServer: {
    port: 8050,
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:9060',
      changeOrigin: true,
      ws: true,
      pathRewrite: { '^/api': '' },
    },
    '/oauthapi': {
      target: 'http://127.0.0.1:9060',
      ws: true,
      changeOrigin: true,
      pathRewrite: { '^/oauthapi': '' },
    },
  },
  dva: {
    disableModelsReExport: true,
    lazyLoad: true,
  },
  dynamicImport: {
    loading: '@/components/loading',
  },
  antd: {
    dark: false,
    compact: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    // { path: '/cas/loginApi', component: '@/pages/oauth/index' },
    // { path: '/oauth/:id', component: '@/pages/oauth/index' },
    { path: '/oauth/authorize', component: '@/pages/oauth/index' },
    { path: '/oauth/signin', component: '@/pages/user/login' },
    { path: '/oauth/signout', component: '@/pages/user/logout' },
    { path: '/sse', component: '@/pages/sseindex' },
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
