import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {},
  routes: [
    {
      path: './',
      component: '@/components/index',
      routes: [
        {
          path: './',
          exact: true,
          redirect: './mail',
        },
        {
          path: './mail',
          routes: [
            {
              path: './',
              exact: true,
              redirect: './0',
            },
            {
              path: './0',
              component: '@/pages/mail.js',
              routes: [],
            },
          ],
        },
        // {
        //   "path": "./Home",
        //   "component": '@/pages/out.js',
        //   "title": "主页",
        //   "icon": "home",
        //   "routes": []
        // }
      ],
    },
  ],
  fastRefresh: {},
  hash: true,
});
