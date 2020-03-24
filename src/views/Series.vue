<template>
    <div class="series section">
        <div class="container">
            <div class="actions">
                <a v-if="activeDelete === false" @click="activeDeleteSerie">Supprimer une Série</a>
                <a v-else @click="activeDeleteSerie">Désactiver supression</a>
            </div>
            <div class="columns is-multiline">
                <div v-for="serie in series" class="column is-one-quarter-desktop is-half-tablet">
                    <a v-if="activeDelete === true" @click="deleteSerie(serie.id)" class="delete"></a>
                    <div class="card">
                        <router-link :to="{name:'DetailSerie', params:{id:serie.id}}">
                            <div class="card-image">
                                <figure class="image">
                                    <img :src="getMapScreenByRef(serie.map_refs)" alt="">
                                </figure>
                                <div class="card-content is-overlay is-clipped">
                                <span class="tag is-info">
                                    {{serie.ville}}
                                </span>
                                </div>
                            </div>
                            <footer class="card-footer">
                                <p class="card-footer-item">
                                    Distance : {{serie.dist}}
                                </p>
                            </footer>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Series',
        data() {
            return {
                series: this.$store.state.series,
                activeDelete: false

            }
        },
        components: {},
        methods: {
            activeDeleteSerie() {
                this.activeDelete = !this.activeDelete
            },

            deleteSerie(id) {
                axios.delete('/series/serie/' + id).then((response) => {
                    console.log(response.status)
                    this.$bus.$emit('update-serie-list')
                })

            }
        },
        mounted() {

        },

        computed: {
            updatePhoto() {
                return this.$store.state.series
            }
        },
        watch: {
            updatePhoto: function (newVal, oldVal) {
                this.series = newVal
            }
        }

    }
</script>
<style lang="scss">

    .series {

        .container {


            ul {
                list-style: none;
                padding: 0;
            }

            .card {
                cursor: pointer;

                figure.image {
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
            }


        }
    }
</style>
