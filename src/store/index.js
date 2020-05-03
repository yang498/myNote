import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        skin: 'skin-blue',
        h2List: [],
        h3List: [],
        h2Index: 0,
        h3Index: 0
    },
    mutations: {
        skin: (state, payload) => { state.skin = payload },
        h2List: (state, payload) => { state.h2List = payload },
        h3List: (state, payload) => { state.h3List = payload },
        h2Index: (state, payload) => { state.h2Index = payload },
        h3Index: (state, payload) => { state.h3Index = payload }
    }
})
