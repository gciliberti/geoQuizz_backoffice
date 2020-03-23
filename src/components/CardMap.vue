<template>
    <div ref="map" class="card map" @click="selectMap(item)">
        <div class="card-image">
            <figure class="image">
                <img :src="item.miniature" alt="">
            </figure>
            <div class="card-content is-overlay is-clipped">
                                <span class="tag is-info">
                                    {{item.ville}}
                                </span>
            </div>
        </div>
        <footer class="card-footer">
            <p class="card-footer-item">
                <strong>Niveau de zoom : </strong>
                {{item.zoom}}
            </p>
        </footer>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'CardMap',
        props: ['item'],
        components: {},
        data() {
            return {}
        },
        methods: {
            selectMap(map) {
                let card = this.$refs.map
                card.classList.add('card-active')
                this.$store.commit('selectedMap', map)
                let cardActive = document.querySelector('.card-active')
                let cards = document.querySelectorAll('.card.map.card-active')
                if (cards.length > 1 && cards[1].classList.contains('card-active')) {
                    cards[1].classList.remove('card-active')
                    card.classList.add('card-active')
                }
                if (cards.length > 1 && cards[0].classList.contains('card-active')) {
                    cards[0].classList.remove('card-active')
                    card.classList.add('card-active')
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
