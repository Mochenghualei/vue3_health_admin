export const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/homepage",
        name: "homepage",
        component: () => import("@/pages/homepage/HomePage.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../pages/login/Login.vue"),
    },
]
