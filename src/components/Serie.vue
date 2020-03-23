<template>
    <div class="serie">
        <div class="infos-serie" v-if="i === 1">
            <h2>Étape numéro 1 : Paramètre de la série</h2>
            <div class="infos">
                <div class="form">
                    <p class="ville">Veuillez Remplir le nom d'une ville</p>
                    <input v-model="ville" class="input" type="text" placeholder="Choisissez une ville !">
                </div>
                <div class="form">
                    <p class="dist">Veuillez choisir une distance</p>
                    <input v-model="dist" class="input" type="number" placeholder="Choisissez une distance !" min="0">
                </div>
                <div class="recap-infos">
                    <p v-if="ville !== ''"><strong>Ville :</strong>{{ville}}</p>
                    <p v-if="dist !== null"><strong>Paramètre de distance :</strong>{{dist}}</p>
                </div>
            </div>
        </div>
        <div class="photos-serie" v-if="i === 2">
            <h2>Étape numéro 2 : Selectionnez et validez les photos que vous voulez ajouter dans la série</h2>
            <div class="photos">

                <div class="container-photos">
                    <div class="columns is-multiline">
                        <div v-for="photo in photos" class="column is-one-quarter-desktop is-half-tablet">
                            <!--                            <a v-if="activeDelete === true" @click="deletePhoto(photo.id)" class="delete"></a>-->
                            <CardPhoto :item="photo"/>
                        </div>
                    </div>

                </div>

            </div>
            <div class="actions">
                <a v-if="this.$store.state.selectedPhotos.length > 0" class="button is-danger first"
                   @click="emptyPhotos">Réinitialiser
                    les
                    photos choisis</a>
                <a v-if="isPhotoValidated === false" class="button is-success" @click="ValidatePhotos">Valider les
                    photos
                    sélectionnées</a>
                <p class="has-text-primary" v-else-if="isPhotoValidated === true">Les photos ont été validé !</p>

            </div>

        </div>
        <div class="photos-serie map" v-if="i === 3">
            <h2>Étape numéro 3 : Choisissez la carte de votre série</h2>
            <div class="photos">
                <div class="container-photos">
                    <div class="columns is-multiline">
                        <div v-for="map in maps" class="column is-one-quarter-desktop is-half-tablet">
                            <!--                            <a v-if="activeDelete === true" @click="deletePhoto(photo.id)" class="delete"></a>-->
                            <CardMap :item="map"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="actions">
                <a v-if="mapSerie !== null" class="button is-danger first"
                   @click="emptyMap">Réinitialiser
                    la map choisi</a>
                <a v-if="isMapValidated === false" class="button is-success" @click="validateMap">Valider la
                    map sélectionné</a>
                <p class="has-text-primary" v-else-if="isMapValidated === true">Les photos ont été validé !</p>

            </div>
        </div>

        <div class="recap-serie" v-if="i === 4">
            <h2>Étape numéro 4 : Valider les informations de la série</h2>
            <div class="recap">
                <p v-if="ville !== ''"><strong>Ville </strong> : {{ville}}</p>
                <p v-else class="has-text-danger has-icons-right">
                    <span>Vous devez choisir une ville </span>
                    <span><i class="fas fa-exclamation-triangle"></i></span>
                </p>
                <p v-if="dist !== null"><strong>Distance en jeu :</strong>{{dist}}</p>
                <p v-else class="has-text-danger has-icons-right">
                    <span>Vous devez choisir une distance de jeu </span>
                    <span><i class="fas fa-exclamation-triangle"></i></span>
                </p>

                <div class="recap-map">
                    <img v-if="mapSerie !== null" :src="mapSerie.miniature" alt="">
                    <p v-else class="has-text-danger has-icons-right">
                        <span>Vous devez choisir une map </span>
                        <span><i class="fas fa-exclamation-triangle"></i></span>
                    </p>
                </div>

            </div>

        </div>
        <button v-if="i !==1" class="button is-primary is-rounded" @click="prev(-1)">
            <span>Précédent</span>
            <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                </span>
        </button>
        <button v-if="i !==4" class="button is-primary is-rounded" @click="next(1)">
            <span>Suivant</span>
            <span class="icon is-small">
                    <i class="fas fa-arrow-right"></i>
                </span>
        </button>
    </div>
