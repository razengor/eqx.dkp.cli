<template>
    <div id="window-char" class="window shown">
        <h3>FICHAS</h3>
        <div id="info-char" class="char-box" v-if="loadedChars">
          <character-group-name v-for="group in charGroups" :key="'g-'+group.gname" :game="game" :group="group" @editChar="transmitEvent" />
        </div>
        <div class="window-footer">
            <button class="add" @click="addNewChar">NUEVA FICHA</button>
        </div>
    </div>
</template>

<script>
import CharacterGroupName from '@/components/CharacterGroupName'

import {mapActions} from 'vuex'

export default {
  name: 'CharactersWindow',
  props: ["game","gameId"],
  components: {
    "character-group-name": CharacterGroupName
  },
  data () {
    return {
      loadedChars: false,
      charGroups: {}
    }
  },
  methods: {
    ...mapActions(['createChar']),
    loadGroups() {
      var game = this.game;
      if(game.characters) {
        Object.keys(game.characters).forEach(cid => {
          var char = game.characters[cid];
          if (!char.grupo) char.grupo = "General"
          if(!this.charGroups[char.grupo]) {
            //Si no existe ya el grupo lo inicializamos
            let tempGroup = {};
            tempGroup.characters = {};
            tempGroup.gName = char.grupo;
            this.charGroups[char.grupo] = tempGroup;
          }
          this.charGroups[char.grupo].characters[cid] = char;
        });
        this.loadedChars = true;
      }
    },
    transmitEvent(holder) {
      this.$emit('editChar',holder);
    },
    addNewChar() {
      this.createChar(this.gameId);
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      //Esperamos a que se haya generado el temario para clasificar las fichas de personaje por grupo
      this.loadGroups();
    });
  }
}
</script>

<style scoped>

</style>