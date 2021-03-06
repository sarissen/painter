import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import PaintCanvas from '@/components/PaintCanvas';
import Gallery from '@/components/Gallery';
import GalleryImage from '@/components/GalleryImage';
import Register from '@/components/Register';
import Login from '@/components/Login';
import Lobby from '@/components/Lobby';
import DrawCreator from '@/components/DrawCreator';
import DrawViewer from '@/components/DrawViewer';

Vue.use(Router);
Vue.use(Meta);

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
    {
      path: '/register',
      name: 'Register',
      component: Register,
      props: true,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true,
    },
    {
      path: '/lobby/:id?',
      name: 'Lobby',
      component: Lobby,
      props: true,
    },
    {
      path: '/drawgame/creator/:id',
      name: 'DrawCreator',
      component: DrawCreator,
      props: true,
    },
    {
      path: '/drawgame/viewer/:id',
      name: 'DrawViewer',
      component: DrawViewer,
      props: true,
    },
  ],
});