</template>

<script>
    // @ is an alias to /src

    import CardPhoto from "./CardPhoto";
    import CardMap from "./CardMap";


    export default {
        name: 'Serie',
        components: {
            CardPhoto,
            CardMap

        },
        data() {
            return {
                i: 1,
                ville: '',
                dist: null,
                photos: this.$store.state.photos,
                maps: this.$store.state.maps,
                photosSerie: null,
                mapSerie: null,
                isPhotoValidated: false,
                isMapValidated: false,

            }
        },
        methods: {
            //pour naviguer entre les différents formulaires
            prev(i) {

                if (this.i > 1) {
                    this.i += i;
                }
            },
            next(i) {

                if (this.i <= 3) {
                    this.i += i;
                }
            },

            ValidatePhotos() {
                this.photosSerie = this.$store.state.selectedPhotos
                console.table(this.$store.state.selectedPhotos)
                this.isPhotoValidated = !this.isPhotoValidated
            },
            validateMap() {
                this.isMapValidated = !this.isMapValidated
                this.mapSerie = this.$store.state.selectedMap
                console.log(this.mapSerie)
            },

            emptyPhotos() {
                this.$store.commit('clearSelectedPhotos')
                if (this.isPhotoValidated === true) {
                    this.isPhotoValidated = !this.isPhotoValidated
                }
                document.querySelectorAll('.card-active').forEach((item) => {
                    item.classList.remove('card-active')
                })
            },

            emptyMap() {
                this.$store.commit('clearSelectedMap')
                document.querySelectorAll('.card-active').forEach((item) => {
                    item.classList.remove('card-active')
                })
                this.mapSerie = null
                if (this.isMapValidated === true) {
                    this.isMapValidated = !this.isMapValidated
                }
            }

        },
        mounted() {
            this.isPhotoValidated = false
            console.table(this.maps)

        },

        // computed: {
        //     changeMapActive() {
        //         return this.mapsActive
        //     }
        // },
        // watch: {
        //     changeMapActive(newVal, oldVal) {
        //         this.mapsActive = newVal
        //         console.log(this.mapsActive)
        //     }
        // }


    }
</script>
<style lang="scss">
    .serie {

        .infos-serie, .photos-serie, .map-serie .recap-photo {
            height: auto;
        }

        h2 {
            text-align: left;
            margin: 0 0 20px 0;
        }

        .infos-serie {
            .infos {
                width: 500px;
                height: 300px;
                margin-left: auto;
                margin-right: auto;
                padding: 15px;
                margin-bottom: 15px;

                .form {
                    margin-bottom: 30px;

                    p {
                        margin-top: 15px;
                        margin-bottom: 5px;
                    }

                    input {
                        width: 80%;
                    }
                }


            }
        }

        .photos-serie {

            .actions {

                margin-bottom: 15px;

                a.first {
                    margin-right: 15px;
                }
            }

            .photos {
                height: 500px;
                overflow: auto;
                /*border: 2px solid #00D1B2;*/
                margin-bottom: 25px;


                .container-photos {
                    background-color: ghostwhite;
                    padding: 15px;
                    overflow: hidden;
                    height: auto;

                    .card {
                        cursor: pointer;
                    }
                }
            }
        }


        .photos-serie.map {
            .photos {
                height: auto;
            }
        }

        .recap-serie {
            .recap {
                width: 500px;
                height: auto;
                border: 2px solid #00D1B2;
                padding: 15px;
                margin-left: auto;
                margin-right: auto;
                border-radius: 15px;

                p {
                    margin: 15px 0 15px 0;
                }

                img {
                    width: 200px;
                    height: auto;
                }


            }

        }

        button {
            margin-left: 5px;
        }
    }
</style>
