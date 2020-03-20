import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Series from "../views/Series";
import Photos from "../views/Photos";
import Photo from "../components/Photo";
import Register from "../views/Register";
import Serie from "../components/Serie";


import store from "../store/index"


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/home/photo',
                component: Photo
            },
            {
                path: '/home/serie',
                component: Serie
            }
        ],
        beforeEnter(to, from, next) {
            if (to.name !== 'Login' && store.state.token === '') next({name: 'Login'})
            else next()

        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/About.vue')
        },

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
        path: '/disconnect',
        name: 'Disconnect',
        component: Login,
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
