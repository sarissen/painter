import Vue from 'vue';
import Router from 'vue-router';
import PaintCanvas from '@/components/PaintCanvas';
import Gallery from '@/components/Gallery';
import GalleryImage from '@/components/GalleryImage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PaintCanvas,
      props: true,
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery,
      props: true,
    },
    {
      path: '/gallery/:id',
      name: 'GalleryImage',
      component: GalleryImage,
      props: true,
    },
  ],
});
