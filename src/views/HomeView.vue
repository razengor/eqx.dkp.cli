<template>
  <div id="home">
    <Header v-if="games[0]" :gameName="getGame(gameid)?getGame(gameid).name:'Default'" :gameVersion="gameVersion" @changeTab="changeTab"/>

    <window-config  v-if="games[0] && selected=='conf'" :game="game" @saveConf="saveGameConfig" @removeGame="removeGame" />
    <window-players v-if="games[0] && selected=='play'" />
    <window-char    v-if="games[0] && selected=='char'" :game="game" :gameId="gameid" :isPlayer="false" @editChar="openCharEditWindow" />
    <window-comb    v-if="games[0] && selected=='comb'" />

    <edit-char-window v-if="editingChar" :char="charToEdit" :charToEditId="charToEditId" :info="info" :game="game"
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
import router from '../router/index'

const db = getDatabase(app);

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
      
      set(ref(db, "games/"+this.game.id+"/characters/"+holder.id), holder.charToEdit);
      //this.closeCharWindow();
      window.alert("¡Se han guardado los datos!");
    },
    deleteChar() {
      window.alert("La función de eliminado aun está en proceso. Si quiere eliminar información contacte con el administrador...");
    },
    saveGameConfig(gameInfo) {
      if(gameInfo!=null) {
        if(gameInfo.name!=null && gameInfo.name.length <= 20 && gameInfo.name.length >= 3)
          set(ref(db, "games/"+this.game.id+"/name"), gameInfo.name);
        if(gameInfo.version!=null && gameInfo.version.length <= 5 && gameInfo.version.length >= 1)
          set(ref(db, "games/"+this.game.id+"/version"), gameInfo.version);
        if(gameInfo.date!=null && gameInfo.date.length <= 10 && gameInfo.date.length >= 8)
          set(ref(db, "games/"+this.game.id+"/date"), gameInfo.date);
        if(gameInfo.lastDate!=null && gameInfo.lastDate.length <= 10 && gameInfo.lastDate.length >= 8)
          set(ref(db, "games/"+this.game.id+"/lastDate"), gameInfo.lastDate);
      }
    },
    removeGame() {
      if(confirm("¿Estás seguro de que quieres eliminar TODA la partida '"+this.gameName+"'?")) {
        if(confirm("¿¡SEGURO!?")) {
          set(ref(db, "games/"+this.game.id), {});
          router.push('/index');
        }
      }
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