<template>
    <div class="map-image">
        <h2 @click="alert('composa')">Étape numéro 2 : Déterminer les coordonnées de la photo</h2>
        <div class="map">
            <LMap ref="map" :zoom="zoom" :center="[latitude, longitude]"/>
        </div>


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
        name: 'MapImage',
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
                latitude: "",
                longitude: "",
                zoom: 18,

            }
        },
        methods: {
            showPosition(position) {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            }
        },
        mounted() {

            alert('composant map')

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition);
            }

        },

    }
</script>
<style lang="scss">

    .map-image {
        .map {
            z-index: 1;
            width: 500px;
            height: 300px;
        }
    }
</style>
