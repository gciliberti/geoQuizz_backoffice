<template>
    <div id="app">
        <div id="nav">
            <div class="tabs">
                <ul>
                    <li>
                        <router-link  to="/">Accueil</router-link>
                    </li>
                    <li>
                        <router-link to="/photos">Liste de photos</router-link>
                    </li>
                </ul>
            </div>
            <router-view/>
        </div>
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

        .active {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
