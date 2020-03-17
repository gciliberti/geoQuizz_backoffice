<template>
    <div class="series">
        <h1>Vue series</h1>
        <ul v-for="serie in series">
            <li>{{serie.ville}}</li>
        </ul>
<!--        <Serie/>-->
    </div>
</template>

<script>
    // @ is an alias to /src
    import Serie from "../components/Serie";

    export default {
        name: 'Series',
        data() {
            return {
                series: this.$store.state.series
            }
        },
        components: {
            Serie
        },
        methods: {},
        mounted() {

        },

    }
</script>
<style lang="scss">
    ul {
        list-style: none;
        padding: 0;
    }
</style>
