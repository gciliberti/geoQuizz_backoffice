<template>
    <div class="photo ">

        <div v-if="i === 1" class="drop-photo">
            <h2>Étape numéro 1 : Choisissez une image à importer</h2>
            <div class="file is-primary" ref="dropZone" v-bind:class="{'isHover' : isHover}" @dragover.prevent
                 @drop.prevent="onDropp" @dragenter=" isHover = true" @dragleave="isHover = false">
                <label class="file-label">
                    <input class="file-input" type="file" name="resume" @change="onChange">
                    <span v-if="isActive === false" class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">Choose a file…</span>
                </span>
                    <img v-else :src="imageSrc" alt="">
                </label>

            </div>
            <p v-if="imageName !== ''">
                <strong>Nom du fichier : </strong>{{imageName}}
                <br>
                <strong>taille : </strong>{{imagesize}} octets
            </p>

        </div>
        <div class="map-image" v-if="i === 2">
            <h2>Étape numéro 2 : Déterminer les coordonnées de la photo</h2>
            <div class="map">
                <l-map ref="map" :zoom="zoom" :center="[latitude, longitude]" style="height: 300px; width:500px">
                </l-map>
            </div>
        </div>


        <button v-if="i !==1" class="button is-primary is-rounded" @click="prev(-1)">
            <span>Précédent</span>
            <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                </span>
        </button>
        <button class="button is-primary is-rounded" @click="next(1)">
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

                latitude: "",
                longitude: "",
                zoom: 18,

            }
        },
        methods: {

            onDropp(e) {
                e.stopPropagation();
                e.preventDefault();
                let droppedImg = e.dataTransfer.files;
                this.createfile(droppedImg[0])
                this.imageName = droppedImg[0].name
                this.imagesize = droppedImg[0].size
                this.isActive = true;
                this.isHover = true;
            },
            createfile(file) {
                if (!file.type.match('image.*')) {
                    alert('Il faut glisser une image');
                    return;
                }
                let img = new Image();
                let reader = new FileReader();

                reader.onload = (e) => {
                    this.imageSrc = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            onChange(e) {
                let files = e.target.files;
                this.createFile(files[0]);
            },
            addPhoto() {
                console.log(this.imageSrc)
            },


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

            showPosition(position) {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                console.log(this.latitude + "," + this.longitude)
            }
        },
        mounted() {

            // if (this.i === 2) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition);
            }
            // }
        },

    }
</script>
<style lang="scss">
    .photo {
        h2 {
            text-align: left;
            margin: 0 0 20px 0;
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

        button {
            margin-top: 50px;
            margin-left: 5px;
        }
    }


</style>
