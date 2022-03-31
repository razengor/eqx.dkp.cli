<template>
    <div id="game-card-sheet" class="">
      <div id="gcs-capa">
        <div id="game-card-sheet-config" class="edit-screen">
          <div class="gcs-nombre-raza">
            <div class="profile-pic">
              <img :src="'../assets/img/profiles/profile_'+char.nombre.toLowerCase()+'.jpg'" />
            </div>
          </div>
          <button id="gcs-close" class="close round-button" @click="this.$emit('closeChar')" >
            <img src="../assets/img/ico_cancel.png" />
          </button>
        </div>
      </div>
    </div>
</template>

<script>
//import CharacterGroupName from '@/components/CharacterGroupName'

export default {
  name: 'CharacterEditWindow',
  props: ["char","game"],
  components: {},
  data () {
    return {}
  },
  methods: {},
  created() {},
  mounted() {}
}
</script>

<style scoped>

</style>