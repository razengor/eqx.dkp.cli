<template>
  <div id="index">
    <img id="background-dice" src="../assets/logo.png">

    <Header/>

    <main>
      <span>- PARTIDAS -</span>
      <button v-for="partida in games" :key="partida.id"
       @click="goTo(partida.id)">
        {{partida.name}}
      </button>

      <button v-for="character in characters" :key="character.id"
       @click="goToCharacter(character.gameId,character.cId)">
        {{character.gameName + ' / ' + character.nombre}}
      </button>
      
      <!-- Add new game button -->
      <input v-if="user.tipo!='jugador'" class="add-new-game" type="text" v-model="newGameName" placeholder="Nombre de la Partida nueva" v-show="isCreatingNewGame">
      <button v-if="user.tipo!='jugador'" class="add-new-game" @click="createNewGame">Crear nueva Partida</button>
    </main>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/HeaderComponent'
import Footer from '@/components/FooterComponent'

import {mapActions, mapState} from 'vuex'
import router from '../router/index'

export default {
  name: 'IndexView',
  components: {
    "Header": Header,
    "Footer": Footer
  },
  data: function() {
    return {
      newGameName: "",
      isCreatingNewGame: false
    };
  },
  methods: {
    ...mapActions(['getGames','getUserSesion','createGame']),
    createNewGame() {
      if(this.isCreatingNewGame) {
        this.createGame(this.newGameName);
        //this.getGames();
      } else {
        this.newGameName = "";
        this.isCreatingNewGame = true;
      }
    },
    goTo(gameId) {
      router.push('/g/'+gameId);
    },
    goToCharacter(gameId, cId) {
      router.push('/g/'+gameId+'/c/'+cId);
    }
  },
  computed: {
    ...mapState(['games','user','users','characters']),
    
  },
  mounted() {
    if(this.user=="")
    this.getUserSesion();
  }
}
</script>

<style scoped>
</style>
