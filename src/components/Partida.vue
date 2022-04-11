<template>
  <div class="partida">
    <router-link :to="`/g/${game.id}`">
      {{ game.name }}
      <span>{{game.user.username}}</span>
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

<style scoped>
</style>