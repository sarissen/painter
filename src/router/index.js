import Vue from 'vue';
import Router from 'vue-router';
import PaintCanvas from '@/components/PaintCanvas';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PaintCanvas,
      props: true,
    },
  ],
});
