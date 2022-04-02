<template>
    <div id="game-card-sheet" class="">
      <div id="gcs-capa">
        <div id="game-card-sheet-config" class="edit-screen">
          <div class="gcs-nombre-raza">
            <div class="profile-pic">
              <img :src="'../assets/img/profiles/profile_'+char.nombre.toLowerCase()+'.jpg'" />
            </div>
            <!-- TODO: Eliminar todas las etiquetas "nombre" y cambiarlo por sólo el input -->
            <h2>NOMBRE</h2>
            <input class="nombre" type="text" name="nombre" v-model="charToEdit.nombre">

            <h2>RAZA</h2>
            <input class="raza" type="text" name="raza" v-model="charToEdit.raza">

            <button id="gcs-editar-raza" class="edit-button round-button" title="EDITAR RAZA"><img src="../assets/img/ico_edit.png" /></button>
          </div>

          <div class="gcs-sub-info">
            <!-- TODO: Eliminar todas las etiquetas "nombre" y cambiarlo por sólo el input -->
            <h3>EDAD</h3>
            <input class="edad" type="text" name="edad" v-model="charToEdit.edad">
            <h3>ALTURA</h3>
            <input class="altura" type="text" name="altura" v-model="charToEdit.altura">
            <h3>PESO</h3>
            <input class="peso" type="text" name="peso" v-model="charToEdit.peso">
            <h3>ELEMENTO</h3>
            <input class="elemento" type="text" name="elemento" v-model="charToEdit.elemento">
            <h3>GRUPO</h3>
            <input class="grupo" type="text" name="grupo" v-model="charToEdit.grupo">
          </div>

          <div class="gcs-clase-nivel">
            <p>
              {{charToEdit.clase + ' NIVEL ' + charToEdit.nivel}}
              <button id="gcs-editar-clase" class="edit-button round-button" title="EDITAR CLASE"><img src="../assets/img/ico_edit.png" /></button>
            </p>
          </div>
          <div class="gcs-magias-conjuros">
            <p>
              {{"MAGIAS & CONJUROS"}}
              <button id="gcs-editar-clase" class="edit-button round-button" title="EDITAR MAGIAS"><img src="../assets/img/ico_edit.png" /></button>
            </p>
          </div>

          <div class="gcs-stats">
            <div v-for="(value,stat) in charToEdit.stats" :key="charToEdit.nombre+'_'+stat" :class="'stat '+stat">
              <img :src="'../assets/img/ico_'+stat+'.png'" :title="stat" :alt="stat">
              <p>{{value}}</p>
            </div>
            <button id="gcs-editar-ficha" class="edit-button round-button" title="EDITAR FICHA"><img src="../assets/img/ico_edit.png" /></button>
          </div>

          <div class="gcs-tipos-unidad">
            <p>TIPOS DE UNIDAD</p>

            <img class="type" v-for="unitType in charToEdit.unitTypes"
              :key="charToEdit.nombre+'_'+unitType"
              :src="'../assets/img/ico_'+unitType.toLowerCase()+'.png'"
              :title="unitType.toUpperCase()" :alt="unitType.toUpperCase()" />

            <button id="gcs-editar-tipos" class="edit-button round-button" title="EDITAR TIPOS"><img src="../assets/img/ico_edit.png" /></button>
          </div>

          <div class="gcs-roles-unidad">
            <p>ROLES</p>

            <img class="role" v-for="unitRole in charToEdit.unitRoles"
              :key="charToEdit.nombre+'_'+unitRole"
              :src="'../assets/img/ico_'+unitRole.toLowerCase()+'.png'"
              :title="unitRole.toUpperCase()" :alt="unitRole.toUpperCase()" />

            <button id="gcs-editar-roles" class="edit-button round-button" title="EDITAR ROLES"><img src="../assets/img/ico_edit.png" /></button>
          </div>

          <div class="gcs-especializaciones">
            <p>
              <b>ESPECIALIZACIONES</b>
            </p>
            <p>
              <b>PRIMARIA:</b>
              Sin especificar.
            </p>
            <p>
              <b>SECUNDARIA 1:</b>
              Sin especificar.
            </p>
            <p>
              <b>SECUNDARIA 2:</b>
              Sin especificar.
            </p>
          </div>

          <div class="gcs-dinero">
            <div class="money">
              <div class="coin gold"><input v-model="capitalToEdit.oro" type="text" name="oro"></div>
              <div class="coin silver"><input v-model="capitalToEdit.plata" type="text" name="plata"></div>
              <div class="coin copper"><input v-model="capitalToEdit.cobre" type="text" name="cobre"></div>
            </div>
            
            <button id="gcs-editar-inventario" class="edit-button round-button" title="EDITAR INVENTARIO"><img src="../assets/img/ico_edit.png" /></button>
          </div>

          <button id="gcs-save" class="save round-button" @click="saveChar()" >
            <img src="../assets/img/ico_save.png" />
          </button>

          <button id="gcs-close" class="close round-button" @click="this.$emit('closeChar')" >
            <img src="../assets/img/ico_cancel.png" />
          </button>

          <button id="gcs-delete" class="delete round-button" @click="this.$emit('deleteChar')" >
            <img src="../assets/img/ico_delete.png" />
          </button>
        </div>
      </div>
    </div>
</template>

<script>
//import CharacterGroupName from '@/components/CharacterGroupName'

export default {
  name: 'CharacterEditWindow',
  props: ["char","game","charToEditId"],
  components: {},
  data () {
    return {
      charToEdit: {},
      capitalToEdit: {}
    }
  },
  methods: {
    saveChar() {
      var temporal = {charToEdit:this.charToEdit, id:this.charToEditId};
      temporal.charToEdit.capital = this.capitalToEdit;
      this.$emit('saveChar', temporal);
    }
  },
  created() {},
  mounted() {
    this.capitalToEdit = this.char.capital;
    this.charToEdit = this.char;
  }
}
</script>

<style scoped>

</style>