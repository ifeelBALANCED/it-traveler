import { ROUTES } from '@/shared/types'
import type { RouteLocationNormalized } from 'vue-router'

export const checkAuthenticationRequirements = (
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
