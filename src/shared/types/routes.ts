export const ROUTES = {
  GREETING: '/',
  HOME: '/home',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  NOT_FOUND: '/:pathMatch(.*)*',
}

export type RouteNames = (typeof ROUTES)[keyof typeof ROUTES]
