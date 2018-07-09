import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './pages';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  let { title } = to.meta || {};
  if (typeof title === 'function') title = title(to);
  document.title = title || 'sleep later';
  next();
});

export default router;
