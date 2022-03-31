<template>
    <div id="window-char" class="window shown">
        <h3>FICHAS</h3>
        <div id="info-char" class="char-box" v-if="loadedChars">
          <character-group-name v-for="group in charGroups" :key="'g-'+group.gname" :game="game" :group="group" @editChar="transmitEvent" />
        </div>
        <div class="window-footer">
            <button class="save">GUARDAR</button>
            <button class="cancel">CANCELAR</button>
        </div>
    </div>
</template>

<script>
import CharacterGroupName from '@/components/CharacterGroupName'

export default {
  name: 'CharactersWindow',
  props: ["game"],
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
    loadGroups() {
      var game = this.game;
      //var gGroup = [];
      Object.keys(game.characters).forEach(cid => {
        var char = game.characters[cid];
        //console.log(char.grupo);
        if (!char.grupo) char.grupo = "General"
        //console.log(char.grupo);
        if(!this.charGroups[char.grupo]) {
          //Si no existe ya el grupo lo inicializamos
          let tempGroup = {};
          tempGroup.characters = {};
          tempGroup.gName = char.grupo;
          this.charGroups[char.grupo] = tempGroup;
        }
        this.charGroups[char.grupo].characters[cid] = char;
      });
      //console.log(gGroup);
      //this.charGroups = gGroup;
      //console.log(this.charGroups);
      this.loadedChars = true;
    },
    transmitEvent(event,char) {
      this.$emit('editChar',event,char);
    }
  },
  created() {
    console.log("created")
  },
  mounted() {
    this.$nextTick(() => {
      //Esperamos a que se haya generado el temario para clasificar las fichas de personaje por grupo
      this.loadGroups();
    });
    console.log("mounted")
  }
}
</script>

<style scoped>

</style>