<template>
    <div class="home section">

        <div>
            <div class="columns">
                <div class=" sidebar column is-2">
                    <ul>
                        <li>
                            <router-link to="/photo">Ajouter une photo</router-link>
                        </li>
                        <li>
                            <router-link to="/addPhoto">Ajouter ubne série</router-link>
                        </li>
                    </ul>
                </div>
                <div class="component column is-10">
                    <Photo/>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import Photo from '@/components/Photo.vue'

    export default {
        name: 'Home',
        components: {
            HelloWorld,
            Photo
        }
    }
</script>
<style lang="scss">

    .home {
        .columns {
            .column{

            }

            .sidebar{
                background: aliceblue;
                height: 770px;
            }

            .component{
                padding-left: 30px;
            }
        }
    }

</style>
