<template>
    <div id="window-char" class="window shown">
        <h3>FICHAS</h3>
        <div id="info-char" class="char-box" v-if="loadedChars">
          <character-group v-for="group in charGroups" :key="group.gname" :game="game" :group="group" />
        </div>
        <div class="window-footer">
            <button class="save">GUARDAR</button>
            <button class="cancel">CANCELAR</button>
        </div>
    </div>
</template>

<script>
import CharacterGroup from '@/components/CharacterGroup'

export default {
  name: 'CharactersWindow',
  props: ["game"],
  components: {
    "character-group": CharacterGroup
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
          tempGroup.characters = [];
          tempGroup.gName = char.grupo;
          this.charGroups[char.grupo] = tempGroup;
        }
        this.charGroups[char.grupo].characters[cid] = char;
      });
      //console.log(gGroup);
      //this.charGroups = gGroup;
      console.log(this.charGroups);
      this.loadedChars = true;
    }
  },
  created() {
    console.log("created")
  },
  mounted() {
    this.$nextTick(() => {
      //Esperamos que a se haya generado el temario para clasificar las fichas de personaje por grupo
      this.loadGroups();
    });
    console.log("mounted")
  }
}
</script>

<style scoped>

</style>
