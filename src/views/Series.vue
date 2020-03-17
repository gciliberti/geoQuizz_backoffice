<template>
    <div class="series">
        <h1>Vue series</h1>
        <ul>
            <li>serie 1</li>
            <li>serie 2</li>
            <li>serie 3</li>
        </ul>
        <Serie/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Serie from "../components/Serie";

    export default {
        name: 'Series' ,
        components: {
            Serie
        },
        methods:{

        },
        mounted() {
        },

    }
</script>
<style lang="scss">
    ul{
        list-style:none;
        padding: 0;
    }
</style>
