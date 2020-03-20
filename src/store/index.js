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
        maps: [],
        selectedPhotos: [],
        token: ''
    },
    mutations: {
        getSeries(state, series) {
            state.series = series
        },
        getPhotos(state, photos) {
            state.photos = photos
        },
        getMaps(state, maps) {
            state.maps = maps
        },
        selectedPhotos(state, photos) {
            state.selectedPhotos.push(photos)
        },
        clearSelectedPhotos(state) {
            state.selectedPhotos = []
        },
        getToken(state, token) {
            state.token = token
        },


    },
    actions: {},
    modules: {}
})
