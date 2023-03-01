import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/pages/ArtistPage.vue'),

  },
  {
    path:'/newArtist',
    component: () => import('src/pages/AddArtistPage.vue'),
  },
  {
    path:'/albums/:id',
    name: 'albums', 
    component: () => import('src/pages/Albums_artist.vue'),
  },


  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
