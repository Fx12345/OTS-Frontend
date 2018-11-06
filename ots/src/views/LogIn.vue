<template>
    <v-app class="bimg">

        <template>
            <v-layout>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card class="cardset">


                        <v-card-title primary-title>
                            <h3 class="headline mb-0">Login</h3>
                        </v-card-title>
                        <v-card-text>
                            <div>
                                <v-form v-model="valid">
                                    <v-text-field
                                            v-model="uName"
                                            :rules="nameRules"
                                            :counter="10"
                                            label="Name"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="uPassword"
                                            :rules="pwRules"
                                            label="Password"
                                            type="password"
                                            required
                                    ></v-text-field>
                                </v-form>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn flat @click="login" color="green">Login</v-btn>
                            <v-btn flat @click="navToRegister" color="blue">Registration</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </template>

    </v-app>
</template>


<script>
    export default {
        name: "LogIn",
        data: () => ({
            valid: false,
            uName: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters'
            ],
            uPassword: '',
            pwRules: [
                v => !!v || 'Password is required',
                v => v.length >= 3 || 'Password must be more than 3 characters'
            ],
            user:{
                "id":0,
                "name":'',
                "password":''
            }
        }),
        methods: {
            login: function () {
                this.user.name=this.uName;
                this.user.password =this.uPassword;
                //ToDo insert server address
                this.$http.post('http://localhost:8080/user/login', this.user).then(
               // this.$http.post('http://falk.overzone-studio.de:8080/user/login', this.user).then(
                    response => {
                        console.log('success');
                        console.log(response);
                        if(response.body.id === 0) {
                            localStorage.setItem('session', response.body.password);
                            this.$store.commit('setUsername', response.body.name);
                            this.$router.push('/gamelist');
                        } else if(response.body.id === -1) {
                            //todo alert wrong password
                        } else if(response.body.id === -2) {
                            //todo alert no User found
                        }
                    }, error => {
                        console.log('error while logging in');
                        console.log(error);
                    });
            },
            navToRegister: function () {
                this.$router.push('/registration');
            }
        }
    }
</script>

<style scoped>
    .bimg{
        background: #cccccc url("../assets/dawn-drill-dusk-70362.jpg");
        width: auto;
        height: 100%;
    }
    .cardset{
        margin-top: 30%;
    }
</style>