<template>
    <div ref="photo" class="card photo" @click="selectPhoto(item)">
        <div class="card-image">
            <figure class="image">
                <img :src="item.url" alt="">
            </figure>
            <div class="card-content is-overlay is-clipped">
                                <span class="tag is-info">
                                    {{item.desc}}
                                </span>
            </div>
        </div>
        <footer class="card-footer">
            <p class="card-footer-item">
                {{parseFloat(item.position.split(',')[0]).toFixed(5)}},
                {{parseFloat(item.position.split(',')[1]).toFixed(5)}}
            </p>
        </footer>
    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'CardPhoto',
        props: ['item'],
        components: {},
        data() {
            return {}
        },
        methods: {
            selectPhoto(photo) {
                if (this.$router.currentRoute.name !== 'DetailSerie') {
                    let card = this.$refs.photo
                    card.classList.toggle('card-active')
                    this.$store.commit('selectedPhotos', photo)
                } else {
                    let card = this.$refs.photo
                    card.classList.add('card-active')
                    this.$store.commit('selectedPhoto', photo)
                    this.$bus.$emit('change-state-selectedphoto', true)
                    console.log(this.$store.state.selectedPhoto)
                    let cards = document.querySelectorAll('.card.photo.card-active')
                    if (cards.length > 1 && cards[1].classList.contains('card-active')) {
                        cards[1].classList.remove('card-active')
                        card.classList.add('card-active')
                    }
                    if (cards.length > 1 && cards[0].classList.contains('card-active')) {
                        cards[0].classList.remove('card-active')
                        card.classList.add('card-active')
                    }
                }
            }
        },
        mounted() {
        },


    }
</script>
<style lang="scss">
    .card-active {
        filter: opacity(80%);
        border: 2px solid #2c3e50;
    }
</style>
