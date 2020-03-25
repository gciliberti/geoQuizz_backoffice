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
        selectedPhoto: null,
        selectedMap: [],
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
        selectedPhoto(state, photo) {
            state.selectedPhoto = photo
        },
        selectedMap(state, map) {
            state.selectedMap = map
        },
        clearSelectedPhotos(state) {
            state.selectedPhotos = []
        },
        clearSelectedMap(state) {
            state.selectedMap = []
        },

        getToken(state, token) {
            state.token = token
        },


    },
    actions: {},
    modules: {}
})
