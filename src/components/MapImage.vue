<template>
    <div class="map-image">
        <h2>Étape numéro 2 : Déterminer les coordonnées de la photo</h2>


    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'MapImage',
        components: {},
        data() {
            return {}
        },
        methods: {},
        mounted() {

        },

    }
</script>
<style lang="scss">
    .photo {
        h2 {
            text-align: left;
            margin: 0 0 20px 0;
        }

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

        button {
            margin-top: 50px;
            margin-left: 5px;
        }
    }


</style>
