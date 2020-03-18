import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Series from "../views/Series";
import Photos from "../views/Photos";
import Photo from "../components/Photo";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
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
        component: Login
    },
    {
        path: '/series',
        name: 'Series',
        component: Series
    },
    {
        path: '/photos',
        name: 'Photos',
        component: Photos
    },
    {
        path: '/photo',
        name: 'Photo',
        component: Photo
    },
]

const router = new VueRouter({
    routes
})

export default router
