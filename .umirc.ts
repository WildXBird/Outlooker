import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {},
  routes: [
    {
      path: './',
      component: '@/components/App',
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
              component: '@/pages/mail',
              routes: [
                {
                  path: './',
                  exact: true,
                  redirect: './inbox',
                },
                {
                  path: './inbox',
                  routes: [
                    {
                      path: './',
                      // exact: true,
                      component: '@/pages/mail/inbox',
                      routes: [
                        {
                          path: './id',
                          component: '@/pages/mail/viewArticle',
                          routes: [],
                        },
                      ],
                    },
                    // {
                    //   path: './id',
                    //   component: '@/pages/mail/viewArticle',
                    //   routes: [],
                    // },
                  ],
                },
              ],
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
