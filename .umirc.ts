import { defineConfig } from 'umi';

export default defineConfig({
  devServer: {
    port: 8050,
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:9060',
      changeOrigin: true,
      pathRewrite: { '^/api' : '' },
    },
    '/oauthapi': {
      target: 'http://127.0.0.1:9060',
      changeOrigin: true,
      pathRewrite: { '^/oauthapi' : '' },
    }
  },
  dva: {
    disableModelsReExport: true,
    lazyLoad: true,
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
    { path: '/oauth/sign', component: '@/pages/oauth/index' },
    // { path: '/oauth', component: '@/pages/oauth/index' },
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
