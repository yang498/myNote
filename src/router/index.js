import Vue from 'vue'
import VueRouter from 'vue-router'
import list from '@/assets/js/menuList'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('@/pages/Index.vue'),
            children: list.flatMap(item => item.list).map(item => {
                return {
                    path: item.path,
                    component: () => import('@/pages/article' + item.path)
                }
            })
        },
        {
            path: '*',
            component: () => import('@/pages/404')
        }
    ]
})
