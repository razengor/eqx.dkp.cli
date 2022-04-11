<template>
  <div id="index">
    <img id="background-dice" src="../assets/logo.png">

    <Header/>

    <main>
      <span>- PARTIDAS -</span>
      <button v-for="partida in games" :key="partida.id" :game="partida"
       @click="goTo(partida.id)">
        {{partida.name}}
      </button>
      <!-- Add new game button -->
      <input class="add-new-game" type="text" v-model="newGameName" placeholder="Nombre de la Partida nueva" v-show="isCreatingNewGame">
      <button class="add-new-game" @click="createNewGame">Crear nueva Partida</button>
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
    "Footer": Footer,
    //"partida": Partida
  },
  data: function() {
    return {
      newGameName: "",
      isCreatingNewGame: false
    };
  },
  methods: {
    ...mapActions(['getGames']),
    createNewGame() {
      if(this.isCreatingNewGame) {
        //TODO: Ejecuta función crear nueva partida de store/index.js y vuelve a cargar getGames para remontar los componentes
      } else {
        this.newGameName = "";
        this.isCreatingNewGame = true;
      }
    },
    goTo(gameId) {
      router.push('/g/'+gameId);
    }
  },
  computed: {
    ...mapState(['games','users']),
  },
  mounted() {
    this.getGames()
  }
}
</script>

<style scoped>
/*#index {
  height: 100%;
  width: 100%;
  display: grid;
}
#index-body {
  padding-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#games {
  width: 45%;
  max-width: 800px;
  background-color: rgb(88, 88, 88);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 15px 0;
}
.partida {
  width: 80%;
  background-color: rgb(53, 53, 53);
  border-radius: 5px;

  color: rgb(228, 228, 228);
  padding: 15px;
  margin: 10px 0;

  font-size: 1.5em;
  font-weight: bold;

  cursor: pointer;
}*/
</style>
