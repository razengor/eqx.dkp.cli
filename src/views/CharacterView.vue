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
            this.charToEdit = {
              advanced: c.advanced,
              altura: c.altura,
              atributos: c.atributos,
              capacidades: c.capacidades,
              capital: c.capital,
              clase: c.clase,
              currentStats: c.currentStats,
              edad: c.edad,
              elemento: c.elemento,
              grupo: c.grupo,
              habilidades: c.habilidades,
              iniciativa: c.iniciativa,
              inventario: c.inventario,
              movilidad: c.movilidad,
              nivel: c.nivel,
              nombre: c.nombre,
              peso: c.peso,
              player: c.player,
              raza: c.raza,
              stats: c.stats,
              talentos: c.talentos,
              unitRoles: c.unitRoles,
              unitTypes: c.unitTypes,
              vision: c.vision
            }
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