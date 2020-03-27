<template>
    <div class="detail-serie section">
        <div class="columns is-multiline">
            <div class="column is-3">
                <h1>Paramètre de la série :</h1>
                <div class="card">
                    <div class="card-image">
                        <figure class="image">
                            <img :src="getMapScreenByRef(serie.map_refs)" alt="Placeholder image">
                        </figure>
                    </div>
                    <footer class="card-footer">
                        <p class="card-footer-item">
                            Ville : <strong>{{serie.ville}}</strong>
                        </p>
                    </footer>
                    <footer class="card-footer">
                        <p class="card-footer-item">
                            Distance :
                            <strong>{{serie.dist}} m</strong>
                        </p>
                        <p class="card-footer-item">
                            Photos jouable :
                            <strong>{{serie.photos_jouables}}</strong>
                        </p>
                    </footer>
                </div>
                <div class=" card actions">
                    <div>
                        <a v-if="activeDelete === false" @click="activeDeletePhoto">Supprimer une photo de la série</a>
                        <a v-else @click="activeDeletePhoto">Désactiver supression</a>
                    </div>
                    <div>
                        <a @click="openModal">Ajouter une photo à la série</a>
                    </div>
                </div>
            </div>

            <div class="photos column is-9">
                <h1>Liste des photos de la série :</h1>

                <div class="container-photos">
                    <div class="columns is-multiline">
                        <div v-for="photo in photosSerie" class="column is-one-quarter-desktop is-half-tablet">
                            <a v-if="activeDelete === true" @click="deletePhoto(photo.id)" class="delete"></a>

                            <div ref="photo" class="card photo">
                                <div class="card-image">
                                    <figure class="image">
                                        <img :src="photo.url" alt="">
                                    </figure>
                                    <div class="card-content is-overlay is-clipped">
                                <span class="tag is-info">
                                    {{photo.desc}}
                                </span>
                                    </div>
                                </div>
                                <footer class="card-footer">
                                    <p class="card-footer-item">
                                        {{parseFloat(photo.position.split(',')[0]).toFixed(5)}},
                                        {{parseFloat(photo.position.split(',')[1]).toFixed(5)}}
                                    </p>
                                </footer>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="modal" v-bind:class="{'is-active':isModalActive}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="section gallery">
                    <h1>Veuillez sélectionner une photo :</h1>
                    <div class="container-photos">
                        <div class="columns is-multiline">
                            <div v-for="photo in this.$store.state.photos"
                                 class="column is-one-quarter-desktop is-half-tablet">
                                <CardPhoto :item="photo"/>
                            </div>
                        </div>
                    </div>
                    <div class="actions">
                        <div v-if="isPhotoAdded === false">
                            <button v-if="isPhotoSelected" class="validate button is-primary is-outlined"
                                    @click="addPhoto">
                                Ajouter la photo
                            </button>
                            <p v-else class="has-text-danger">Vous devez sélectionner une photo pour continuer</p>
                        </div>
                        <div v-else>
                            <p class="has-text-success">La photo a bien ajouté</p>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="openModal" class="modal-close is-large" aria-label="close"></button>
        </div>
    </div>

</template>

<script>
    // @ is an alias to /src

    import CardPhoto from "./CardPhoto";

    export default {
        name: 'DetailSerie',
        data() {
            return {
                serie: [],
                photosSerie: [],
                activeDelete: false,
                isModalActive: false,
                isPhotoSelected: false,
                isPhotoAdded: false

            }
        },
        components: {CardPhoto},
        methods: {


            getPhotosFromSerie() {
                axios.get('/photos/' + this.$route.params.id).then((response) => {
                    this.photosSerie = response.data.photos
                })
            },

            activeDeletePhoto() {
                this.activeDelete = !this.activeDelete
            },


            deletePhoto(id) {
                let id_serie = this.$route.params.id.trim()
                axios.delete('photo/serie/' + id_serie + '/' + id).then((response) => {
                    // console.log(response.status)
                    this.getPhotosFromSerie()
                })
            },

            openModal() {
                this.isModalActive = !this.isModalActive
            },

            changeState(state) {
                this.isPhotoSelected = state
            },
            addPhoto() {
                let id_photo = this.$store.state.selectedPhoto.id
                let id_serie = this.$route.params.id.trim()

                let param = {
                    photo_id: id_photo,
                    serie_id: id_serie
                }

                axios.post('photo/serie', param).then((response) => {
                    this.isPhotoAdded = true
                    this.getPhotosFromSerie()
                    setTimeout(() => {
                        this.openModal()
                        this.isPhotoAdded = false
                    }, 200)
                })


            }

        },
        mounted() {
            this.serie = this.getSerieDetailById(this.$route.params.id)
            this.getPhotosFromSerie()
            this.$store.commit("selectedPhoto", [])
            this.$bus.$on('change-state-selectedphoto', (state) => {
                this.changeState(state)
            })
        },


        watch: {
            $route() {
                if (this.$route.params.id) {
                    this.serieId = this.$route.params.id
                } else {

                }
            },
        },

    }
</script>
<style lang="scss">

    .detail-serie {

        h1 {
            text-align: left;
        }


        .column.is-3 {
            .actions {
                /*background-color: #2c3e50;*/
                height: auto;
                margin-top: 15px;
                padding: 15px;

                div {
                    margin: 5px 0 5px 0;
                }
            }
        }


        .photos {
            height: 700px;
            overflow: auto;
            /*border: 2px solid #00D1B2;*/
            margin-bottom: 25px;


            .container-photos {
                background-color: ghostwhite;
                padding: 15px;
                overflow: hidden;
                height: auto;

                .columns {
                    .column {
                        a.delete {
                            background-color: #FF3860;
                            position: relative;
                            left: 50%;
                            top: 15px;
                            height: 0;
                            z-index: 1;
                        }
                    }
                }

            }
        }


        .modal {
            .modal-background {

            }

            .modal-content {
                width: 1000px;

                .section {
                    width: 100%;
                    height: 90vh;
                    background-color: white;


                    .container-photos {
                        background-color: ghostwhite;
                        padding: 15px;
                        height: 700px;
                        overflow: auto;


                    }

                    .actions {
                        margin-top: 15px;
                    }


                }
            }
        }

    }

</style>
