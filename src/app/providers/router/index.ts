import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSession } from '@/entities/session'
import { HomeLayout, BaseLayout } from '@/shared/ui/layouts'
import { ROUTES } from '@/shared/types'

const GreetingPage = () => import('@/pages/greeting').then(({ GreetingPage }) => GreetingPage)
const HomePage = () => import('@/pages/home').then(({ HomePage }) => HomePage)
const NotFoundPage = () => import('@/pages/not-found').then(({ NotFoundPage }) => NotFoundPage)
const RegisterPage = () => import('@/pages/register').then(({ RegisterPage }) => RegisterPage)
const LoginPage = () => import('@/pages/login').then(({ LoginPage }) => LoginPage)

interface RouteMeta {
  layout?: unknown
  requiresAuth?: boolean
  guestOnly?: boolean
  title?: string
}

export const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.GREETING,
    name: ROUTES.GREETING,
    component: GreetingPage,
    meta: {
      layout: HomeLayout,
      title: 'Welcome',
    } satisfies RouteMeta,
  },
  {
    path: ROUTES.HOME,
    name: ROUTES.HOME,
    component: HomePage,
    meta: {
      layout: BaseLayout,
      requiresAuth: true,
      title: 'Home',
    } satisfies RouteMeta,
  },
  {
    path: ROUTES.LOGIN,
    name: ROUTES.LOGIN,
    component: LoginPage,
    meta: {
      layout: HomeLayout,
      guestOnly: true,
      title: 'Login',
    } satisfies RouteMeta,
  },
  {
    path: ROUTES.REGISTER,
    name: ROUTES.REGISTER,
    component: RegisterPage,
    meta: {
      layout: HomeLayout,
      guestOnly: true,
      title: 'Register',
    } satisfies RouteMeta,
  },
  {
    path: ROUTES.NOT_FOUND,
    name: ROUTES.NOT_FOUND,
    component: NotFoundPage,
    meta: {
      title: 'Page Not Found',
    } satisfies RouteMeta,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: ROUTES.NOT_FOUND },
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash }
    }
    return { top: 0 }
  },
})

const checkAuthenticationRequirements = (
  to: RouteLocationNormalized,
  isLoggedIn: boolean,
): { shouldRedirect: boolean; redirectTo?: string } => {
  if (
    isLoggedIn &&
    (to.name === ROUTES.NOT_FOUND || to.name === ROUTES.GREETING || to.meta?.guestOnly)
  ) {
    return { shouldRedirect: true, redirectTo: ROUTES.HOME }
  }

  if (to.meta?.requiresAuth && !isLoggedIn) {
    return { shouldRedirect: true, redirectTo: ROUTES.LOGIN }
  }

  return { shouldRedirect: false }
}

router.beforeEach(async (to, from, next) => {
  try {
    const session = useSession()
    const { isLoggedIn } = storeToRefs(session)

    const authCheck = checkAuthenticationRequirements(to, isLoggedIn.value)

    if (authCheck.shouldRedirect && authCheck.redirectTo) {
      return next({ name: authCheck.redirectTo })
    }

    if (to.meta?.title) {
      document.title = `${to.meta.title} | IT Traveler`
    }

    next()
  } catch (error) {
    console.error('Navigation guard error:', error)
    next()
  }
})
