<template>
    <header>
        <h1>EQUINOX</h1>
        <a @click="closeSession">Sesión iniciada como {{user.email}}</a>
    </header>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'HeaderComponent',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['iniciarSesion','getUserSesion']),
    closeSession() {
        this.iniciarSesion(null);
    }
  },
  computed: {
    ...mapState(['user','error'])
  },
  mounted() {
      this.getUserSesion();
  }
}
</script>

<style scoped>
#main-header {
    text-align: center;
    position: fixed;
    width: 100%;
    background-color: rgb(109, 109, 109);
}
#main-header div {
    display: flex;
    align-items: center;
    justify-content: center;
}
h1 {
    font-size: 3.5em;
    margin: 0;
}
h2 {
    font-size: 2em;
    margin: 5px 0 0 0;
}
img {
    height: 50px;
    width: 50px;
    margin: 10px;
}
</style>
