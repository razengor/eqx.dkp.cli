<template>
  <div class="partida">
    <router-link :to="`/g/${game.id}`">
      {{ game.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PartidaComponent',
  props: ["game"],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>