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
                name: 'permissions-product',
                components: {
                    menu: () => import('@/views/permissions/product/index.vue'),
                },
                meta: {
                    title: '产品管理'
                }
            },
            {
                path: 'users',
                name: 'permissions-users',
                components: {
                    menu: () => import('@/views/permissions/users/index.vue'),
                },
                meta: {
                    title: '用户管理'
                }
            },
            {
                path: 'roles',
                name: 'permissions-roles',
                components: {
                    menu: () => import('@/views/permissions/roles/index.vue'),
                },
                meta: {
                    title: '角色管理'
                }
            }
        ]
    },
    {
        path: '/analytics',
        name: 'analytics',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '设置'
        },
        children: [
            {
                path: 'dashboard',
                name: 'analytics-dashboard',
                components: {
                    menu: () => import('@/views/analytics/dashboard/index.vue'),
                },
                meta: {
                    title: '仪表盘'
                }
            },
            {
                path: 'reports',
                name: 'analytics-reports',
                components: {
                    menu: () => import('@/views/analytics/reports/index.vue'),
                },
                meta: {
                    title: '报告'
                }
            }
        ]
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '设置'
        },
        children: [
            {
                path: 'profile',
                name: 'settings-profile',
                components: {
                    menu: () => import('@/views/settings/profile/index.vue'),
                },
                meta: {
                    title: '个人资料'
                }
            },
            {
                path: 'account',
                name: 'settings-account',
                components: {
                    menu: () => import('@/views/settings/account/index.vue'),
                },
                meta: {
                    title: '账号'
                }
            },
            {
                path: 'system',
                name: 'settings-system',
                components: {
                    menu: () => import('@/views/settings/system/index.vue'),
                },
                meta: {
                    title: '系统'
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