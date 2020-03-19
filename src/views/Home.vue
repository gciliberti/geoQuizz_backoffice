<template>
    <div class="home section">
        <div>
            <div class="columns">
                <div class=" sidebar column is-2">
                    <ul>
                        <li>
                            <router-link to="/home/photo">Ajouter une photo</router-link>
                        </li>
                        <li>
                            <router-link to="/home/serie">Ajouter ubne série</router-link>
                        </li>
                    </ul>
                </div>
                <div class="component column is-10">
                    <router-view/>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'Home',
        components: {
            HelloWorld,
        },
        methods: {
            // getPhotos() {
            //     axios.get('/photos').then((response) => {
            //         this.$store.commit('getPhotos', response.data.photos)
            //     })
            // },
            //
            // getSeries() {
            //     axios.get('/serie').then((response) => {
            //         this.$store.commit('getSeries', response.data.series)
            //     })
            // },
        },
        mounted() {
            console.log(this.$store.state.token)
            // this.getSeries()
            // this.getPhotos()
        }
    }
</script>
<style lang="scss">

    .home {
        .columns {
            .column {

            }

            .sidebar {
                background: aliceblue;
                height: 770px;
            }

            .component {
                padding-left: 30px;
            }
        }
    }

</style>
