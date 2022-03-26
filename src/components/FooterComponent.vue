<template>
  <div id="main-footer">
    <img src="../assets/logo.png">
    <span>Equinox Inc.</span>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    height: 30px;
    width: 30px;
    margin: 10px;
  }
  #main-footer {
    position: absolute;
    bottom: 0px;
    width: 100vw;

    display: flex;
    align-items: center;
    justify-content: left;

    font-size: 1.1em;
  }
</style>
