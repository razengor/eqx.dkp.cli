<template>
  <div id="home">
    <Header v-if="games[0]" :gameName="getGame(gameid)?getGame(gameid).name:'Default'" :gameVersion="gameVersion" @changeTab="changeTab"/>

    <window-config  v-if="games[0]" v-show="selected=='conf'" />
    <window-players v-if="games[0]" v-show="selected=='play'" />
    <window-char    v-if="games[0]" v-show="selected=='char'" :game="game" :gameId="gameid" :isPlayer="false" @editChar="openCharEditWindow" />
    <window-comb    v-if="games[0]" v-show="selected=='comb'" />

    <edit-char-window v-if="editingChar" :char="charToEdit" :charToEditId="charToEditId" :info="info"
     @closeChar="closeCharWindow" @saveChar="saveCharToEdit" @deleteChar="deleteChar" />

    <div class="loading-screen" v-if="!games[0]">
      <h1>LOADING</h1>
    </div>
  </div>
</template>

<script>
import Header from '@/components/HomeHeaderComponent'
import ConfigWindow from '@/components/ConfigWindow'
import PlayersWindow from '@/components/PlayersWindow'
import CharactersWindow from '@/components/CharactersWindow'
import CombatsWindow from '@/components/CombatsWindow'
import CharacterEditWindow from '@/components/CharacterEditWindow'

import {mapActions, mapState} from 'vuex'

import app from '../firebase'
import { getDatabase, ref, set } from "firebase/database";


export default {
  name: 'HomeView',
  components: {
    "Header": Header,
    "window-config": ConfigWindow,
    "window-players": PlayersWindow,
    "window-char": CharactersWindow,
    "window-comb": CombatsWindow,
    "edit-char-window": CharacterEditWindow
  },
  data: function() {
    return {
      gameid: null,
      loaded: false,
      gameName: "",
      gameVersion: "",
      selected: "conf",
      game: {},
      charToEdit: {},
      charToEditId: null,
      editingChar: false
    };
  },
  methods: {
    ...mapActions(['getGames','getUserSesion']),
    getGame(gameId) {
      //console.log("getGame");
      var result;
      this.games.forEach(game => {
        if(game.id == gameId) {
          result = game;
        }
      });
      //console.log("-Result:");
      //console.log(result);
      if(result) {
        this.gameName = result.name;
        this.gameVersion = "EQUINOX "+result.version;
        this.game = result;
      }
      return result;
    },
    changeTab(event, tab) {
      event;
      this.selected = tab;
    },
    openCharEditWindow(holder) {
      this.charToEdit = holder.char;
      this.charToEditId = holder.id;
      this.editingChar = true;
      document.getElementById("body").classList.add('editing-char');
      window.scrollTo(0, 0);
    },
    closeCharWindow() {
      this.editingChar = false;
      document.getElementById("body").classList.remove('editing-char');
    },
    saveCharToEdit(holder) {
      const db = getDatabase(app);
      set(ref(db, "games/"+this.game.id+"/characters/"+holder.id), holder.charToEdit);
      //this.closeCharWindow();
      window.alert("¡Se han guardado los datos!");
    },
    deleteChar() {
      window.alert("La función de eliminado aun está en proceso. Si quiere eliminar información contacte con el administrador...");
    }
  },
  computed: {
    ...mapState(['games','users','info','user'])
  },
  mounted() {
    this.loaded = this.getUserSesion().uid!=null ? true : false;
    this.gameid = this.$route.params.gameid
  }
}
</script>

<style scoped>
#home-body {
  padding-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>