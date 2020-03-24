<template>
    <div class="photo ">

        <div v-if="i === 1" class="drop-photo">
            <h2>Étape numéro 1 : Choisissez une image à importer</h2>
            <div class="file is-primary" ref="dropZone" v-bind:class="{'isHover' : isHover}" @dragover.prevent
                 @drop.prevent="onDropp" @dragenter=" isHover = true" @dragleave="isHover = false">
                <label class="file-label" @change="onChange">
                    <input class="file-input" type="file" name="resume">
                    <span v-if="isActive === false" class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">Choose a file…</span>
                </span>
                    <img v-else :src="imageSrc" alt="">
                </label>

            </div>
            <div v-if="imageName !== ''" class="form">
                <p>
                    <strong>Nom du fichier : </strong>{{imageName}}
                    <br>
                    <strong>taille : </strong>{{imagesize}} octets
                </p>
                <p class="desc">Veuillez remplir la description de la photo</p>
                <input v-model="desc" class="input" type="text" placeholder="Description de la photo, soyez concis !">
            </div>


        </div>
        <div class="map-image" v-if="i === 2">
            <h2>Étape numéro 2 : Déterminer les coordonnées de la photo</h2>
            <div class="map">
                <h2>Glissez le curseur à la position de votre photo</h2>
                <l-map ref="map" :zoom="zoom" :center="marker.position" style="height: 300px; width:500px">
                    <l-control-scale
                            position="topright"
                            :imperial="false"
                            :metric="true"
                    ></l-control-scale>
                    <l-tile-layer :url="url"/>
                    <l-marker :lat-lng.sync="marker.position" :draggable="true"></l-marker>
                </l-map>
                <p><strong> Coordonnées de la photo </strong> : {{parseFloat(marker.position.lat).toFixed(5)}}, {{parseFloat(marker.position.lng).toFixed(5)}}</p>
            </div>
        </div>
        <div v-if="i === 3" class="recap-photo">
            <h2>Étape numéro 3 : Validation des données
                <button v-show="!done" v-if="desc !== '' && imageSrc !== ''"
                        class="validate button is-primary is-outlined"
                        @click="uploadPhoto">Créer la photo
                </button>
                <p class="has-text-success" v-if="done === true">La photo à été uploadé !</p>
            </h2>
            <div class="recap">
                <img v-if="imageSrc !== ''" :src="imageSrc" alt="">
                <p v-else class="has-text-danger has-icons-right">
                    <span>Vous devez choisir une photo </span>
                    <span><i class="fas fa-exclamation-triangle"></i></span>
                </p>
                <p v-if="desc !== ''"><strong>Description </strong> : {{desc}}</p>
                <p v-else class="has-text-danger has-icons-right">
                    <span>Vous devez écrire une description </span>
                    <span><i class="fas fa-exclamation-triangle"></i></span>
                </p>
                <p><strong>Coordonnées :</strong> : {{parseFloat(marker.position.lat).toFixed(5)}},
                    {{parseFloat(marker.position.lng).toFixed(5)}}</p>

            </div>
            <!--            <p v-if="done === true">La photo à été uploadé !</p>-->
            <!--            <button v-show="!done" v-if="desc !== '' && imageSrc !== ''"-->
            <!--                    class="validate button is-primary is-outlined"-->
            <!--                    @click="uploadPhoto">Créer la photo-->
            <!--            </button>-->

        </div>


        <button v-show="done === false" v-if="i !==1" class="button is-primary is-rounded" @click="prev(-1)">
            <span>Précédent</span>
            <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                </span>
        </button>
        <button v-if="i !==3" class="button is-primary is-rounded" @click="next(1)">
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
                imageName: '',
                imagesize: '',
                desc: '',


                marker: {
                    position: {lat: '', lng: ''}
                },
                latitude: "",
                longitude: "",
                zoom: 15,
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

                done: false

            }
        },
        methods: {

            //pour upload la photo
            onDropp(e) {
                e.stopPropagation();
                e.preventDefault();
                let droppedImg = e.dataTransfer.files;
                this.createFile(droppedImg[0])
            },
            onChange(e) {
                let files = e.target.files;
                this.createFile(files[0]);

            },

            createFile(file) {
                console.log(file)
                if (!file.type.match('image.*')) {
                    alert('Il faut glisser une image');
                } else {
                    this.imageName = file.name
                    this.imagesize = file.size
                    this.isActive = true;
                    this.isHover = true;
                    let img = new Image();
                    let reader = new FileReader();

                    reader.onload = (e) => {
                        this.imageSrc = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            },

            addPhoto() {
                console.log(this.imageSrc)
            },

            //pour naviguer entre les différents formulaires
            prev(i) {

                if (this.i > 1) {
                    this.i += i;
                }
            },
            next(i) {

                if (this.i <= 2) {
                    this.i += i;
                }
            },

            //pour la map
            showPosition(position) {
                this.marker.position.lat = position.coords.latitude;
                this.marker.position.lng = position.coords.longitude;
            },


            uploadPhoto() {


                let src = this.imageSrc.split(',');
                let photo = src[1]
                let desc = this.desc
                let lat = parseFloat(this.marker.position.lat).toFixed(5);
                let lng = parseFloat(this.marker.position.lng).toFixed(5)

                let localisation = this.marker.position.lat + ',' + this.marker.position.lng
                let param = {
                    photo: photo,
                    description: desc,
                    localisation: localisation
                }
                console.log(param)
                axios.post('/photos/photo', param).then((response) => {
                    console.log(response.status)

                    if (response.status === 200) {

                        this.done = true
                        this.$bus.$emit('update-photo-list')
                    }
                    axios.get('/photos/').then((response) => {
                        this.$store.commit('getPhotos', response.data.photos)
                    })
                }).catch((err) => {
                    console.log(err);
                    alert("Une erreur est survenue");
                })
            }
        },
        mounted() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition);
            }
        }, watch: {
            i: function (val) {
                if (val === 2) {
                    setTimeout(() => {
                        let map = this.$refs.map;
                        console.log(map)
                    }, 100);

                }
            }
        }

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
            .map {

                z-index: 1;
                width: 500px;
                height: 300px;
                margin-left: auto;
                margin-right: auto;
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
