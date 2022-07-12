// src\router\index.ts
 
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('../view/index.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;

