<template>
    <div class="detail-serie section">
        <h1>Composant detail série {{this.$route.params.id}}</h1>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'DetailSerie',
        data() {
            return {
                serieId: ''
            }
        },
        components: {},
        methods: {},
        mounted() {

        },


        watch: {
            $route() {
                if (this.$route.params.id) {
                    this.serieId = this.$route.params.id
                } else {

                }
            },
        },

    }
</script>
<style lang="scss">

</style>
