<template>
    <div class="photos section">

        <div class="container">
            <div class="actions">
                <a v-if="activeDelete === false" @click="activeDeletePhoto">Supprimer une photo</a>
                <a v-else @click="activeDeletePhoto">Désactiver supression</a>
            </div>

            <div class="columns is-multiline">
                <div v-for="photo in photos" class="column is-one-quarter-desktop is-half-tablet">
                    <a v-if="activeDelete === true" @click="deletePhoto(photo.id)" class="delete"></a>
                    <div class="card">
                        <div class="card-image">
                            <figure class="image">
                                <img ref="photo" :src="photo.url" alt="">
                            </figure>
                            <div class="card-content is-overlay is-clipped">
                                <span class="tag is-info">
                                    {{photo.desc}}
                                </span>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <p class="card-footer-item">
                                <!--                                {{photo.position}}-->
                                {{parseFloat(photo.position.split(',')[0]).toFixed(5)}},
                                {{parseFloat(photo.position.split(',')[1]).toFixed(5)}}
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
                photos: this.$store.state.photos,
                activeDelete: false
            }
        },
        methods: {

            getPhotos() {
                axios.get('/photos').then((response) => {
                    this.$store.commit('getPhotos', response.data.photos)
                })
            },


            activeDeletePhoto() {
                this.activeDelete = !this.activeDelete
            },

            deletePhoto(id) {
                axios.delete('/photo/' + id).then((response) => {
                    // console.log(response.status)
                    this.$bus.$emit('update-photo-list')

                })
            },


        },
        mounted() {
            this.getPhotos()
        },

        computed: {
            updatePhoto() {
                return this.$store.state.photos
            }
        },
        watch: {
            updatePhoto: function (newVal, oldVal) {
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
