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
        component: Home,
        children: [
            {
                path: '/home/photo',
                component: Photo
            },
            {
                path: '/home/serie',
                component: Series
            }
        ]
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
        path: '/photos',
        name: 'Photos',
        component: Photos
    },

]

const router = new VueRouter({
    routes
})

export default router
