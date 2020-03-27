import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Series from "../views/Series";
import Photos from "../views/Photos";
import Photo from "../components/Photo";
import Register from "../views/Register";
import Serie from "../components/Serie";
import DetailSerie from "../components/DetailSerie";
import Maps from "../views/Maps";
import Map from "../components/Map";


import store from "../store/index"


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/photo',
                component: Photo
            },
            {
                path: '/serie',
                component: Serie
            },
            {
                path: '/map',
                component: Map
            }
        ],
        beforeEnter(to, from, next) {
            if (to.name !== 'Login' && store.state.token === '') next({name: 'Login'})
            else next()

        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },

    {
        path: '/photos',
        name: 'Photos',
        component: Photos,
        beforeEnter(to, from, next) {
            if (to.name !== 'Login' && store.state.token === '') next({name: 'Login'})
            else next()

        }
    },
    {
        path: '/series',
        name: 'Series',
        component: Series,
        beforeEnter(to, from, next) {
            if (to.name !== 'Login' && store.state.token === '') next({name: 'Login'})
            else next()

        }
    },
    {
        path: '/maps',
        name: 'Map',
        component: Maps,
        beforeEnter(to, from, next) {
            if (to.name !== 'Login' && store.state.token === '') next({name: 'Login'})
            else next()

        }
    },
    {
        path: '/disconnect',
        name: 'Disconnect',
        component: Login,
        beforeEnter(to, from, next) {
            if (to.name !== 'Login' && store.state.token === '') next({name: 'Login'})
            else next()

        }
    },

    {
        path: '/serie/:id',
        name: 'DetailSerie',
        component: DetailSerie,
        beforeEnter(to, from, next) {
            if (to.name !== 'Login' && store.state.token === '') next({name: 'Login'})
            else next()

        }
    },

]

const router = new VueRouter({
    routes
})

export default router
