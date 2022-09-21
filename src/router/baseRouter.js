export const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/index",
        name: "Index",
        component: () => import("@/pages/HomePage/HomePage.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../pages/Login/Login.vue"),
    },
]
