<template>
  <div id="home">

    <edit-char-window v-if="charToEdit.nombre" :char="charToEdit" :charToEditId="charToEditId" :info="info" :isPlayer="true" :game="game"
     @closeChar="closeCharWindow" @saveChar="saveCharToEdit" @deleteChar="deleteChar" />

    <!--<div class="loading-screen" v-if="!games[0]">
      <h1>LOADING</h1>
    </div>-->
  </div>
</template>

<script>
import CharacterEditWindow from '@/components/CharacterEditWindow'

import {mapActions, mapState} from 'vuex'
import router from '../router/index'

import app from '../firebase'
import { getDatabase, ref, set } from "firebase/database";


export default {
  name: 'CharacterView',
  components: {
    "edit-char-window": CharacterEditWindow
  },
  data: function() {
    return {
      loaded: false,
      game: {},
      charToEdit: {},
      charToEditId: null
    };
  },
  methods: {
    ...mapActions(['getGames','getUserSesion']),
    saveCharToEdit(holder) {
      const db = getDatabase(app);
      set(ref(db, "games/"+this.gameid+"/characters/"+holder.id), holder.charToEdit);
    },
    closeCharWindow() {
      document.getElementById("body").classList.remove('editing-char');
      router.push('/index');
    },
    deleteChar() {
      window.alert("¡No puedes eliminar a tu propio personaje!");
    }
  },
  computed: {
    ...mapState(['info','characters'])
  },
  mounted() {
    this.getUserSesion();

    this.gameid = this.$route.params.gameid
    this.charToEditId = this.$route.params.characterid
    document.getElementById("body").classList.add('editing-char');
  },
  watch: {
    characters() {
      if(this.characters.length>0) {
        Object.keys(this.characters).forEach(o => {
          var c = this.characters[o];
          if(c.cId == this.charToEditId) {
            this.charToEdit = JSON.parse(JSON.stringify(c));
            this.charToEdit.cId = null;
            this.charToEdit.gameId = null;
            this.charToEdit.gameName = null;
          }
        });
        this.editingChar = true;
      }
    }
  }
}
</script>

<style scoped>
</style>