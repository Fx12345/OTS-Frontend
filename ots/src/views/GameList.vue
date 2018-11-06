<template>
    <v-app class="bimg">
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-toolbar color="blue-grey darken-1" dark>
                    <v-btn icon  @click="backToLogin(false)"><v-icon>arrow_back</v-icon></v-btn>
                    <v-toolbar-title>Games</v-toolbar-title>

                    <v-spacer></v-spacer>
                    <v-btn @click="setupList" icon>
                        <v-icon>refresh</v-icon>
                    </v-btn>
                    <v-text-field
                            v-bind="filterText"
                            label="Search Game"
                            v-show="showSearchField"
                            color="white"
                    ></v-text-field>
                    <v-btn @click="searchGame" icon>
                        <v-icon>search</v-icon>
                    </v-btn>
                    <v-btn @click="addGame(1)" icon>
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-toolbar>


                <v-list two-line>
                    <template v-for="(item, index) in items">
                        <v-subheader
                                v-if="item.header"
                                :key="item.header"
                        >
                            {{ item.header }}
                        </v-subheader>

                        <v-divider
                                v-else-if="item.divider"
                                :inset="item.inset"
                                :key="index"
                        ></v-divider>

                        <v-list-tile
                                v-else
                                :key="item.title"
                                avatar
                                @click="chooseGame(item.title)"
                        >
                            <v-list-tile-avatar>
                               <!-- <img :src="item.avatar"> -->
                                <v-icon>group</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
        <!-------------------------------- Dialogs----------------------------------------------->
        <!--Leave Game-->
        <v-dialog v-model="leaveDialog" max-width="25%">
            <v-card>
                <v-card-title class="headline">Sure you want to log out?</v-card-title>

                <v-card-text>
                    You return to the log in screen.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click="leaveDialog = false">Stay</v-btn>
                    <v-btn color="red darken-1" flat="flat" @click="backToLogin(true)">Log Out</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--Add Game-->
        <v-dialog v-model="addGameDialog" persistent max-width="25%">
            <v-card>
                <v-card-title class="headline">Add new Game</v-card-title>

                <v-card-text>
                    <v-text-field v-model="config.gameName" label="Name" required></v-text-field>
                    <br>
                    <v-flex>
                        <p>Choose your start condition!</p>
                        <v-btn-toggle v-model="config.startCondition">
                            <v-btn flat value="Businessman" color="blue-grey darken-1">
                                Businessman
                            </v-btn>
                            <v-btn flat value="Sheikh" color="blue-grey darken-1">
                                Sheikh
                            </v-btn>
                            <v-btn flat value="Dictator" color="blue-grey darken-1">
                                Dictator
                            </v-btn>
                        </v-btn-toggle>
                    </v-flex>
                </v-card-text>
                <br>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat="flat" @click="addGameDialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat="flat" @click="createGame(true)" :disabled="addGameFieldsfilled"  loader='loading3' :loading="addLoad">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--choose Condition -->
        <v-dialog v-model="chooseConditionDialog" persistent max-width="25%">
            <v-card>
                <v-card-title class="headline">Choose your start condition!</v-card-title>

                <v-card-text>
                           <v-flex>
                        <v-btn-toggle v-model="config.startCondition">
                            <v-btn flat value="Businessman" color="blue-grey darken-1" >
                                Businessman
                            </v-btn>
                            <v-btn flat value="Sheikh" color="blue-grey darken-1">
                                Sheikh
                            </v-btn>
                            <v-btn flat value="Dictator" color="blue-grey darken-1">
                                Dictator
                            </v-btn>
                        </v-btn-toggle>
                           </v-flex>
                    <br>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click="chooseConditionDialog=false">Cancel</v-btn>
                    <v-btn color="blue-grey darken-1" flat @click="joinGame()" :disabled="addGameFieldsfilled">Join Game</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!---Wait for clients--->
        <v-dialog v-model="waitForClientDialog" persistent max-width="25%">
            <v-card>
                <v-card-title class="headline">{{config.gameName}} is Ready!</v-card-title>

                <v-card-text>
                    Waiting for players to start game. {{newGame.playerCount}} of 4 Players.
                        <v-btn @click="refreshCount" icon>
                        <v-icon>refresh</v-icon>
                    </v-btn>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="red darken-1" flat="flat" @click="leaveLobby">Leave</v-btn>
                    <v-spacer></v-spacer>
                       <v-btn color="green darken-1" flat="flat" @click="startGame">Start Game</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!---Wait for host--->
        <v-dialog v-model="waitForHostDialog" persistent max-width="25%">
            <v-card>
                <v-card-title class="headline">{{config.gameName}} is ready!</v-card-title>

                <v-card-text>
                    Waiting for host to start the Game.
                    <v-btn @click="refreshLobby" icon>
                        <v-icon>refresh</v-icon>
                    </v-btn>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="red darken-1" flat="flat" @click="leaveLobby">Leave</v-btn>
                    <v-spacer></v-spacer>
                    <v-progress-circular
                            color="blue-grey darken-1"
                            indeterminate
                    ></v-progress-circular>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>



    <script>
    export default {
        data() {
            return {
                leaveDialog: false,
                showSearchField: false,
                addGameDialog: false,
                chooseConditionDialog: false,
                waitForClientDialog: false,
                waitForHostDialog: false,
                addLoad:false,
                filterText:'',
                config:{
                    startCondition:'',
                    gameName:''
                },
                newGame:{
                    title:'',
                    subtitle:'',
                    playerCount:'1'
                },
                items: [

                ]
            }
        },
        computed:{
            addGameFieldsfilled:function () {
                if(this.config.startCondition === '' || this.config.gameName === '') {return true;}return false;},
        },
        methods: {
            setupList:function(){
                    this.items = [];
                this.$http.get('http://localhost:8080/user/config_meta').then(
             //       this.$http.get('http://falk.overzone-studio.de:8080/user/config_meta').then(
                    response => {
                        console.log(response.body);
                        if(response.body.availableGames != null) {
                            response.body.availableGames.forEach((game, index)=> {
                                console.log(game);
                                let userCount = game.joinedUsers.length;
                                let gameTitle = game.name;
                                let gameSubtitle = "<span class='text--primary'>"+ game.state+ "</span> &mdash;" + userCount + " Players";
                                    this.items.push({title: gameTitle, subtitle: gameSubtitle, playerCount: userCount});
                                    this.items.push({divider: true, inset: true});
                            });
                        } else {
                            console.log('AvailableGames is empty'); //todo remove
                        }
                    },
                    error=>{
                        console.log(error);
                    });
                if(this.items.length === 0){
                   //todo alert no games available
                }
            },
            chooseGame: function (game) {
                this.chooseConditionDialog = true;
                this.config.gameName = game;
            },
            enterGame: function (game, isHost) {
                if(isHost){this.waitForClientDialog=true; this.addGameDialog=false}
                else {
                    this.waitForHostDialog = true;
                }
            },
            joinGame: function(){
                this.chooseConditionDialog = false;
                console.log(this.config);
                this.createGame();
            },
            searchGame: function () {
                this.showSearchField = !this.showSearchField;
                //Todo

            },
            addGame: function () {
                this.addGameDialog = true;
            },
            createGame:function(isHost){
               this.addLoad = true;
                this.$http.post('http://localhost:8080/user/config', this.config).then(
              //  this.$http.post('http://falk.overzone-studio:8080/user/config', this.config).then(
                    response => {
                        console.log(response);
                        if(isHost === true && response.bodyText.includes("1")){
                            this.enterGame(this.config.gameName, true);
                        }else{
                            this.addGameDialog=false;
                        this.enterGame(this.config.gameName);}
                    }, error => {
                        //todo alert
                        console.log(error);
                });
            },
            backToLogin:function (sure) {
                if(sure === false) {
                    this.leaveDialog = true;
                } else {
                    this.leaveDialog = false;
                    this.$http.get('http://localhost:8080/user/logout').then(
                   // this.$http.get('http://falk.overzone-studio.de:8080/user/logout').then(
                        response => {
                            console.log(response.body);
                            this.$router.push('/');
                        },
                        error=>{
                           console.log(error);
                    });
                }
            },
            leaveLobby: function () {
                this.$http.get('http://localhost:8080/user/leaveGame').then(
               // this.$http.get('http://falk.overzone-studio.de:8080/user/leaveGame').then(
                    response => {
                        console.log(response);
                    }, error => {
                        console.log(error);
                    }
                );
                this.waitForHostDialog = false;
                this.waitForClientDialog = false;
                this.addLoad = false;
            },
            startGame:function () {
                this.$http.post('http://localhost:8080/game/start').then(
               // this.$http.post('http://falk.overzone-studio.de:8080/game/start').then(
                    response =>{
                        this.$emit('gameStarted', true);
                        console.log(response);
                        this.$router.push('/home');
                    }, error => {
                        console.log(error);
                    }
                );
            },
            async refreshCount(){
                let currentGame = await this.getGameState();
                console.log(currentGame.userCount);
                this.newGame.playerCount = currentGame.userCount;
            },
            async refreshLobby(){
                let currentGame = await this.getGameState();
                if (currentGame.state === 'Running') {
                    this.$emit('gameStarted', true);
                    this.$router.push('/home');
                }
            },
            getGameState() {
                return new Promise((resolve,reject)=> {
                    //console.log("gamestate");
                    this.$http.get('http://localhost:8080/game/state').then(
                   // this.$http.get('http://falk.overzone-studio.de:8080/game/state').then(
                        response =>{
                            console.log(response);
                            let userCount = response.body.joinedUsers.length;
                            console.log("count is " + userCount);
                            resolve({state: response.body.state, userCount: userCount});
                        }, error => {
                            console.log(error);
                            reject(null);
                        });
                });
            }
        },
        mounted:function () {
            this.setupList();
        }

    }
    </script>

<style scoped>
    .bimg{
        background: #cccccc url("../assets/backlit-clouds-dawn-162568.jpg");
        width: auto;
        height: 100%;
    }
</style>