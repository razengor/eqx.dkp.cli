<template>
  <div class="info-header">
    <h1>{{ gameName }}</h1>
    <h3>{{ gameVersion }}</h3>
    <div class="header-tabs selectable-group">
      <div id="tab-conf" class="tab selectable selected" @click="this.$emit('changeTab',$event,'conf');changeTabClass('conf')">
        <img src="../assets/img/ico_configuration.png">
      </div>
      <div id="tab-play" class="tab selectable" @click="this.$emit('changeTab',$event,'play');changeTabClass('play')">
        <img src="../assets/img/ico_players.png">
      </div>
      <div id="tab-char" class="tab selectable" @click="$emit('changeTab',$event,'char');changeTabClass('char')">
        <img src="../assets/img/ico_characters.png">
      </div>
      <div id="tab-comb" class="tab selectable" @click="$emit('changeTab',$event,'comb');changeTabClass('comb')">
        <img src="../assets/img/ico_combats.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeaderComponent',
  props: ["gameName","gameVersion"],
  data () {
    return {}
  },
  methods: {
    removeSelected() {
      if ( document.getElementById("tab-conf").classList.contains('selected') )
        document.getElementById("tab-conf").classList.remove('selected');
      if ( document.getElementById("tab-play").classList.contains('selected') )
        document.getElementById("tab-play").classList.remove('selected');
      if ( document.getElementById("tab-char").classList.contains('selected') )
        document.getElementById("tab-char").classList.remove('selected');
      if ( document.getElementById("tab-comb").classList.contains('selected') )
        document.getElementById("tab-comb").classList.remove('selected');
    },
    changeTabClass(tab) {
      this.removeSelected();
      document.getElementById("tab-"+tab).classList.add('selected');
    }
  }
}
</script>

<style scoped>

</style>