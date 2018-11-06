<template>
            <v-card >
                <v-card-title class="headline justify-center">Territory {{postDesignation}}</v-card-title>

                <v-card-text>
                    <v-tabs
                            centered
                            color="grey lighten-1"

                            icons-and-text
                            grow>
                        <v-tabs-slider color="blue-grey"></v-tabs-slider>

                        <v-tab href="#tab-1" >
                            Info
                            <v-icon>info</v-icon>
                        </v-tab>

                        <v-tab href="#tab-2">
                            Sales
                            <v-icon>local_atm</v-icon>
                        </v-tab>

                        <v-tab href="#tab-3">
                            Structures
                            <v-icon>control_camera</v-icon>
                        </v-tab>

                        <v-tab-item
                                v-for="i in 3"
                                :id="'tab-' + i"
                                :key="i">
                            <v-card flat>

                                <!------------------------------------------------------------------------------------------------------>
                                <v-card-text v-if="i === 1">
                                    <v-container grid-list-md>
                                        <v-layout row wrap>
                                            <v-flex xs6>
                                                <!--TODO data table--->
                                                <h3>Territory ID: {{postId}}</h3>
                                                <br>
                                                <h3>Population: {{postPopulation.toLocaleString()}} people</h3>
                                                <br>
                                                <h3>Area: {{postArea.toLocaleString()}} km&sup2;</h3>
                                                <br>
                                                <h3>Population Density: {{postPopulationDensity.toLocaleString()}} people/km&sup2;</h3>
                                                <br>
                                                <h3>Wealth level: {{postWealth}}</h3>
                                            </v-flex>
                                            <v-flex xs6>
                                                <h3>Oil sold {{postOilSold.toLocaleString()}} barrel</h3>
                                                <br>
                                                <h3>Fuel sold {{postFuelSold.toLocaleString()}} barrel</h3>
                                                <br>
                                                <h3>Cash from {{postDesignation}} {{postIncome.toLocaleString()}}$</h3>
                                                <br>
                                                <h3>Oil produced {{postOilWin.toLocaleString()}} barrel</h3>
                                                <br>
                                                <h3>Fuel produced {{postFuelProcessed.toLocaleString()}} barrel</h3>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>

                                <!------------------------------------------------------------------------------------------------------>
                                <v-card-text v-if="i === 2">
                                    <div v-if="resellerToBool">
                                    <v-container
                                            fluid
                                            grid-list-lg>
                                        <v-layout
                                                row
                                                wrap>

                                            <v-subheader class="pl-0"><h2>Oil Price in {{postDesignation}}</h2></v-subheader>
                                            <v-flex xs12>
                                                <v-slider
                                                        v-model="localOilPrice"
                                                        :max="250"
                                                        label="$ per barrel"
                                                        thumb-label
                                                        thumb-color="blue-grey"
                                                        color="blue-grey"
                                                ></v-slider>
                                            </v-flex>

                                            <v-flex xs1>
                                                <v-text-field
                                                        v-model="localOilPrice"
                                                        class="mt-0"
                                                        type="decimal"
                                                        label="Oil"
                                                        suffix="$"
                                                ></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <br>
                                            <v-layout row wrap>
                                                <v-subheader class="pl-0"><h2>Fuel Price in {{postDesignation}}</h2></v-subheader>
                                            <v-flex xs12>
                                                <v-slider
                                                        v-model="localFuelPrice"
                                                        :max="800"
                                                        label="$ per barrel"
                                                        thumb-label
                                                        thumb-color="blue-grey"
                                                        color="blue-grey"
                                                ></v-slider>
                                            </v-flex>

                                            <v-flex xs1>
                                                <v-text-field
                                                        v-model="localFuelPrice"
                                                        type="decimal"
                                                        class="mt-0"
                                                        label="Fuel"
                                                        suffix="$"
                                                ></v-text-field>
                                            </v-flex>

                                        </v-layout>
                                    </v-container>
                                    </div>
                                    <div v-else>
                                        <v-subheader class="pl-0"><h2>No reseller in territory {{postDesignation}}.</h2></v-subheader>
                                        <v-btn dark color="blue-grey" round @click="buildStructure('Re')">
                                            <v-icon left dark>add</v-icon>Open a Reseller for {{postResellerPrice.toLocaleString()}}$
                                        </v-btn>
                                    </div>

                                    <!------------------------------------------------------------------------------------------------------>
                                </v-card-text>
                                <v-card-text v-if="i === 3">
                                    <v-list two-line>
                                        <v-list-tile>
                                            <v-list-tile-avatar>
                                                <v-icon medium>domain</v-icon>
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Oil field: {{localOW}}</v-list-tile-title>
                                                <v-list-tile-sub-title>Price:  {{postOilWellPrice.toLocaleString()}} $</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action><v-btn icon ripple @click="buildStructure('OW')"><v-icon medium color="blue-grey">add_circle</v-icon></v-btn></v-list-tile-action>
                                        </v-list-tile>
                                        <v-list-tile>
                                            <v-list-tile-avatar>
                                                <v-icon medium>domain</v-icon>
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Oil tower: {{localOT}}</v-list-tile-title>
                                                <v-list-tile-sub-title>Price:  {{postOilTowerPrice.toLocaleString()}} $</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action><v-btn icon ripple @click="buildStructure('OT')"><v-icon medium color="blue-grey">add_circle</v-icon></v-btn></v-list-tile-action>
                                        </v-list-tile>
                                        <v-list-tile>
                                            <v-list-tile-avatar>
                                                <v-icon medium>domain</v-icon>
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Rafinery: {{localR}}</v-list-tile-title>
                                                <v-list-tile-sub-title>Price:  {{postRafineryPrice.toLocaleString()}} $</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action><v-btn icon ripple @click="buildStructure('R')"><v-icon medium color="blue-grey">add_circle</v-icon></v-btn></v-list-tile-action>
                                        </v-list-tile>
                                        <v-list-tile>
                                            <v-list-tile-avatar>
                                                <v-icon medium>domain</v-icon>
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Reseller: {{localHasReseller}}</v-list-tile-title>
                                                <v-list-tile-sub-title>Price:  {{postResellerPrice.toLocaleString()}} $</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action><v-btn icon ripple @click="buildStructure('Re')" :disabled="resellerToBool"><v-icon medium color="blue-grey">add_circle</v-icon></v-btn></v-list-tile-action>
                                        </v-list-tile>
                                    </v-list>
                                </v-card-text>
                                <!--<v-list-tile-action><v-spacer></v-spacer><v-btn color="blue-grey" @click="closeArea" outline>Close</v-btn></v-list-tile-action>-->
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-card-text>
            </v-card>


