<template>
    <div id="window-comb" class="window shown">
        <h3>COMBATES</h3>
        <div class="info-comb window-box">
          <battle-card v-for="(battle, battleId) in game.batallas" :key="'bId-'+battleId" :info="info"
           :game="game" :battle="battle" :battleId="battleId" @click="editBattle(battle,battleId)"/>
        </div>
        <div id="battle-edit-window" v-if="editingBattle">
          <div class="container-box">
            <div class="container">
              <input class="nombre" placeholder="Nombre de la batalla ..." v-model="battleToEdit.nombre">
              <textarea placeholder="Descripción de la batalla ..." v-model="battleToEdit.descripcion" />
              <input type="date" placeholder="Fecha 00/00/2000" v-model="battleToEdit.fecha">
              <p>MAPA:</p>
              <select v-model="battleToEditMapa">
                <option value="">LIBRE</option>
                <option v-for="(mapa, mapaId) in info.mapas" :key="'map-'+mapaId" :value="mapaId">{{mapa.nombre}}</option>
              </select>
              <p>TAMAÑO EN CASILLAS [ancho X alto]</p>
              <input disabled="" v-model="battleToEdit.ancho" v-if="battleToEdit.mapa!=''">
              <input disabled="" v-model="battleToEdit.alto" v-if="battleToEdit.mapa!=''">
              <input placeholder="ancho" v-model="battleToEdit.ancho" v-if="battleToEdit.mapa==''">
              <input placeholder="alto" v-model="battleToEdit.alto" v-if="battleToEdit.mapa==''">
              <button class="add" @click="addNewBattle">{{battleToEditId==null?'CREAR COMBATE':'GUARDAR'}}</button>
              <button class="add" v-if="battleToEditId" @click="goBattle">IR AL COMBATE</button>
              <button class="delete" v-if="battleToEditId" @click="deleteBattle">ELIMINAR</button>
              <button class="cancel" @click="closeNewBattle">CANCELAR</button>
            </div>
          </div>
        </div>
        <div class="window-footer">
          <button class="add" @click="addNewBattle">NUEVO COMBATE</button>
        </div>
    </div>
</template>

<script>
import BattleCard from '@/components/BattleCard'

import app from '../firebase'
import { getDatabase, ref, set, push, child } from "firebase/database";
import router from '../router/index'

import {mapActions, mapState} from 'vuex'

const db = getDatabase(app);

export default {
  name: 'CombatsWindow',
  components: {
    "battle-card": BattleCard
  },
  props: ["game"],
  data () {
    return {
      editingBattle: false,
      battleToEdit: {
        nombre: "",
        descripcion: "",
        fecha: "00/00/2000",
        mapa: "",
        ancho: 12,
        alto: 12
      },
      battleToEditId: null,
      battleToEditMapa: ""
    }
  },
  methods: {
    ...mapActions(['getGames']),
    editBattle(battle, battleId) {
      this.editingBattle = true;
      this.battleToEditId = battleId;
      this.battleToEdit = JSON.parse(JSON.stringify(battle));
      if(this.battleToEdit.ancho < 2) this.battleToEdit.ancho=2
      if(this.battleToEdit.alto < 2) this.battleToEdit.alto=2
    },
    addNewBattle() {
      //si no estamos editando una batalla, abrimos la ventana de edición con una nueva
      if(!this.editingBattle) {
        this.editingBattle = true;
        this.battleToEdit = {
          nombre: "",
          descripcion: "",
          fecha: "2022-01-01",
          mapa: "",
          ancho: 12,
          alto: 12
        }
        this.battleToEditMapa = "";
        this.battleToEditId = null;
      //si estábamos editando una batalla la mandamos a firebase
      } else if(this.battleToEditId==null) {
        //generamos la matriz de casillas
        this.battleToEdit.cellMatrix = [];
        for(let x=1;x<=this.battleToEdit.ancho;x++) {
          var tempRow = [];
          for(let y=1;y<=this.battleToEdit.alto;y++) {
            tempRow[y] = {
              selected: false,
              units: [],
              obstacle: null
            };
          }
          this.battleToEdit.cellMatrix[x] = tempRow;
        }
        //creamos batalla
        const newBattleKey = push(child(ref(db), 'games/'+this.game.id+'/batallas')).key;
        set(ref(db, 'games/'+this.game.id+"/batallas/"+newBattleKey), this.battleToEdit);
        this.editingBattle = false;
        router.push('/g/'+this.game.id+'/b/'+newBattleKey);
      } else {
        //guardamos batalla
        set(ref(db, 'games/'+this.game.id+"/batallas/"+this.battleToEditId), this.battleToEdit);
        this.editingBattle = false;
        window.alert("El combate ha sido guardado.");
        this.getGames();
      }
    },
    closeNewBattle() {
      this.editingBattle = false;
    },
    deleteBattle() {
      if(confirm("¿Está seguro de que desea eliminar el combate "+this.battleToEdit.nombre+"?")) {
        set(ref(db, 'games/'+this.game.id+"/batallas/"+this.battleToEditId), {});
        this.editingBattle = false;
        this.getGames();
      }
    },
    goBattle() {
      router.push('/g/'+this.game.id+'/b/'+this.battleToEditId);
    }
  },
  computed: {
    ...mapState(['info'])
  },
  watch: {
    battleToEditMapa() {
      this.battleToEdit.mapa = this.battleToEditMapa;
      //cambiamos los tamaños del mapa de combate
      if(this.battleToEditMapa == '') {
        if(this.battleToEdit.ancho == 0 || this.battleToEdit.alto == 0) {
          this.battleToEdit.ancho = 12;
          this.battleToEdit.alto = 12;
        }
      } else {
        this.battleToEdit.ancho = this.info.mapas[this.battleToEditMapa].ancho;
        this.battleToEdit.alto = this.info.mapas[this.battleToEditMapa].alto;
      }
    }
  }
}
</script>

<style scoped>

</style>
