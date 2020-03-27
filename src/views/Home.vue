<template>
    <div class="home section">
        <div>
            <div class="columns">
                <div class=" sidebar column is-2">
                    <nav class="panel">
                        <p class="panel-heading">
                            Menu
                        </p>
                        <router-link class="panel-block" to="/photo">Ajouter une photo</router-link>
                        <router-link class="panel-block" to="/serie">Ajouter une série</router-link>
                        <router-link class="panel-block" to="/map">Ajouter une map</router-link>


                    </nav>


                </div>
                <div class="component column is-10">
                    <div v-if="this.$router.currentRoute.path === '/'" class="accueil">
                        <h1 class="title is-1">Bienvenue sur Geoquizz !</h1>
                        <h2 class="subtitle is-4">
                            Sur ce backoffice vous serez en mesure de :
                        </h2>
                        <ol>
                            <li>
                                Ajouter ou supprimer des photos dans le jeu
                            </li>
                            <li>
                                Créer ou supprimer des séries de jeu
                            </li>
                            <li>
                                Créer ou supprimer des map de jeux
                            </li>
                        </ol>
                        <footer>
                            <h2 class="subtitle is-6">Projet réalisé dans le cadre de la licence professionnelle CIASIE
                                de <strong>
                                    Nancy </strong></h2>
                        </footer>
                    </div>
                    <router-view/>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'Home',
        components: {},
        data() {
            return {}
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

            this.$bus.$on('update-map-list', () => {
                this.getMaps()
            });
            this.getSeries();
            this.getPhotos()
            this.getMaps()
            this.$store.commit('clearSelectedMap')
            this.$store.commit('clearSelectedPhotos')


        }
    }
</script>
<style lang="scss">

    .home {
        .columns {
            .column {

            }

            .sidebar {
                background: white;
                padding: 0;
                height: auto;

                ul {
                    padding: 0;

                    li {
                        padding-top: 15px;
                        padding-bottom: 10px;
                        /*border-bottom: 2px solid #2c3e50;*/
                    }
                }
            }

            .component {
                padding-left: 30px;

                .accueil {
                    ol {
                        color: #2c3e50;
                        list-style-type: none;
                    }

                    footer {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 6vh;
                        background-color: #2c3e50;

                        h2 {
                            color: white;
                            padding-top: 20px;

                            strong {
                                color: white;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