</template>

<script>
    import {eventBus} from "@/main";

    export default {
        name: "Area",
        props: ['postDesignation','postId', 'postPopulation', 'postPopulationDensity',
            'postWealth', 'postArea', 'postOilPrice', 'postFuelPrice', 'postHasReseller',
            'postOilWellPrice', 'postOilTowerPrice','postRafineryPrice','postResellerPrice',
        'postOilWellCount', 'postOilTowerCount', 'postRafineryCount', 'postOilSold', 'postFuelSold',
        'postIncome', 'postOilWin', 'postFuelProcessed'],
        data () {
            return {
                tabs: null,
                dialogIsOpen: false,
                localOilPrice: this.postOilPrice,
                localFuelPrice: this.postFuelPrice,
                localHasReseller: this.postHasReseller,
                localOW: this.postOilWellCount,
                localOT: this.postOilTowerCount,
                localR: this.postRafineryCount,

            }
        },
        computed: {
            oilPrice: {
                get: function () {
                    return this.postOilPrice;
                },
                set: function (value) {
                    this.$emit('oilPriceChanged', value);
                }
            },
            fuelPrice: {
                get: function () {
                    return this.postFuelPrice;
                },
                set: function (value) {
                    this.$emit('fuelPriceChanged', value);
                }
            },
            resellerToBool:function() {
                return this.localHasReseller > 0;
             }
        },
        methods: {
            changeVal:function () {
                this.$store.commit('setDialog');
                this.dialog = true;
            },
            closeArea(){

            },
            buildStructure:function (type) {
                console.log('build' + type);
                switch(type){
                    case 'OW':
                        console.log('OWWW');
                        if(parseInt(this.$store.getters.playerCash) >= parseInt(this.postOilWellPrice)){
                            this.$store.commit('setPlayerCash', parseInt(this.$store.getters.playerCash) - parseInt(this.postOilWellPrice));
                            this.localOW ++;
                            let x = this.$store.getters.playerOW;
                            this.$store.commit('setPlayerOW', x+1 );
                            eventBus.$emit('KPIChange', type);
                        }
                        break;
                    case 'OT':
                        console.log('OTS');
                        if(parseInt(this.$store.getters.playerCash) >=parseInt(this.postOilTowerPrice)){
                            this.$store.commit('setPlayerCash', parseInt(this.$store.getters.playerCash) - parseInt(this.postOilTowerPrice));
                            this.localOT ++;
                            let x = this.$store.getters.playerOT;
                            this.$store.commit('setPlayerOT', x+1 );
                            eventBus.$emit('KPIChange', type);
                        }
                        break;
                    case 'R':
                        if(parseInt(this.$store.getters.playerCash) >= parseInt(this.postRafineryPrice)){
                            console.log('rafineryyyy');
                            this.$store.commit('setPlayerCash', parseInt(this.$store.getters.playerCash) - parseInt(this.postResellerPrice));
                            this.localR ++;
                            let x = this.$store.getters.playerR;
                            this.$store.commit('setPlayerR', x+1 );
                            eventBus.$emit('KPIChange', type);
                        }
                        break;
                    case 'Re':
                        if(parseInt(this.$store.getters.playerCash) >= parseInt(this.postResellerPrice)){
                            this.$store.commit('setPlayerCash', parseInt(this.$store.getters.playerCash) - parseInt(this.postResellerPrice));
                            this.localHasReseller += 1;
                            let x = this.$store.getters.playerRe;
                            this.$store.commit('setPlayerRe', x+1 );
                            eventBus.$emit('KPIChange', type);
                            console.log('Reseller');
                        }
                        break;
                }

            }
        },
        created(){
            eventBus.$on('areaClosed', (data)=> {
                console.log('areaclosed');
                if (this.dialogIsOpen === true) {
                    this.dialogIsOpen = false;
                    this.tabs = null;
                    let areaData =
                        {
                            territoryId: this.postId,
                            numberOfOilWells: this.localOW,
                            numberOfOilTowers: this.localOT,
                            numberOfRafinery: this.localR,
                            numberOfResellers: this.localHasReseller,
                            newOilPrice: this.localOilPrice,
                            newFuelPrice: this.localFuelPrice
                        };

                    eventBus.$emit('safeState', areaData);
                    this.localOilPrice = 0;
                    this.localFuelPrice = 0;
                    this.localHasReseller = 0;
                }
            });

            eventBus.$on('areaOpened', (data)=>{
                console.log('areaOpened');
                this.dialogIsOpen = true;
                this.localFuelPrice = this.postFuelPrice;
                this.localOilPrice = this.postOilPrice;
                this.localHasReseller = this.postHasReseller;
                this.localOW = this.postOilWellCount;
                this.localOT = this.postOilTowerCount;
                this.localR = this.postRafineryCount;
            })
        }
    }
</script>

<style scoped>

</style>