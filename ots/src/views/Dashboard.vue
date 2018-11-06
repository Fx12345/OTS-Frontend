<template>
    <v-container fluid grid-list-md>
        <v-data-iterator :items="players" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination" content-tag="v-layout"
                hide-actions row wrap>
            <v-toolbar slot="header" class="mb-2" color="blue-grey" dark flat>
                <v-toolbar-title>Round Dashboard</v-toolbar-title>
            </v-toolbar>

            <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3>
                <v-card>
                    <v-card-title class="subheading font-weight-bold">{{ props.item.name}}</v-card-title>

                    <v-divider></v-divider>

                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-content>Cash:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.cash.value }}</v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-content>Oil Amount:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.oilAmount.value }}</v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-content>Fuel Amount:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.fuelAmount.value }}</v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-content>% Worldtrade:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.percentWT.value }}</v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-content>Oil Fields:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.oilWellNumber.value }}</v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-content>Oil Towers:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.oilTowerNumber.value }}</v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-content>Rafineries:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.rafineryNumber.value }}</v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-content>Resellers:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.nationalResellers.value }}</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>


            <v-toolbar
                    slot="footer"
                    class="mt-2"
                    color="blue-grey"
                    dark
                    dense
                    flat>
                <v-toolbar-title class="subheading"><v-btn @click="navToMap" outline color="white">Back to map</v-btn></v-toolbar-title>
            </v-toolbar>
        </v-data-iterator>
    </v-container>
</template>

<script>

    export default {
        name: "Dashboard",
        data () {
            return{
                items: [],
                players:[],
                ters:[],
                rowsPerPageItems: [4, 8, 12],
                pagination: {
                    rowsPerPage: 4
                },
            }
        },
        methods:{
            loadDashboard(){
                console.log("dash");

                this.$http.get('http://localhost:8080/game/entities').then(
    //                this.$http.get('http://falk.overzone-studio.de:8080/game/entities').then(
                        response =>{
                        console.log(response.body);
                        this.items = response.body;
                        this.players = response.body.players;
                        this.ters = response.body.territories;
                    }, error =>{
                        console.log(error);
                    }
                );
            },
            navToMap(){
               // this.$router.push('/home')
            }
        },
        created(){
            console.log('dashboard created');
            this.loadDashboard();
        }
    }
</script>

<style scoped>

</style>