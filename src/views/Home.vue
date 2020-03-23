<template>
    <div class="home section">
        <div>
            <div class="columns">
                <div class=" sidebar column is-2">
                    <ul>
                        <li>
                            <router-link to="/photo">Ajouter une photo</router-link>
                        </li>
                        <li>
                            <router-link to="/serie">Ajouter ubne série</router-link>
                        </li>
                    </ul>
                </div>
                <div class="component column is-10">
                    <div v-if="this.$router.currentRoute.path === '/'" class="accueil">
                        <h1>C L'ACCUEIL</h1>
                    </div>
                    <router-view/>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'Home',
        components: {
            HelloWorld,
        },
        methods: {
            getPhotos() {
                axios.get('/photos').then((response) => {
                    this.$store.commit('getPhotos', response.data.photos)
                })
            },

            getSeries() {
                axios.get('/series').then((response) => {
                    this.$store.commit('getSeries', response.data.series)
                })
            },

            getMaps() {
                axios.get('/maps').then((response) => {
                    this.$store.commit('getMaps', response.data.maps)
                })
            }
        },
        mounted() {
            this.$bus.$on('update-photo-list', () => {
                this.getPhotos()
            });
            this.$bus.$on('update-serie-list', () => {
                this.getSeries()
            });
            this.getSeries();
            this.getPhotos()
            this.getMaps()
            this.$store.commit('clearSelectedMap')
            this.$store.commit('clearSelectedPhotos')

            console.log(this.$router.currentRoute)
        }
    }
</script>
<style lang="scss">

    .home {
        .columns {
            .column {

            }

            .sidebar {
                background: aliceblue;
                height: 770px;
            }

            .component {
                padding-left: 30px;
            }
        }
    }

</style>
