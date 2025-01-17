import type { Router } from "vue-router"
import { useTitle } from "@@/composables/useTitle"

const { setTitle } = useTitle()

export function registerNavigationGuard(router: Router) {
  // 全局前置守卫
  router.beforeEach((_to, _from) => {
    return true
  })
  // 全局后置钩子
  router.afterEach((to) => {
    setTitle(to.meta.title)
  })
}
