import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import '@/assets/css/common.scss'
import '@/assets/css/media.scss'
import '@/assets/css/skin.scss'
import format from '@/assets/js/format.js'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.format = format

window.$ = document.querySelector.bind(document)
window.$$ = document.querySelectorAll.bind(document)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
