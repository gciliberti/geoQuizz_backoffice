<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/photos">Photos</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        methods: {
            getPhotos() {
                axios.get('http://api.backoffice.local/api/index.php/photos/').then((response) => {
                    this.$store.commit('getPhotos', response.data.photos)
                })
            },

            getSeries() {
                axios.get('http://api.backoffice.local/api/index.php/series/').then((response) => {
                    this.$store.commit('getSeries', response.data.series)
                })
            }
        },
        mounted() {
            this.getPhotos();
            this.getSeries()

        },

    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
