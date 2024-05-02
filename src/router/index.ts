import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import LoginPage from '@/modules/auth/pages/LoginPage.vue'
import RegisterPage from '@/modules/auth/pages/RegisterPage.vue'
import ResetPage from '@/modules/auth/pages/ResetPage.vue'
import ListadoPage from '@/modules/blog/pages/ListadoPage.vue'
import NuevaEntradaPage from '@/modules/blog/pages/NuevaEntradaPage.vue'
import VerEntrada from '@/modules/blog/pages/VerEntrada.vue'


const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'list-blog',
    component: ListadoPage
  },
  {
    path: '/ver/:id?',
    name: 'ver-blog',
    component: VerEntrada
  },
  {
    path: '/editor',
    name: 'editor-blog',
    component: NuevaEntradaPage,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/restore',
    name: 'restore',
    component: ResetPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


const getCurrentUser = async () => {

  return new Promise( (resolve, reject) => {
    const subscripcion = onAuthStateChanged(
      getAuth(),
      user => {
        subscripcion()
        resolve(user)
      },
      reject
    )
  })
}


router.beforeEach( async ( to, from, next ) => {

  if( to.matched.some( auth => auth.meta.requiredAuth)) {
    await getCurrentUser() ? next() : next({ name: 'login'})
  } else {
    next()
  }
})


export default router
