<template>
    <div class="series section">
        <div class="container">
            <!--            <div class="actions">-->
            <!--                <a v-if="activeDelete === false" @click="activeDeletePhoto">Supprimer une photo</a>-->
            <!--                <a v-else @click="activeDeletePhoto">Désactiver supression</a>-->
            <!--            </div>-->
            <div class="columns is-multiline">
                <div v-for="serie in series" class="column is-one-quarter-desktop is-half-tablet">
                    <!--                    <a v-if="activeDelete === true" @click="deletePhoto(photo.id)" class="delete"></a>-->
                    <div class="card">
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
                series: this.$store.state.series
            }
        },
        components: {},
        methods: {},
        mounted() {

        },

    }
</script>
<style lang="scss">
    ul {
        list-style: none;
        padding: 0;
    }

    figure.image {
        img {
            width: 100%;
            height: auto;
        }
    }
</style>
