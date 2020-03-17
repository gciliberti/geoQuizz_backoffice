import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import "bulma/css/bulma.css"


import {outils} from "./utils/utils"

Vue.mixin(outils)

window.axios = axios.create({
    baseURL: 'http://api.backoffice.local/api/index.php/',
    params: {
        token: false
    },
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
