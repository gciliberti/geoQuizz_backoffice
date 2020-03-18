<template>
    <div class="drop-photo">
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
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Photo',
        components: {},
        data() {
            return {
                photo: [],
                isActive: false,
                isHover: false,
                imageSrc: '',
                imageName: '',
                imagesize: '',
                template: ''
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

        },
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
