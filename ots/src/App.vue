<template>
  <v-app id="AppVue">

<!----------------------------------------------------------Sidebar Drawer-------------------------------------------------------------->
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>

      <!-- KPI Overview-->
      <v-list>
       <v-subheader><h3>KPI's</h3><!--<v-btn @click="initKPI" icon>
           <v-icon color="grey">refresh</v-icon>
       </v-btn>--></v-subheader>
        <v-list-tile v-for="(item, i) in items" :key="i">
          <v-divider
                  v-if="item.divider"
                  :inset="item.inset"
                  :key="i"
          ></v-divider>
          <v-list-tile-action>

            <v-list-tile-avatar>
            <!--  <img :src="item.icon"> -->
              <v-icon>layers</v-icon>
            </v-list-tile-avatar>
          </v-list-tile-action>
          <v-list-tile-content>

            <v-list-tile-title v-text="item.title"></v-list-tile-title>

          </v-list-tile-content>

        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <!-- Player Overview-->
      <v-list>
        <v-subheader><h3>Other Players</h3><v-btn @click="initPlayers" icon>
            <v-icon color="grey">refresh</v-icon>
        </v-btn> </v-subheader>
        <template  v-for="(item, index) in players">
          <v-list-tile
                  :key="item.title"
                  avatar
                  @click="openPlayerDialog(item.title, item.color)"
          >
            <v-list-tile-avatar>
                <v-icon :color="item.color" large>{{item.avatar}}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <!--<img :src="item.avatar">-->
<v-divider></v-divider>
      <!-- Button Overview-->
      <v-list>
        <template  v-for="(item) in controlButtons">
          <v-list-tile
                  :key="item.title"
                  avatar
                  @click="executeButton(item.title)"
          >
            <v-list-tile-avatar>
              <v-icon large :color="item.color"> {{item.avatar}} </v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.title" :color="item.color" class="v-btn blue-grey lighten-4"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>

    </v-navigation-drawer>



<!----------------------------------------------------------------------Toolbar------------------------------------------------------------->

    <v-toolbar app :clipped-left="clipped">
      <v-btn icon @click.stop="miniVariant = !miniVariant" v-show="!drawerDisabled">
      <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
      <v-btn icon @click="openUserDialog" v-show="!drawerDisabled" slot="activator">
        <v-icon medium>account_box</v-icon>
      </v-btn>
        <v-list>
          <v-list-tile
                  v-for="(item, index) in userButtons"
                  :key="index"
                  @click="openUserDialog(item.title, item.color)"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon @click="leaveDialog=true" v-show="!drawerDisabled">
        <v-icon medium>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view @gameStarted="setupGame"></router-view>
    </v-content>

    <v-footer :fixed="fixed" app>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} FL DHBW Mannheim</div>
    </v-footer>

    <!-------------------------------------------------------------------------------------Dialogs------------------------------------------------------>
      <!--Player Intercation Dialog-->
    <v-dialog
            v-model="playerDialog"
            max-width="50%">
        <player-actions :player-tag="chosenPlayer" :player-color="chosenPlayerColor"></player-actions>
    </v-dialog>

      <!--info-->
    <v-dialog v-model="infoDialog"  max-width="50%">
        <info></info>
    </v-dialog>

      <!--leave-->
    <v-dialog v-model="leaveDialog" max-width="25%">
      <v-card>
        <v-card-title class="headline">Sure you want to leave?</v-card-title>

        <v-card-text>
         You are going to leave a running game... No data will be saved.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="leaveDialog = false">NO</v-btn>
          <v-btn color="red darken-1" flat="flat" @click="leaveApp">Leave</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <!--logOut-->
      <v-dialog v-model="logOutDialog" max-width="25%">
          <v-card>
              <v-card-title class="headline">Sure you want to log out?</v-card-title>

              <v-card-text>
                  You are going to leave a running game... No data will be saved while logging out.
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" @click="leaveDialog = false">NO</v-btn>
                  <v-btn color="red darken-1" flat="flat" @click="logOut">log Out</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>


      <!---Loading--->
      <v-dialog
              v-model="progressor"
              hide-overlay
              persistent
              width="300">
          <v-card
                  color="blue-grey"
                  dark>
              <v-card-text>
                  Please stand by
                  <v-progress-linear
                          indeterminate
                          color="white"
                          class="mb-0"
                  ></v-progress-linear>
              </v-card-text>
          </v-card>
      </v-dialog>
  </v-app>
</template>

<script>


import PlayerActions from "@/components/PlayerActions";
import Info from "@/components/Info";
import {eventBus} from "@/main";


