<template>
    <div id="app">
        <div id="nav">
            <div v-if="token !== '' " class="tabs is-fullwidth">
                <ul>
                    <li>
                        <router-link to="/">Accueil</router-link>
                    </li>
                    <li>
                        <router-link to="/photos">Liste des photos</router-link>
                    </li>
                    <li>
                        <router-link to="/series">Liste des séries</router-link>
                    </li>
                    <li @click="disconnect()">
                        <router-link class="has-text-danger" to="/disconnect">Déconnexion
                        </router-link>
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
            return {
                token: this.$store.state.token
            }
        },
        methods: {

            disconnect() {
                this.$store.commit('getToken', '');
                this.$router.push('/login')
                console.log(this.$store.state.token)
            }
        },
        mounted() {

        },
        computed: {
            updatetoken() {
                return this.$store.state.token
            }
        },
        watch: {
            updatetoken: function (newVal, oldVal) {
                this.token = newVal
            }
        }

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

        .tabs {
            button {
                float: right;
            }
        }
    }
</style>
