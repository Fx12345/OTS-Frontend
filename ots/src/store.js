import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      drawerDisabled: true,
      drawerAway: false,
      dialog: false,
      userName:'',
      players:[],
      playerCash:0,
      playerOil:0,
      playerFuel:0,
      playerWT:0,
      playerOW:0,
      playerOT:0,
      playerR:0,
      playerRe:0,
      playerPipe:0
  },
    getters:{
      drawerDisabled: state => {
          return state.drawerDisabled;
      },
        drawerAway: state => {
          return state.drawerAway;
        },
        dialog: state => {
            return state.dialog;
        },
        userName: state => {
            return state.userName;
        },
        players: state => {
            return state.players;
        },
        playerCash: state => {
            return state.playerCash;
        },
        playerOil: state => {
            return state.playerOil;
        },
        playerFuel: state => {
            return state.playerFuel;
        },
        playerWT: state => {
            return state.playerWT;
        },
        playerOW: state => {
            return state.playerOW;
        },
        playerOT: state => {
            return state.playerOT;
        },
        playerR: state => {
            return state.playerR;
        },
        playerPipe: state => {
            return state.playerPipe;
        },
        playerRe: state => {
            return state.playerRe;
        }

    },

  mutations: {
      unlockNavBar: state => {
          state.drawerDisabled = false;
      },
      lockNavBar: state => {
          state.drawerDisabled = true;
      },
      unlockDrawer: state => {
          state.drawerAway = false;
      },
      lockDrawer: state => {
          state.drawerAway = true;
      },
      setDialog: state => {
          state.dialog = true;
      },
      setUsername: (state,uName) => {
          state.userName = uName;
      },
      setPlayers: (state, players) => {
          state.players = players;
      },
      setPlayerCash: (state, value) => {
          state.playerCash = value;
      },
      setPlayerOil: (state, value) => {
          state.playerOil = value;
      },
      setPlayerFuel: (state, value) => {
          state.playerFuel = value;
      },
      setPlayerWT: (state, value) => {
          state.playerWT = value;
      },
      setPlayerOW: (state, value) => {
          state.playerOW = value;
      },
      setPlayerOT: (state, value) => {
          state.playerOT = value;
      },
      setPlayerR: (state, value) => {
          state.playerR = value;
      },
      setPlayerRe: (state, value) => {
          state.playerRe = value;
      },
      setPlayerPipe: (state, value) => {
          state.playerCash = value;
      },
  },
  actions: {

  }
})
