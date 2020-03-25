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
                            <router-link to="/serie">Ajouter une série</router-link>
                        </li>
                        <li>
                            <router-link to="/map">Ajouter une map</router-link>
                        </li>
                    </ul>
                </div>
                <div class="component column is-10">
                    <div v-if="this.$router.currentRoute.path === '/'" class="accueil">

                        <div class="tile is-ancestor">
                            <div class="tile is-vertical is-8">
                                <div class="tile">
                                    <div class="tile is-parent is-vertical">
                                        <article class="tile is-child notification is-primary">
                                            <p class="title">Vertical...</p>
                                            <p class="subtitle">Top tile</p>
                                        </article>
                                        <article class="tile is-child notification is-warning">
                                            <p class="title">...tiles</p>
                                            <p class="subtitle">Bottom tile</p>
                                        </article>
                                    </div>
                                    <div class="tile is-parent">
                                        <article class="tile is-child notification is-info">
                                            <p class="title">Middle tile</p>
                                            <p class="subtitle">With an image</p>
                                            <figure class="image is-4by3">
                                                <img src="https://bulma.io/images/placeholders/640x480.png">
                                            </figure>
                                        </article>
                                    </div>
                                </div>
                                <div class="tile is-parent">
                                    <article class="tile is-child notification is-danger">
                                        <p class="title">Wide tile</p>
                                        <p class="subtitle">Aligned with the right tile</p>
                                        <div class="content">
                                            <!-- Content -->
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div class="tile is-parent">
                                <article class="tile is-child notification is-success">
                                    <div class="content">
                                        <p class="title">Tall tile</p>
                                        <p class="subtitle">With even more content</p>
                                        <div class="content">
                                            <!-- Content -->
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>

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
