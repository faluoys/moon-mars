import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        alias: ['/index'],
        redirect: '/home',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '首页'
        },
        children: [
            {
                path: '/home',
                name: 'home',
                components: {
                    menu: () => import('@/views/home/index.vue'),
                },
                meta: {
                    title: '首页'
                },
            },
        ]
    },
    {
        path: '/permissions',
        name: 'permissions',
        //重定向
        // redirect: '',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '权限管理'
        },
        children: [
            {
                path: 'product',
                name: 'permissions-index',
                components: {
                    menu: () => import('@/views/home/index/index.vue'),
                },
                meta: {
                    title: '产品管理'
                }
            },
            {
                path: 'users',
                name: 'permissions-users',
                components: {
                    menu: () => import('@/views/home/users/index.vue'),
                },
                meta: {
                    title: '用户管理'
                }
            },
            {
                path: 'roles',
                name: 'permissions-roles',
                components: {
                    menu: () => import('@/views/home/roles/index.vue'),
                },
                meta: {
                    title: '角色管理'
                }
            }
        ]
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router