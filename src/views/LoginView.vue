<template>
  <div id="login">
    <img id="background-dice" src="../assets/logo.png">
      <main class="main">
          <header>
              <h1>Equinox</h1>
              <h2>Welcome</h2>
          </header>
          <form method="POST" action="auth" @submit.prevent="signIn" v-show="!loading">
              <input type="email" name="email" placeholder="E-mail..." required v-model="email"/>
              <input type="password" name="password" placeholder="Password..." required v-model="password"/>
              <input type="submit" name="submit" value="Log in" @click="loading = true" />
          </form>
          <div class="loading-screen" v-show="loading">
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
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
      password: "",
      loading: false
    };
  },
  methods: {
    ...mapActions(['iniciarSesion']),
    signIn() {
      this.loading = true;
      setTimeout(this.loadFalse,500)
    },
    loadFalse() {
      //this.loading = false;
      this.iniciarSesion({email:this.email, password:this.password});
    }
  },
  computed: {
    ...mapState(['user','error'])
  },
  watch: {
    error() {
      console.error(this.error);
      this.loading = false;
      window.alert("Ha ocurrido un error iniciando sesión, compruebe el email y contraseña o pruebe de nuevo más tarde.");
    }
  }
}
</script>

<style scoped>
</style>
