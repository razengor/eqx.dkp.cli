<template>
    <div id="window-conf" class="window shown">
        <h3>CONFIGURACIÓN</h3>
        <div class="info-basic window-box">
          <div>
            <p>Nombre de la Partida</p>
            <input type="text" v-model="editingGame.name">
            <p>Versión</p>
            <input type="text" v-model="editingGame.version">
          </div>
          <div>
            <p>Fecha de inicio</p>
            <input type="text" v-model="editingGame.date">
            <p>Fecha de la última sesión</p>
            <input type="text" v-model="editingGame.lastDate">
          </div>
        </div>
        <div class="window-footer">
            <button class="save" @click="saveConf">GUARDAR</button>
            <button class="remove" @click="$emit('removeGame')">ELIMINAR PARTIDA</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ConfigWindow',
  props: ["game"],
  data () {
    return {
      editingGame: {}
    }
  },
  methods: {
    saveConf() {
      this.$emit('saveConf',this.editingGame)
    }
  },
  mounted() {
    this.editingGame = this.game;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
