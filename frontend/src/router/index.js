import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: () => import('../views/AtletaLista.vue')
    },
    {
      path: '/atletas',
      name: 'atletas',
      component: () => import('../views/AdministrarAtleta.vue')
    },
    {
      path: '/listciudades',
      name: 'listciudades',
      component: () => import('../views/CiudadLista.vue')
    },
    {
      path: '/ciudades',
      name: 'ciudades',
      component: () => import('../views/AdministrarCiudad.vue')
    }
  ]
})

export default router
