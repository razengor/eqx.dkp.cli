<template>
  <div id="login">
    <img id="background-dice" src="../assets/logo.png">
      <main class="main">
          <header>
              <h1>Equinox</h1>
              <h2>Welcome</h2>
          </header>
          <form method="POST" action="auth" @submit.prevent="signIn">
              <input type="text" name="username" placeholder="E-mail..." required v-model="email"/>
              <input type="password" name="password" placeholder="Password..." required v-model="password"/>
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
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(['iniciarSesion']),
    async signIn() {
      await this.iniciarSesion({email:this.email, password:this.password});
    }
  },
  computed: {
    ...mapState(['user','error'])
  }
}
</script>

<style scoped>
</style>