export default {
  name: 'App',
    components: {Info,PlayerActions},
    data () {
    return {
      clipped: true,
      fixed: false,
        playerDialog: false,
        infoDialog: false,
        leaveDialog: false,
        logOutDialog:false,
        progressor : false,
        chosenPlayer:'',
        chosenPlayerColor:'',
        userButtons: [
            { title: 'Info' },
            { title: 'Settings'},
            { title: 'Leave Game' },
            { title: 'Log out' }
        ],
      items: [
          {id:0,title:this.$store.getters.playerCash.toLocaleString() + ' $ Cash' },
          {id:1,title:this.$store.getters.playerOil.toLocaleString() + ' barrel Oil' },
          {id:2,title:this.$store.getters.playerFuel.toLocaleString() + ' barrel Fuel' },
          {id:3,title:this.$store.getters.playerWT + '% of Worldtrade' },
          {id:4,title:this.$store.getters.playerOW + ' Oil fields' },
          {id:5,title:this.$store.getters.playerOT + ' Oil towers' },
          {id:6,title:this.$store.getters.playerR + ' Rafineries' },
          {id:7,title:this.$store.getters.playerOW + ' national resellers' },

      ],
        players: [],
        controlButtons:[
            {
              avatar:'assessment',
              title:'Dashboard',
                color: 'blue'
            },
            {
                avatar: 'check_circle',
                title: 'End Turn',
                color:'red'
            }
        ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Oil Tycoon Simulator',
        initialPlayers:[],
        userName:''
    }
  },
    computed:{
      drawerDisabled: function () {
          return this.$store.getters.drawerDisabled;
      },
     drawer: function () {
          return this.$store.getters.drawerAway;
      },
        userCash:function () {
            //todo
        }
    },
    methods: {
      setupGame:function(){
          this.initKPI();
       //   this.initPlayers(); TODO remove decomment
      },
      logOut:function () {
          this.leaveGame();
          this.$http.get('http://localhost:8080/user/logout').then(
          //this.$http.get('http://falk.overzone-studio.de:8080/user/logout').then(
              response => {
                  console.log(response);
                  this.logOutDialog = false;
                  this.$store.commit('lockNavBar');
                  this.$store.commit('unlockDrawer');
                  this.$router.push('/');
              },
              error=>{
                  console.log(error);
              });

      },
        leaveApp:function () {
         this.leaveGame();
         this.leaveDialog = false;
            this.$store.commit('lockNavBar');
            this.$store.commit('unlockDrawer');
            this.$router.push('/gamelist');
        },
        openUserDialog:function (type) {
            switch (type) {
                case 'Info' : this.infoDialog = true;
                    break;
                case 'Leave Game' :
                    this.leaveDialog = true; //Todo
                    break;
                case 'Settings' : //alert('Settings')
                    this.progressor = false;
                    break;
                case 'Log out' :
                    this.logOutDialog =true;
                    break;
                default: console.log('no Type for openUserDialog found');
            }
        },
        openPlayerDialog:function (player, playerColor) {
            this.chosenPlayer = player;
            this.chosenPlayerColor = playerColor;
            this.playerDialog = true;

        },
        executeButton:function (type) {
            switch (type) {
                case 'End Turn' :
                    this.progressor = true;
                    this.$http.post('http://localhost:8080/game/round_finished').then(
                  //  this.$http.post('http://falk.overzone-studio.de:8080/game/round_finished').then(
                        response => {
                            console.log(response);
                            let interval = setInterval(()=>{
                                this.$http.get('http://localhost:8080/game/state').then(
                               // this.$http.get('http://falk.overzone-studio.de:8080/game/state').then(
                                    response =>{
                                        console.log(response);
                                        if(response.body.state === 'Running'){
                                            this.progressor = false;
                                        //    this.controlButtons[0].title='WorldMap';
                                        //    this.controlButtons[0].avatar = 'my_location';
                                        //    this.$router.push('/Dashboard');
                                            clearInterval(interval);
                                        }
                                    }, error=>{
                                        console.log(error);
                                    }
                                );
                            }, 1000)
                        }, error => {
                           console.log(error);
                });
                    break;
                case 'Dashboard' :
                    this.controlButtons[0].title = 'World Map';
                    this.controlButtons[0].avatar = 'my_location';
                    this.$router.push('/Dashboard');
                    break;
                case 'World Map' :
                    this.controlButtons[0].title = 'Dashboard';
                    this.controlButtons[0].avatar = 'assessment';
                    this.$router.push('/home');
                    break;
                //default: console.log('no Type for executeButton found')
            }
        },
        async initKPI(){
         // this.items = [];
          this.players = await this.callPlayer();
          this.userName=await this.callUsername();
            console.log(this.userName+"----");
           this.players.forEach((player)=>{
               if(player.name === this.userName){
                    this.$store.commit('setPlayerCash', player.cash.value);
                   // this.items.push({title:this.$store.getters.playerCash +" $ "+player.cash.id});
                    this.$store.commit('setPlayerOil', player.oilAmount.value);
                   // this.items.push({title:this.$store.getters.playerOil +" barrel "+player.oilAmount.id});
                    this.$store.commit('setPlayerFuel', player.fuelAmount.value);
                 //   this.items.push({title:this.$store.getters.playerFuel +" barrel "+player.fuelAmount.id});
                    this.$store.commit('setPlayerWT', player.percentWT.value);
                  //  this.items.push({title:this.$store.getters.playerWT +" "+player.percentWT.id});
                    this.$store.commit('setPlayerOW', player.oilWellNumber.value);
                 //   this.items.push({title:this.$store.getters.playerOW +" "+player.oilWellNumber.id});
                    this.$store.commit('setPlayerOT', player.oilTowerNumber.value);
                 //   this.items.push({title:this.$store.getters.playerOT +" "+player.oilTowerNumber.id});
                    this.$store.commit('setPlayerR', player.rafineryNumber.value);
                 //   this.items.push({title:this.$store.getters.playerR +" "+player.rafineryNumber.id});
                    this.$store.commit('setPlayerRe', player.nationalResellers.value);
                 //   this.items.push({title:this.$store.getters.playerRe +" "+player.nationalResellers.id});
                    //this.$store.commit('setPlayerPipe', player.kmPipeline.value);
                    //this.items.push({title:this.$store.getters.playerPipe +" "+player.kmPipeline.id});
               }
           });
        },
         updateKPI(){
            this.items.forEach((item)=>{
                switch(item.id){
                   case 0: item.title = this.$store.getters.playerCash.toLocaleString() + ' $ Cash';
                       break;
                   case 1: item.title = this.$store.getters.playerOil.toLocaleString() + ' barrel Oil';
                       break;
                   case 2: item.title = this.$store.getters.playerFuel.toLocaleString() + ' barrel Fuel';
                       break;
                   case 3: item.title = this.$store.getters.playerWT + '% of Worldtrade';
                       break;
                   case 4: item.title = this.$store.getters.playerOW + ' Oil fields';
                       break;
                   case 5: item.title = this.$store.getters.playerOT + ' Oil towers';
                       break;
                   case 6: item.title = this.$store.getters.playerR + ' Rafineries';
                       break;
                   case 7: item.title = this.$store.getters.playerRe + ' national resellers';
                       break;
               }
            });
        },
        async initPlayers(){
          this.initialPlayers = [];
          this.players = [];
          let counter = 0;
          let colors = ['indigo','orange', 'green'];

            this.initialPlayers = await this.callPlayer();
            this.userName = await this.callUsername();

            this.initialPlayers.forEach((player) =>{
                if(player.name !== this.userName) {
                    this.players.push({avatar: 'account_circle', title: player.name, color: colors[counter]});
                    counter++;
                }
            });
        },

        leaveGame: function () {
          this.$http.get('http://localhost:8080/user/leaveGame').then(
           // this.$http.get('http://falk.overzone-studio.de:8080/user/leaveGame').then(
                response => {
                    console.log(response);
                    this.initKPI();
                }, error => {
                    console.log(error);
                }
            );
        },

        setDrawer:function () {
            this.$store.commit('lockDrawer');
        },

        callPlayer () {
            return new Promise((resolve,reject)=> {
                this.$http.get('http://localhost:8080/game/entities').then(
               // this.$http.get('http://falk.overzone-studio.de:8080/game/entities').then(
                    response => {
                        console.log(response.url + " status:"+ response.status);
                        this.$store.commit('setPlayers', response.body.players);
                        resolve(response.body.players);
                    }, error => {
                        console.log(error);
                        reject(error);
                    });
            });
        },
        callUsername () {
            return new Promise((resolve,reject)=> {
            this.$http.get('http://localhost:8080/user/name').then(
         //       this.$http.get('http://falk.overzone-studio.de:8080/user/name').then(
                response=>{
                    console.log(response.url + response.status);
                    this.$store.commit('setPlayers', response.bodyText);
                    resolve(response.bodyText);
                },error=>{
                    console.log('error');
                    reject(error);
                });
            });
        }
    },
    created: function () {
        console.log('App created');
        this.initKPI();
        this.initPlayers();
        this.updateKPI();

        eventBus.$on('KPIChange',(data)=>{
            console.log('KPIChange');
            this.updateKPI();
        });
    },
    beforeDestroy(){
      console.log('destroy');
    }
}
</script>

<style>
  html, body {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
</style>