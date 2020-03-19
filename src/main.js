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
    baseURL: 'https://api.tallium.tech/backoffice/api/index.php',
    params: {
        token: false
    },
});

window.$ = require('jquery')
window.JQuery = require('jquery')


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    },
    // beforeCreate() {
    //     window.axios.interceptors.request.use((config) => {
    //         if (this.$store.state.token) {
    //             config.url += '?token=' + this.$store.state.token;
    //         }
    //         return config
    //     }, error => {
    //         return console.log(error)
    //     })
    // }
}).$mount('#app')
