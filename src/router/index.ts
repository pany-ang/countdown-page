import type { RouteRecordRaw } from "vue-router"
import { registerNavigationGuard } from "@/router/guard"
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/pages/index.vue"),
    name: "Index",
    meta: {
      title: "首页"
    }
  }
]

/** 路由实例 */
const VITE_PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH
export const router = createRouter({
  history: import.meta.env.VITE_ROUTER_HISTORY === "hash" ? createWebHashHistory(VITE_PUBLIC_PATH) : createWebHistory(VITE_PUBLIC_PATH),
  routes
})

// 注册路由导航守卫
registerNavigationGuard(router)
