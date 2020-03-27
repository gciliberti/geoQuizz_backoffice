<template>
    <div class="photo ">
        <div class="map-image" v-if="i === 1">
            <h2>Étape numéro 1 : Déterminer les paramètres de la map</h2>
            <div class="map">
                <h2>Placez la map ou vous le voulez, n'hésitez pas à jouer sur le zoom</h2>
                <l-map ref="map" :zoom.sync="zoom" :center.sync="position" style="height: 300px; width:500px">
                    <l-control-scale
                            position="topright"
                            :imperial="false"
                            :metric="true"
                    ></l-control-scale>
                    <l-tile-layer :url="url"/>
                    <!--                    <l-marker :lat-lng.sync="marker.position" :draggable="true"></l-marker>-->
                </l-map>
                <p>niveau de zoom : <strong>{{zoom}}</strong></p>
                <p> Coordonnées de la photo :
                    <strong>
                        {{parseFloat(position.lat).toFixed(5)}},
                        {{parseFloat(position.lng).toFixed(5)}}
                    </strong>
                </p>

                <div class="form map">
                    <div class="field">
                        <p>Veuillez choisir une ville</p>
                        <div class="control">
                            <input class="input" placeholder="choisissez une ville !" v-model="ville">
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div v-if="i === 2" class="recap-photo">
            <h2>Étape numéro 3 : Validation des données
                <button v-show="!done" v-if="ville !== '' && zoom !== null && position !== null && imageSrc !== ''"
                        class="validate button is-primary is-outlined"
                        @click="uploadMap">Créer la map
                </button>
                <p class="has-text-success" v-if="done === true">La map à été uploadé !</p>
            </h2>
            <div class="recap">
                <p>voici la miniature de la map :</p>
                <img ref="imgData" class="image-data" v-if="imageSrc !== ''" :src="imageSrc" alt="">
                <p><strong>Coordonnées :</strong> : {{parseFloat(position.lat).toFixed(5)}},
                    {{parseFloat(position.lng).toFixed(5)}}
                </p>
                <p>Niveau de zoom : <strong>{{zoom}}</strong></p>

                <p v-if="ville !==''">Ville : <strong>{{ville}}</strong></p>
                <p v-else class="has-text-danger has-icons-right">
                    <span>Vous devez Définir une ville</span>
                    <span><i class="fas fa-exclamation-triangle"></i></span>
                </p>
            </div>
            <!--            <p v-if="done === true">La photo à été uploadé !</p>-->
            <!--            <button v-show="!done" v-if="desc !== '' && imageSrc !== ''"-->
            <!--                    class="validate button is-primary is-outlined"-->
            <!--                    @click="uploadPhoto">Créer la photo-->
            <!--            </button>-->

        </div>
        <router-link to="/" v-if="done === true">Retour à l'accueil</router-link>
        <button v-show="done === false" v-if="i !==1" class="button is-primary is-rounded" @click="prev(-1)">
            <span>Précédent</span>
            <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                </span>
        </button>
        <button v-if="i !==2" class="button is-primary is-rounded" @click="next(1)">
            <span>Suivant</span>
            <span class="icon is-small">
                    <i class="fas fa-arrow-right"></i>
                </span>
        </button>
    </div>
</template>

<script>
    // @ is an alias to /src


    import {latLng} from "leaflet";
    import {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LIcon,
        LControlScale,
        LCircle
    } from "vue2-leaflet";

    export default {
        name: 'Photo',
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            LControlScale,
            LIcon,
            LCircle
        },
        data() {
            return {
                i: 1,
                isActive: false,
                isHover: false,
                imageSrc: '',
                position: {lat: '', lng: ''},
                zoom: 15,
                ville: '',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                done: false

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

                if (this.i <= 1) {
                    this.i += i;
                }
                this.imageSrc = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/" + this.position.lng + "," + this.position.lat + "," + this.zoom + "/600x500?access_token=pk.eyJ1IjoiaHByb3V4MDQiLCJhIjoiY2s3eDdpeWF5MDlhdTNlcjRjNjJ4c2M4MCJ9.AcRRway0cND7xi7deoa7Gw"
            },

            //pour la map
            showPosition(position) {
                this.position.lat = position.coords.latitude;
                this.position.lng = position.coords.longitude;
            },


            uploadMap() {

                let param = {
                    lat: this.position.lat,
                    lng: this.position.lng,
                    zoom: this.zoom,
                    ville: this.ville,
                    miniature: this.imageSrc
                }

                axios.post('maps', param).then((response) => {
                    this.done = true
                    this.$bus.$emit('update-map-list')
                }).catch((err) => {
                    // console.log(err)
                })

            },


        },
        mounted() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition);
            }
        },

    }
</script>
<style lang="scss">


    .photo {
        h2 {
            text-align: left;
            margin: 0 0 20px 0;

            button.validate {
                margin-top: -8px;
            }

        }

        .map-image, .drop-photo, .recap-photo {
            height: 550px;
        }


        .drop-photo {
            .file {
                cursor: pointer;
                border: 2px solid #00D1B2;
                width: 500px;
                height: 300px;
                margin-left: auto;
                margin-right: auto;
                padding: 15px;
                border-radius: 15px;
                margin-bottom: 15px;

                &.isHover {
                    border: 2px #00D1B2 solid;

                }

                img {
                    width: auto;
                    height: 300px;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                }

                label {
                    width: 100%;

                    input {
                        width: 100%;
                    }
                }
            }

            .form {
                width: 500px;
                margin-left: auto;
                margin-right: auto;

                .desc {
                    margin-top: 15px;
                    margin-bottom: 5px;

                }

                input {
                    width: 80%;
                }
            }
        }

        .map-image {
            margin-bottom: 30px;
            height: auto;

            .map {

                z-index: 1;
                width: 500px;
                height: auto;
                margin-left: auto;
                margin-right: auto;


                .form.map {

                    button {
                        margin-bottom: 15px;
                    }

                    .field {
                        width: 65%;
                        margin-left: auto;
                        margin-right: auto;
                        display: block;
                        padding: 15px 0 0 0;
                        text-align: left;

                        .control {

                            input {
                                width: 100%;
                            }
                        }
                    }
                }

            }
        }

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

        button.validate {
            margin: 30px;

        }

        button {
            /*margin-top: 100px;*/
            margin-left: 5px;
        }
    }


</style>
