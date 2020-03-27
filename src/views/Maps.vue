<template>
    <div class="maps section">
        <div class="container">
            <div class="actions">
                <a v-if="activeDelete === false" @click="activeDeletePhoto">Supprimer une map</a>
                <a v-else @click="activeDeletePhoto">Désactiver supression</a>
            </div>
            <div class="columns is-multiline">
                <div v-for="map in maps" class="column is-one-quarter-desktop is-half-tablet">
                    <a v-if="activeDelete === true" @click="handler(map.id)" class="delete"></a>
                    <div ref="map" class="card map">
                        <div class="card-image">
                            <figure class="image">
                                <img :src="map.miniature" alt="">
                            </figure>
                            <div class="card-content is-overlay is-clipped">
                                <span class="tag is-info">
                                    {{map.ville}}
                                </span>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <p class="card-footer-item">
                                <strong>Niveau de zoom : </strong>
                                {{map.zoom}}
                            </p>
                        </footer>
                    </div>

                </div>
            </div>
        </div>
        <div class="modal map" v-bind:class="{'is-active':isModalActive}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Vous vous apprêtez à supprimer cette Map</p>
                </header>
                <section class="modal-card-body">
                    <div class="recap">
                        <div v-if="mapToDelete !== null" class="card map">
                            <div class="card-image">
                                <figure class="image">
                                    <img :src="mapToDelete.miniature" alt="">
                                </figure>
                                <div class="card-content is-overlay is-clipped">
                                                        <span class="tag is-info">
                                                            {{mapToDelete.ville}}
                                                        </span>
                                </div>
                            </div>
                            <footer class="card-footer">
                                <p class="card-footer-item">
                                    <strong>Niveau de zoom : </strong>
                                    {{mapToDelete.zoom}}
                                </p>
                            </footer>
                        </div>
                        <p class="has-text-danger has-icons-left">
                            <span><i class="fas fa-exclamation-triangle"></i></span>
                            attention cette action est irréversible, si vous supprimer une map vous allez supprimer la
                            ou les
                            séries
                            qui y sont associé !
                        </p>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button @click="deleteMap(mapToDelete.id)" class="button is-danger">supprimer la map</button>
                    <p v-if="done===true" class="has-text-success">La map à été supprimé</p>
                </footer>
            </div>
            <button @click="openModal" class="modal-close is-large" aria-label="close"></button>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Photo',
        components: {},
        data() {
            return {
                maps: this.$store.state.maps,
                activeDelete: false,
                isModalActive: false,
                mapToDelete: null,
                done: false
            }
        },
        methods: {


            getMaps() {
                axios.get('/maps').then((response) => {
                    this.$store.commit('getMaps', response.data.maps)
                })
            },


            activeDeletePhoto() {
                this.activeDelete = !this.activeDelete
            },

            openModal() {
                this.isModalActive = !this.isModalActive
            },

            handler(id) {
                if (id) {
                    this.mapToDelete = this.getMapById(id)
                    // console.log(this.mapToDelete)
                }
                this.openModal()
            },

            deleteMap(id) {
                // console.log(id)
                axios.delete('maps/map/' + id).then((response) => {
                    // console.log(response.data)
                    this.getMaps()
                    this.done = true
                    setTimeout(() => {
                        this.openModal()
                    }, 1000)
                })
            },


        },
        mounted() {
            this.getMaps()
        },

        computed: {
            updateMaps() {
                return this.$store.state.maps
            }
        },
        watch: {
            updateMaps: function (newVal, oldVal) {
                this.maps = newVal
            }
        }

    }
</script>

<style lang="scss">
    .container {
        .actions {
            padding: 0 0 15px 0;
            text-align: left;

            a {
            }
        }

        a.delete {
            z-index: 1;
            left: 50%;
            top: 15px;
            position: relative;
            background-color: #FF3860;
            text-align: left;
            height: 0;

            &:before {
                /*display: none;*/
            }

            &:after {
                /*display: none;*/
            }

        }


        figure.image {
            img {
                width: 100%;
                height: auto;
            }
        }
    }

    .modal-map {

    }
</style>
