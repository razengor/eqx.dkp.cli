<template>
  <div :id="char.nombre.toUpperCase()" class="char-card" :filter-ini="char.iniciativa" :data-grupo="char.grupo" @click="editCharEvent">
    <div class="card-shape">
      <div class="card-header">
        <img class="profile" :src="'../assets/img/profiles/profile_'+char.nombre.toLowerCase()+'.jpg'"/>

        <div class="type-list" v-if="char.unitTypes!=null">
          <img class="type" v-for="unitType in char.unitTypes"
           :key="char.nombre+'-'+unitType"
           :src="'../assets/img/ico_'+unitType.toLowerCase()+'.png'" />
        </div>
      </div>

      <div class="card-body">
        <div class="stat-list">
          <div v-for="(value, name) in char.stats" :key="char.nombre+'-'+name" :class="'stat '+name">
            <img :src="'../assets/img/ico_'+name+'.png'" :title="name" :alt="name">
            <p>{{value}}</p>
          </div>
        </div>
        <div class="info">
          <p v-show="char.clase.toLowerCase()!='default'" class="clase">{{char.clase}}</p>
          <p v-show="char.clase.toLowerCase()!='default'" class="nivel">{{char.nivel}}</p>
          <p class="nombre">{{char.nombre}}</p>

          <div class="role-list" v-if="char.unitRoles!=null">
            <img class="role" v-for="unitRole in char.unitRoles"
            :key="char.nombre+'-'+unitRole"
            :src="'../assets/img/ico_'+unitRole.toLowerCase()+'.png'" />
          </div>
        </div>
      </div>

      <div class="card-footer">
        <p class="movilidad">{{char.movilidad}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: ["game", "char", "charId"],
  data () {
    return {}
  },
  methods: {
    editCharEvent() {
      var holder = {
        char: this.char,
        id: this.charId
      }
      this.$emit('editChar',holder);
    }
  }
}
</script>

<style scoped>

</style>