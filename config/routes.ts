// import * as sourceData from "../src/sourceData/sourceData.json";
import * as configData from './configData.json';

let router = configData.menuRouter;

let langs = ['en-US', 'zh-CN', 'zh-TW'];
let output: any = [
  {
    path: '/',
    exact: true,
    redirect: '/zh-TW',
  },
];

for (let lang of langs) {
  output.push({
    path: `./${lang}`,
    routes: router,
    component: `@/locales/${lang}-Provider.js`,
  });
}

output.push({
  component: '@/layouts/404',
});

export default output;
