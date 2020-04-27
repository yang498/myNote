import Vue from 'vue'
import VueRouter from 'vue-router'
import list from 'A/js/menuList'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('P/index/VIndex.vue'),
            children: list.flatMap(item => item.list).map(item => {
                return {
                    path: item.path,
                    component: () => import('@/' + item.path)
                }
            })
        },
        {
            path: '*',
            component: () => import('P/404')
        }
    ]
})
