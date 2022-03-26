<template>
  <div id="home">
    <Header/>
    <div id="home-body">
      <section id="game-box">
        Game Id {{ gameid }}
      </section>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/HeaderComponent'
import Footer from '@/components/FooterComponent'

export default {
  name: 'HomeView',
  components: {
    "Header": Header,
    "Footer": Footer
  },
  data: function() {
    return {
      gameid: null
    };
  },
  computed: {
    gameData() {
      return this.$route.params.gameid;
    }
  },
  mounted() {
    this.gameid = this.$route.params.gameid
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home-body {
  padding-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
