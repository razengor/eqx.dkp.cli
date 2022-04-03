<template>
    <div id="game-card-sheet" class="">
      <div id="gcs-capa">
        <div id="game-card-sheet-config" class="edit-screen">
          <div class="gcs-nombre-raza">
            <div class="profile-pic">
              <img :src="'../assets/img/profiles/profile_'+char.nombre.toLowerCase()+'.jpg'" />
            </div>
            <input class="nombre" type="text" name="nombre" v-model="charToEdit.nombre">

            <button id="gcs-editar-raza" class="raza edit-button-box" title="EDITAR RAZA" @click="openEditarRaza">
              {{charToEdit.raza}}
            </button>
          </div>

          <div class="gcs-sub-info">
            <div>
              <h3 class="edad">EDAD</h3>
              <h3 class="altura">ALTURA</h3>
              <h3 class="peso">PESO</h3>
              <h3 class="elemento">ELEMENTO</h3>
              <h3 class="grupo">GRUPO</h3>
            </div>
            <div>
              <input class="edad" type="text" name="edad" v-model="charToEdit.edad">
              <input type="text" name="altura" v-model="charToEdit.altura">
              <input class="peso" type="text" name="peso" v-model="charToEdit.peso">
              <input class="elemento" type="text" name="elemento" v-model="charToEdit.elemento">
              <input class="grupo" type="text" name="grupo" v-model="charToEdit.grupo">
            </div>
          </div>

          <button id="gcs-editar-clase" class="gcs-clase-nivel edit-button-box" title="EDITAR CLASE">
              {{charToEdit.clase + ' NIVEL ' + charToEdit.nivel}}
          </button>
          <button id="gcs-editar-magias" class="gcs-magias-conjuros edit-button-box" title="EDITAR MAGIAS">
              {{"MAGIAS & CONJUROS"}}
          </button>

          <div class="gcs-stats">
            <button id="gcs-editar-ficha" class="edit-button-box" title="EDITAR FICHA">
              <p>ESTADÍSTICAS Y FICHA</p>
              <div v-for="(value,stat) in charToEdit.stats" :key="charToEdit.nombre+'_'+stat" :class="'stat '+stat">
                <img :src="'../assets/img/ico_'+stat+'.png'" :title="stat" :alt="stat">
                <p>{{value}}</p>
              </div>
            </button>
          </div>

          <div class="gcs-tipos-unidad">
            <p>TIPOS DE UNIDAD</p>

            <img class="type" v-for="unitType in charToEdit.unitTypes"
              :key="charToEdit.nombre+'_'+unitType"
              :src="'../assets/img/ico_'+unitType.toLowerCase()+'.png'"
              :title="unitType.toUpperCase()" :alt="unitType.toUpperCase()" />
            <img v-if="charToEdit.unitTypes=={}"
              :src="'../assets/img/ico_.png'"
              title="X" alt="X" />

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
              ESPECIALIZACIONES
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
    },
    openEditarRaza() {
      console.log("Abrimos ventana de edición de Raza...");
    }
  },
  created() {},
  mounted() {
    if(this.char.capital==null) {
      this.capitalToEdit = {oro:0,plata:0,cobre:0};
    } else {
      this.capitalToEdit = this.char.capital;
    }
    this.charToEdit = this.char;
  }
}
</script>

<style scoped>

</style>