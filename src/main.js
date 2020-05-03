import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'A/css/reset.css'
import 'A/css/common.scss'
import 'A/css/media.scss'
import 'A/css/skin.scss'
import format from 'A/js/format.js'

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
