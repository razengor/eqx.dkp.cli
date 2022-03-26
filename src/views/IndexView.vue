<template>
  <div id="index">
    <Header/>
    <div id="index-body">
      <section id="games">
        <partida v-for="partida in games" :key="partida.id" :id="partida.id" :nombre="partida.nombre" />
      </section>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/HeaderComponent'
import Footer from '@/components/FooterComponent'
import Partida from '@/components/Partida'

export default {
  name: 'IndexView',
  components: {
    "Header": Header,
    "Footer": Footer,
    "partida": Partida
  },
  data: function() {
    return {
      
    };
  }, 
  computed: {
    games() {
      return this.$store.state.games
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#index {
  height: 100%;
  width: 100%;
}
#index-body {
  padding-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#games {
  width: 45%;
  max-width: 800px;
  background-color: rgb(88, 88, 88);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 15px 0;
}
.partida {
  width: 80%;
  background-color: rgb(53, 53, 53);
  border-radius: 5px;

  color: rgb(228, 228, 228);
  padding: 15px;
  margin: 10px 0;

  font-size: 1.5em;
  font-weight: bold;

  cursor: pointer;
}
</style>
