export const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/pages/HomePage/Index.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login/Index.vue")
  },
]