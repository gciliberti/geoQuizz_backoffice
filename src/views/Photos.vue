<template>
    <div class="photos section">

        <div class="container">
            <div class="columns is-multiline">
                <div v-for="photo in photos" class="column is-one-quarter-desktop is-half-tablet">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-3by2">
                                <img :src="photo.url" alt="">
                            </figure>
                            <div class="card-content is-overlay is-clipped">
                                <span class="tag is-info">
                                    {{photo.desc}}
                                </span>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a class="card-footer-item">
                                Add
                            </a>
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
                photos: this.$store.state.photos
            }
        },
        methods: {},
        mounted() {
        },

    }
</script>
