<template>
    <v-app class="bimg">

        <template>
            <v-layout>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card class="cardset">
                      <!--  <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                               aspect-ratio="2.75"></v-img> -->
                        <v-card-title primaryTitle>
                            <h3 class="headline mb-0">Registration</h3>
                        </v-card-title>
                        <v-card-text>
                            <div>
                                <v-form v-model="valid">
                                    <v-text-field
                                            v-model="name"
                                            :rules="nameRules"
                                            :counter="10"
                                            label="Name"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="email"
                                            :rules="emailRules"
                                            label="E-mail"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="password"
                                            :rules="pwRules"
                                            label="Password"
                                            type="password"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="passwordCheck"
                                            :rules="pwRules"
                                            label="Submit Password"
                                            type="password"
                                            required
                                    ></v-text-field>
                                </v-form>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn flat @click="register" color="blue" :disabled="!passwordEqual">Register</v-btn>
                            <v-btn flat @click="navToLogin" color="red">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </template>
    </v-app>

</template>

<script>
        export default {
            name: "Registration",
            data: () => ({
                valid: false,
                name: '',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => v.length <= 10 || 'Name must be less than 10 characters'
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                password: '',
                pwRules: [
                    v => !!v || 'Password is required',
                    v => v.length >= 3 || 'Password must be more than 3 characters'
                ],
                passwordCheck: '',
                user:{
                    "id":0,
                    "name":'',
                    "password":''
                }
            }),
            computed:{
              passwordEqual:function () {
                  if(this.password == this.passwordCheck && this.password.length >= 3 && /*this.email.length > 3 && **/ this.name.length <= 10) {
                      return true;
                  } else {return false;}
              }
            },
            methods: {
                register: function () {
                    this.user.name = this.name;
                    this.user.password = this.password;
                    this.$http.post('http://localhost:8080/user/registration', this.user).then(
                   // this.$http.post('http://falk.overzone-studio.de:8080/user/registration', this.user).then(
                        response => {
                            console.log('success');
                            console.log(response);
                            if(response.body.id == 0) {
                                localStorage.setItem('session', response.body.password);
                                this.$router.push('/gamelist');
                            } else if(response.body.id == -3) {
                                //username already exists
                            } else if(response.body.id == -4) {
                                //Failed DB create
                            }
                        }, error => {
                            console.log('error while registering user');
                            console.log(error);
                        });
                },
                navToLogin: function () {
                    this.$router.push('/');
                }
            }
        }
</script>

<style scoped>
    .bimg{
        background: #cccccc url("../assets/oil_wallpaper.jpg");
        width: auto;
        height: 100%;
    }
    .cardset{
        margin-top: 20%;
    }
</style>