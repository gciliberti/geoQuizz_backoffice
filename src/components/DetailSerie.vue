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
                            <strong>{{serie.ville}}</strong>
                        </p>
                        <p class="card-footer-item">
                            Ville :
                            <strong>{{serie.dist}}</strong>
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
                            <CardPhoto :item="photo"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="modal" v-bind:class="{'is-active':isModalActive}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <!-- Any other Bulma elements you want -->
                <h1>bvhjovfhjl</h1>
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
                isModalActive: false
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
                    console.log(response.status)
                    this.getPhotosFromSerie()
                })
            },

            openModal() {
                this.isModalActive = !this.isModalActive
            }


        },
        mounted() {
            this.serie = this.getSerieDetailById(this.$route.params.id)
            this.getPhotosFromSerie()
            console.log(this.serie)


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
                            top: 16px;
                            left: 125px;
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
        }

    }

</style>
