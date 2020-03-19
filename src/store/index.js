import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persist";


const vp = new VuexPersist({
    key: 'store',
    storage: window.localStorage
});

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [vp.plugin],

    state: {
        series: [],
        photos: [],
        token: ''
    },
    mutations: {
        getSeries(state, series) {
            state.series = series
        },
        getPhotos(state, photos) {
            state.photos = photos
        },

        getToken(state, token) {
            state.token = token
        }

    },
    actions: {},
    modules: {}
})
