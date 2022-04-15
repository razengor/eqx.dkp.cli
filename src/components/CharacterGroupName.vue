<template>
  <section>
    <span :data-filter="group.gName.toLowerCase()" @click="checkGroup(group.gName.toLowerCase())">
      {{group.gName}}
      <img v-if="hiddenGroups[group.gName.toLowerCase()]" src="../assets/img/ico_arrow-up.png">
      <img v-if="!hiddenGroups[group.gName.toLowerCase()]" src="../assets/img/ico_arrow-down.png">
    </span>
    <div :id="'grupo-'+group.gName.toLowerCase()" class="char-group" v-show="!hiddenGroups[group.gName.toLowerCase()]">
      <character-card v-for="(char, index) in group.characters" :key="index" :game="game" :charId="index" :char="char" @editChar="transmitEvent" />
    </div>
  </section>
</template>

<script>
import CharacterCard from '@/components/CharacterCard'

export default {
  name: 'CharacterGroupName',
  props: ["game","group","charId"],
  components: {
    "character-card": CharacterCard
  },
  data () {
    return {
      hiddenGroups: []
    }
  },
  methods: {
    transmitEvent(holder) {
      this.$emit('editChar',holder);
    },
    checkGroup(gName) {
      this.hiddenGroups[gName] = this.hiddenGroups[gName]?false:true;
    }
  }
}
</script>

<style scoped>

</style>