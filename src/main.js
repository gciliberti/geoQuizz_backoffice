import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import "bulma/css/bulma.css"
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import "leaflet/dist/leaflet.css";
import {Icon} from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


import {outils} from "./utils/utils"

Vue.mixin(outils)

window.axios = axios.create({
    baseURL: 'https://apibackoffice.tallium.tech/',
    headers: {
        'Authorization': ''
    },
});


window.$ = require('jquery')
window.JQuery = require('jquery')

Vue.prototype.$bus = new Vue();


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    },
    beforeCreate() {
        window.axios.interceptors.request.use((config) => {
            if (store.state.token) {
                config.headers['Authorization'] = 'Bearer ' + store.state.token
            }
            return config
        }, error => {
            return console.log(error)
        })
    }

}).$mount('#app')
