<template>
  <section>
    <span :data-filter="group.gName.toLowerCase()">
      {{group.gName}}
      <img src="../assets/img/ico_arrow-down.png">
    </span>
    <div :id="'grupo-'+group.gName.toLowerCase()" class="char-group">
      <character-card v-for="(char, index) in group.characters" :key="index" :game="game" :char="char" @editChar="transmitEvent" />
    </div>
  </section>
</template>

<script>
import CharacterCard from '@/components/CharacterCard'

export default {
  name: 'CharacterGroupName',
  props: ["game","group"],
  components: {
    "character-card": CharacterCard
  },
  data () {
    return {}
  },
  methods: {
    transmitEvent(event,char) {
      this.$emit('editChar',event,char);
    }
  }
}
</script>

<style scoped>

</style>