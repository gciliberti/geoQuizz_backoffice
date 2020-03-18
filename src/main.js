import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import "bulma/css/bulma.css"
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


import {outils} from "./utils/utils"

Vue.mixin(outils)

window.axios = axios.create({
    baseURL: 'http://api.backoffice.local/api/index.php/',
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
    }
}).$mount('#app')
