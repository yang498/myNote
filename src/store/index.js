import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

if (!localStorage.skin) localStorage.skin = 'blue'
if (!localStorage.custom) localStorage.custom = ''

export default new Vuex.Store({
    state: {
        skin: localStorage.skin,
        custom: localStorage.custom,
        h2List: [],
        h3List: [],
        h2Index: 0,
        h3Index: 0
    },
    mutations: {
        skin: (state, payload) => { state.skin = localStorage.skin = payload },
        custom: (state, payload) => { state.custom = localStorage.custom = payload },
        h2List: (state, payload) => { state.h2List = payload },
        h3List: (state, payload) => { state.h3List = payload },
        h2Index: (state, payload) => { state.h2Index = payload },
        h3Index: (state, payload) => { state.h3Index = payload }
    }
})
