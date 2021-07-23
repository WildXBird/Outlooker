/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/en/api/': {
      target: 'http://18.166.245.201:30200/en/api/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/zh-hans/api/': {
      target: 'http://18.166.245.201:30200/zh-hans/api/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/zh-hant/api/': {
      target: 'http://18.166.245.201:30200/zh-hant/api/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  test: {
    '/en/api/': {
      target: 'http://18.166.245.201:30200/en/api/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/zh-hans/api/': {
      target: 'http://18.166.245.201:30200/zh-hans/api/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/zh-hant/api/': {
      target: 'http://18.166.245.201:30200/zh-hant/api/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/en/api/': {
      target: 'http://18.166.245.201:30200/en/api/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/zh-hans/api/': {
      target: 'http://18.166.245.201:30200/zh-hans/api/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/zh-hant/api/': {
      target: 'http://18.166.245.201:30200/zh-hant/api/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
