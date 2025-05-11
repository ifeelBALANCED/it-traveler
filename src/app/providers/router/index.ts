import { createRouter, createWebHistory } from 'vue-router'
import { HomeLayout, BaseLayout } from '@/shared/ui/layouts'
import { ROUTES } from '@/shared/types'

const GreetingPage = () => import('@/pages/greeting').then(({ GreetingPage }) => GreetingPage)
const HomePage = () => import('@/pages/home').then(({ HomePage }) => HomePage)
const NotFoundPage = () => import('@/pages/not-found').then(({ NotFoundPage }) => NotFoundPage)
const RegisterPage = () => import('@/pages/register').then(({ RegisterPage }) => RegisterPage)
const LoginPage = () => import('@/pages/login').then(({ LoginPage }) => LoginPage)

const routes = [
  {
    path: ROUTES.GREETING,
    name: 'greeting',
    component: GreetingPage,
    meta: { layout: HomeLayout },
  },
  {
    path: ROUTES.HOME,
    name: 'home',
    component: HomePage,
    meta: { layout: BaseLayout },
  },
  {
    path: ROUTES.LOGIN,
    name: 'login',
    component: LoginPage,
    meta: { layout: HomeLayout },
  },
  {
    path: ROUTES.REGISTER,
    name: 'register',
    component: RegisterPage,
    meta: { layout: HomeLayout },
  },
  {
    path: ROUTES.NOT_FOUND,
    name: 'not-found',
    component: NotFoundPage,
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
