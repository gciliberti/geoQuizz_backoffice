<template>
    <div class="connexion">


        <h1 class="title is-1">Connectez-vous !</h1>
        <form class="login">
            <div class="field ">
                <p class="control has-icons-right">
                    <input v-model="log.email" class="input"
                           v-bind:class="{'is-primary': isMailVerified}" type="text"
                           placeholder="Mail" v-on="checkMail()">
                </p>

                <p class="control has-icons-right">
                    <input v-model="log.password" class="input"
                           v-bind:class="{'is-primary': isPswVerified}" type="password"
                           placeholder="Mot de passe" v-on="checkPsw()">
                </p>


            </div>

            <button ref="button" v-if="isPswVerified === true && isMailVerified === true"
                    @click="login"
                    class="button is-primary is-rounded">Connexion
            </button>
            <p v-else class="is-medium is-4">Remplissez les différents champs afin de vous connecter</p>
        </form>
        <p class="is-medium">Pas encore de compte ?
            <router-link to="/register"> créez le maintenant !</router-link>
        </p>

    </div>

</template>

<script>
    // @ is an alias to /src
    import store from "../store";

    export default {
        name: 'login',
        data() {
            return {
                log: {
                    email: "",
                    password: "",
                },
                isMailVerified: false,
                isPswVerified: false
            }
        },
        methods: {
            checkMail() {
                this.isMailVerified = this.log.email !== '';
            },
            checkPsw() {
                if (this.isMailVerified === true) {
                    this.isPswVerified = this.log.password !== '';
                }
            },
            login(e) {
                e.preventDefault()
                if (this.log.email && this.log.password) {
                    axios.post('/login', {}, {
                        auth: {username: this.log.email, password: this.log.password}
                    }).then((response) => {
                        if (response.status === 200) {
                            let token = response.data.token;
                            this.$store.commit('getToken', token);
                            // this.$store.commit('getMemberID', member_id.id.trim());
                            // this.$store.commit('getMemberName', member_id.fullname.trim());
                            console.log(token)
                            this.$router.push('/');
                        } else {
                            console.log('erreur')
                        }
                    })
                }
                // let parametre = {
                //     fullname: "lucas",
                //     email: "lucas.gurgey@orange.fr",
                //     password: "123soleil"
                // };
                // axios.post('members', parametre).then((response) => {
                //     console.table(response.data);
                //     console.log(response)
                // });
            }
        },
        mounted() {
            // if (this.$store.state.token !== "") {
            //     this.$router.push('/')
            // }
        },
    }
</script>
<style lang="scss">
    .login {
        width: 700px;
        margin-left: auto;
        margin-right: auto;
        display: block;

        input {
            margin: 25px 0 25px 0;
            width: 80%;
            margin-left: auto;
            margin-right: auto;
            display: block;
        }
    }
</style>