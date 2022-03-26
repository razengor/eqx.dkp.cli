<template>
    <div id="main-header">
        <div>
            <img id="main-logo" src="../assets/logo.png">
            <h1>EQUINOX</h1>
        </div>
    <h2>gestor de partidas</h2>
    </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main-header {
    position: fixed;
    width: 100%;
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
