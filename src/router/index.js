import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "./baseRouter"
import { getToken } from "@/utils/token"

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  let hasToken = getToken()
  if (hasToken) {
    if (to.path == '/login') {
      next("/index")
    } else {
      next()
    }
  } else {
    // 没有token
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router