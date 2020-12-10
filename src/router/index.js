import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/Home.vue';
import Query from '../pages/Query.vue';
import About from '../pages/About.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        breadcrumb: [
          {
            name: '首頁',
          },
        ],
      },
    },
    {
      path: '/query',
      name: 'query',
      component: Query,
      meta: {
        breadcrumb: [
          {
            name: '首頁',
            link: 'home',
          },
          {
            name: '最新消息',
          },
        ],
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        breadcrumb: [
          {
            name: '首頁',
            link: 'home',
          },
          {
            name: '關於我',
          },
        ],
      },
    },
  ],
});


export default router;