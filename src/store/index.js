import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        skin: 'skin-blue',
        h1List: [],
        h2List: [],
        h1Index: 0,
        h2Index: 0
    },
    mutations: {
        skin: (state, payload) => { state.skin = payload },
        h1List: (state, payload) => { state.h1List = payload },
        h2List: (state, payload) => { state.h2List = payload },
        h1Index: (state, payload) => { state.h1Index = payload },
        h2Index: (state, payload) => { state.h2Index = payload }
    }
})
