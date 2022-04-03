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

          <button id="gcs-editar-clase" class="gcs-clase-nivel edit-button-box" title="EDITAR CLASE" @click="openEditarClase">
              {{charToEdit.clase + ' NIVEL ' + charToEdit.nivel}}
          </button>
          <button id="gcs-editar-magias" class="gcs-magias-conjuros edit-button-box" title="EDITAR MAGIAS" @click="openEditarMagias">
              {{"MAGIAS & CONJUROS"}}
          </button>

          <div class="gcs-stats">
            <button id="gcs-editar-ficha" class="edit-button-box" title="EDITAR FICHA" @click="openEditarFicha">
              <p>ESTADÍSTICAS Y FICHA</p>
              <div v-for="(value,stat) in charToEdit.stats" :key="charToEdit.nombre+'_'+stat" :class="'stat '+stat">
                <img :src="'../assets/img/ico_'+stat+'.png'" :title="stat" :alt="stat" />
                <p>{{value}}</p>
              </div>
            </button>
          </div>

          <button id="gcs-editar-tipos" class="gcs-tipos-unidad edit-button-box" title="EDITAR TIPOS">
            <p>TIPOS DE UNIDAD</p>

            <img class="type" v-for="unitType in charToEdit.unitTypes"
              :key="charToEdit.nombre+'_'+unitType"
              :src="'../assets/img/ico_'+unitType.toLowerCase()+'.png'"
              :title="unitType.toUpperCase()" :alt="unitType.toUpperCase()" />
            <img v-if="charToEdit.unitTypes==null"
              class="type"
              :src="'../assets/img/ico_.png'"
              title="X" alt="X" />
          </button>

          <button id="gcs-editar-roles" class="gcs-roles-unidad edit-button-box" title="EDITAR ROLES">
            <p>ROLES</p>

            <img class="role" v-for="unitRole in charToEdit.unitRoles"
              :key="charToEdit.nombre+'_'+unitRole"
              :src="'../assets/img/ico_'+unitRole.toLowerCase()+'.png'"
              :title="unitRole.toUpperCase()" :alt="unitRole.toUpperCase()" />
            <img v-if="charToEdit.unitRoles==null"
              class="role"
              :src="'../assets/img/ico_.png'"
              title="X" alt="X" />
          </button>

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
            
            <button id="gcs-editar-inventario" class="edit-button-box" title="EDITAR INVENTARIO">
              INVENTARIO
            </button>
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

        <div id="game-card-sheet-edit">
          <!-- EDICIÓN DE FICHA -->
          <div id="game-card-sheet-ficha" class="container" v-if="editWindow=='ficha'">
            <h4>STATS</h4>
            <div class="stats" v-if="charToEdit.stats!=null">
              <div class="vida">
                <p>VIDA</p>
                <input name="vida" v-model="charToEdit.stats.vida">
              </div>
              <div class="mana">
                <p>MANA</p>
                <input name="mana" v-model="charToEdit.stats.mana">
              </div>
              <div class="energia">
                <p>ENERGÍA</p>
                <input name="energia" v-model="charToEdit.stats.energia">
              </div>
            </div>
            <div class="stats">
              <div class="movilidad">
                <p>MOVILIDAD</p>
                <input name="movilidad" v-model="charToEdit.movilidad">
              </div>
              <div class="iniciativa">
                <p>INICIATIVA</p>
                <input name="iniciativa" v-model="charToEdit.iniciativa">
              </div>
              <div class="vision">
                <p>VISIÓN</p>
                <input name="vision" v-model="charToEdit.vision">
              </div>
            </div>
            <h4>ATRIBUTOS</h4>
            <div class="attr">
              <div>
                <p>AGILIDAD</p>
                <input type="text" v-model="charToEdit.atributos.agilidad">
              </div>
              <div>
                <p>FUERZA</p>
                <input type="text" v-model="charToEdit.atributos.fuerza">
              </div>
              <div>
                <p>RESISTENCIA</p>
                <input type="text" v-model="charToEdit.atributos.resistencia">
              </div>
              <div>
                <p>INTELIGENCIA</p>
                <input type="text" v-model="charToEdit.atributos.inteligencia">
              </div>
              <div>
                <p>MANIPULACIÓN</p>
                <input type="text" v-model="charToEdit.atributos.manipulacion">
              </div>
              <div>
                <p>VELO</p>
                <input type="text" v-model="charToEdit.atributos.velo">
              </div>
              <div>
                <p>ASTUCIA</p>
                <input type="text" v-model="charToEdit.atributos.astucia">
              </div>
              <div>
                <p>DESTREZA</p>
                <input type="text" v-model="charToEdit.atributos.destreza">
              </div>
              <div>
                <p>SENSITIVIDAD</p>
                <input type="text" v-model="charToEdit.atributos.sensitividad">
              </div>
            </div>
            <h4>HABILIDADES</h4>
            <div class="abil">
              <div v-for="(column, name) in charToEdit.habilidades" :key="name" :class="name">
                <div v-for="(value, ability) in column" :key="ability">
                  <p>{{ability.toUpperCase()}}</p>
                  <input v-model="charToEdit.habilidades[name][ability]">
                </div>
              </div>
            </div>
          </div>
          
          <!-- EDICIÓN DE RAZA -->
          <div id="game-card-sheet-raza" class="edit-screen" v-if="editWindow=='raza'">
            <div class="gcsc-raza-capacidades-descripcion-pasivas">
              <div class="gcsr-raza-capacidades">
                <div class="gcsr-raza">
                  <h2>RAZA</h2>
                  <select class="raza" name="raza" v-model="charToEdit.raza">
                    <option value="DEFAULT">DEFAULT</option>

                    <option v-for="(raza, razaName) in info.razas" :key="'op-'+razaName"
                     :value="razaName.toUpperCase()">
                      {{razaName.toUpperCase()}}
                    </option>
                  </select>
                </div>
                <div class="gcsr-capacidades">
                  <h2>CAPACIDADES RACIALES</h2>
                  <div class="content">
                    <div v-for="(raza, razaName) in info.razas" :key="'gr-'+razaName" v-show="razaName.toLowerCase()==charToEdit.raza.toLowerCase()">
                      <div v-for="(cap, capName) in raza.capacidades" :key="'desc-'+capName" @click="checkCapacidad(capName)">
                        <input type="checkbox" :checked="getCapacidades()[capName.toLowerCase()]" >
                        <b><u>{{capName+':'}}</u></b>
                        <br>
                        {{cap}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="gcsr-descripcion-pasivas">
                <div class="gcsr-descripcion">
                  <h2>{{charToEdit.raza.toUpperCase()}}</h2>
                  <div class="content">
                    <p>{{info.razas[charToEdit.raza.toLowerCase()].desc}}</p>
                  </div>
                </div>

                <div class="gcsr-pasivas">
                  <h2>PASIVA RACIAL</h2>
                  <div class="content">
                    <p v-for="(desc,pasiva) in info.razas[charToEdit.raza.toLowerCase()].pasivas" :key="pasiva">
                      <b>{{pasiva.toUpperCase()+':'}}</b>
                      {{desc}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Botón de ir atrás -->
          <button class="go-back" v-if="editWindow!=''" @click="editWindow=''">
            ATRÁS
          </button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CharacterEditWindow',
  props: ["char","game","charToEditId","info"],
  components: {},
  data () {
    return {
      charToEdit: {},
      capitalToEdit: {},
      editWindow: ""
    }
  },
  methods: {
    saveChar() {
      var temporal = {charToEdit:this.charToEdit, id:this.charToEditId};
      temporal.charToEdit.capital = this.capitalToEdit;
      this.$emit('saveChar', temporal);
    },
    // TODO: Revisar si sólo hace falta una función para abrir ventanas de edición
    openEditarRaza() {
      console.log("Abrimos ventana de edición de Raza...");
      this.editWindow = "raza";
    },
    openEditarClase() {
      console.log("Abrimos ventana de edición de Clase...");
      this.editWindow = "clase";
    },
    openEditarMagias() {
      console.log("Abrimos ventana de edición de Magias...");
      this.editWindow = "magias";
    },
    openEditarFicha() {
      console.log("Abrimos ventana de edición de Ficha...");
      this.editWindow = "ficha";
    },
    getCapacidades() {
      var capacidades = {};
      if(this.charToEdit.capacidades)
      Object.keys(this.charToEdit.capacidades).forEach(obj => {
        let name = this.charToEdit.capacidades[obj];
        capacidades[name.toLowerCase()] = true;
      });
      return capacidades;
    },
    checkCapacidad(capName) {
      if(!this.charToEdit.capacidades) {
        this.charToEdit.capacidades = []
      }
      if(this.getCapacidades()[capName.toLowerCase()]) {
        var temporal = [];
        Object.keys(this.charToEdit.capacidades).forEach(obj => {
          let name = this.charToEdit.capacidades[obj].toLowerCase();
          if(name != capName.toLowerCase()) {
            temporal.push(name);
          }
        });
        this.charToEdit.capacidades = temporal;
      } else {
        this.charToEdit.capacidades.push(capName);
      }
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