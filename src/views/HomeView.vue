<template>
  <div id="home">
    <Header v-if="games[0]" :gameName="getGame(gameid)?getGame(gameid).name:'Default'" :gameVersion="gameVersion" @changeTab="changeTab"/>
    
    <window-config  v-if="games[0]" v-show="selected=='conf'" />
    <window-players v-if="games[0]" v-show="selected=='play'" />
    <window-char    v-if="games[0]" v-show="selected=='char'" :game="game" @editChar="openCharEditWindow" />
    <window-comb    v-if="games[0]" v-show="selected=='comb'" />

    <edit-char-window v-if="editingChar" :char="charToEdit" :game="game" @closeChar="closeCharWindow" />

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
      editingChar: false
    };
  },
  methods: {
    ...mapActions(['getGames']),
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
    openCharEditWindow(event, char) {
      event;char;
      console.log("Opening char edit window...");
      this.charToEdit = char;
      this.editingChar = true;
      document.getElementById("body").classList.add('editing-char');
      window.scrollTo(0, 0);
    },
    closeCharWindow() {
      this.editingChar = false;
      document.getElementById("body").classList.remove('editing-char');
    }
  },
  computed: {
    ...mapState(['games']),
    ...mapState(['users'])
  },
  mounted() {
    this.loaded=this.getGames(),
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