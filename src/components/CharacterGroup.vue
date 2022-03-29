<template>
  <section>
    <span :data-filter="group.gName">
      {{group.gName}}
      <img src="../assets/img/ico_arrow-down.png">
    </span>
    <div :id="'grupo-'+group.gName" class="char-group">
      
    </div>
  </section>
</template>

<script>
//import {mapState} from 'vuex'

export default {
  name: 'CharacterGroup',
  props: ["game","group"],
  data () {
    return {
    }
  },
  computed: {
    //...mapState(['games'])
  },
  mounted() {
    //this.getGames()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>