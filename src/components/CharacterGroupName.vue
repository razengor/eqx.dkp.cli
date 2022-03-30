<template>
  <section>
    <span :data-filter="group.gName.toLowerCase()">
      {{group.gName}}
      <img src="../assets/img/ico_arrow-down.png">
    </span>
    <div :id="'grupo-'+group.gName.toLowerCase()" class="char-group">
      <character-card v-for="(char, index) in group.characters" :key="index" :game="game" :char="char" />
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
  mounted() {
    console.log("grupo "+this.group.gName);
    console.log(this.group);
    //console.log(this.group.characters);
    //this.characterGroup = this.group.characters;
  }
}
</script>

<style scoped>

</style>