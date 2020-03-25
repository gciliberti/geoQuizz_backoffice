<template>
    <div class="maps section">
        <div class="container">
            <div class="actions">
                <a v-if="activeDelete === false" @click="activeDeletePhoto">Supprimer une photo</a>
                <a v-else @click="activeDeletePhoto">Désactiver supression</a>
            </div>
            <div class="columns is-multiline">
                <div v-for="map in maps" class="column is-one-quarter-desktop is-half-tablet">
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
                activeDelete: false
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

            deletePhoto(id) {
                axios.delete('/photo/' + id).then((response) => {
                    console.log(response.status)
                    this.$bus.$emit('update-photo-list')

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
                this.photos = newVal
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
</style>
