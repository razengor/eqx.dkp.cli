<template>
  <div id="login">
    <img id="background-dice" src="../assets/logo.png">
      <main class="main">
          <header>
              <h1>Equinox</h1>
              <h2>Welcome</h2>
          </header>
          <form method="POST" action="auth">
              <input type="text" name="username" placeholder="E-mail..." required/>
              <input type="password" name="password" placeholder="Password..." required/>
              <input type="submit" name="submit" value="Log in" />
          </form>
          <footer>
              <span>Equinox © All rights reserved</span>
          </footer>
      </main>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'LoginView',
  components: {
  },
  data: function() {
    return {

    };
  },
  methods: {
    ...mapActions(['getGames'])
  },
  computed: {
    ...mapState(['games']),
    ...mapState(['users'])
  },
  mounted() {
    this.getGames()
    //console.log("mounted")
  },
  created() {
    //console.log("created")
  }
}
</script>

<style scoped>
</style>
