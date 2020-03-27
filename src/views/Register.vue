<template>
    <div class="register container">
        <h1 class="title is-1">Créez un compte !</h1>
        <form class="signin">
            <div class="field">
                <div class="control">
                    <input v-model="log.email" class="input is-primary" type="email" placeholder="Votre mail">
                </div>
                <div class="control">
                    <input v-model="log.name" class="input is-primary" type="text" placeholder="Votre nom">
                </div>

                <div class="control">
                    <input v-model="log.firstName" class="input is-primary" type="text" placeholder="Votre prénom">
                </div>
                <div class="control">
                    <input v-model="log.phone" class="input is-primary" type="tel" placeholder="Votre n° de téléphone">
                </div>

                <div class="control">
                    <input v-model="log.password" class="input is-primary" type="password" placeholder="Mot de passe">
                </div>

                <div class="control has-icons-right">
                    <input v-if="log.password !== ''" v-model="log.secondPassword" class="input is-primary"
                           type="password"
                           placeholder="Vérifiez votre mot de passe" v-on="checkPswd()">
                    <span v-if="isPswVerifiedTwice === true" class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </div>
            </div>

            <button v-if="isPswVerifiedTwice === true" @click="signin" class="button is-primary">Valider</button>
            <p v-else class="is-medium is-4">Remplissez le champs afin de créer votre
                compte.</p>

        </form>
        <p class="is-medium is-4 ">retour à la
            <router-link to="login">
                page de connexion
            </router-link>
        </p>

    </div>

</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'login',
        data() {
            return {
                log: {
                    email: "",
                    password: "",
                    name: "",
                    firstName: '',
                    phone: '',
                    secondPassword: ""
                },
                isPswVerifiedTwice: false
            }
        },
        methods: {
            checkPswd() {
                this.isPswVerifiedTwice = !!(this.log.password === this.log.secondPassword && this.log.email && this.log.name && this.log.password);
            },
            signin(e) {
                e.preventDefault()
                if (this.log.email && this.log.password && this.log.name && this.log.firstName && this.log.phone) {
                    let param = {
                        nom: this.log.name,
                        prenom: this.log.firstName,
                        mail: this.log.email,
                        motdepasse: this.log.password,
                        telephone: this.log.phone,
                    };
                    // console.table(param)
                    axios.post('/register', param).then((response) => {
                        if (response.status === 201) {
                            this.$store.commit('getToken', response.data.token)
                            // console.log(this.$store.state.token)
                            // this.$router.push('/')
                        } else {
                            // Console.log('fail')
                        }
                    })
                }
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss">

    .register {
        .signin {
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
    }

</style>