<template>
  <div :id="battle.nombre.toUpperCase()" class="battle-card" @click="editBattleEvent">
    <div class="battle-header">
      <p class="battle-name">{{battle.nombre.slice(0,20)}}</p>
    </div>
    <div class="battle-body">
      <p class="battle-desc">{{battle.descripcion.slice(0,20)}}</p>
      <p class="battle-map">{{'MAPA: '+(battle.mapa==''?'LIBRE':battle.mapa)}}</p>
      <p class="battle-map-size">{{'TAMAÑO: '+(battle.ancho?battle.ancho:'0')+' X '+(battle.alto?battle.alto:'0')}}</p>
    </div>
    <div class="battle-footer">
      <p class="battle-date">{{battle.fecha/*.slice(5,11)*/}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BattleCard',
  props: ["game", "battle", "battleId", "info"],
  data () {
    return {}
  },
  methods: {
    editCharEvent() {
      var holder = {
        battle: this.battle,
        id: this.battleId
      }
      this.$emit('editBattle',holder);
    }
  }
}
</script>

<style scoped>

</style>