<template>
  <div class="partida">
    <router-link :to="`g/${id}`">
      {{ nombre }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PartidaComponent',
  props: ["id","nombre"],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
