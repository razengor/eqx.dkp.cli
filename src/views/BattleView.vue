<template>
  <div id="battle">
    <div v-if="battle" id="game-menu">
      <div class="game-menu__header">
        <div class="game-menu__trigger" @click="triggerMenu"></div>
        <p class="game-name">{{game.name}}</p>
      </div>
      <div class="game-menu__body">
        <!-- INFORMACIÓN DEL COMBATE -->
        <div class="game-menu__body-info">
          <p class="turno">{{'TURNO: '+turnoActual}}</p>
          <p class="fase">{{getFaseActualTexto()}}</p>
        </div>
        <!-- CAJÓN DE HERRAMIENTAS -->
        <div class="game-menu__body-tools">
          <div class="cell-size">
            <p>Zoom del Mapa:</p>
            <select v-model="cellSize">
              <option value="40">Pequeño</option>
              <option value="60">Medio</option>
              <option value="80">Grande</option>
            </select>
          </div>
          <div class="utility-menu-buttons">
            <button @click="changeMenu('unidades')">Unidades</button>
            <button @click="changeMenu('turno')">Turno</button>
            <button @click="changeMenu('mapa')">Mapa</button>
          </div>
        </div>
        <!-- MENÚ CAMBIANTE -->
        <div class="game-menu__body-utility">
          <div v-show="menu=='unidades'">
            <button @click="openAddUnitWindow">AÑADIR UNIDAD(ES)</button>
            <p>UNIDADES ACTUALES:</p>
            <p v-for="(unit,unitId) in battle.units" :key="'unit-'+unitId">{{unit.nombre}}</p>
          </div>
          <div v-show="menu=='turno'">
            <button>AVANZAR FASE</button>
          </div>
          <div v-show="menu=='mapa'">
            <button>AÑADIR OBSTÁCULO</button>
          </div>
        </div>

        <div>
          <button>BOTÓN</button>
        </div>
      </div>
      <div class="game-menu__footer">
        <div>
          <button>BOTÓN</button>
        </div>
      </div>
    </div>

    <div id="game-board" class="board-item" :bid="battleid" v-show="boardItem=='game-board'">
      <div class="board-container">

        <div class="row" v-for="rowNum in battle.ancho" :key="'row-'+rowNum" :id="'row-'+rowNum">

          <div :class="'cell '+( (cellMatrix[rowNum][colNum].selected) ? 'selected' : '' )+' '+( (selectedCell.row==rowNum && selectedCell.col==colNum) ? 'selected-one' : '' )"
          v-for="colNum in battle.alto" :key="'cell-'+rowNum+'-'+colNum" :id="'cell-'+rowNum+'-'+colNum"
          :style="'width:'+cellSize+'px;height:'+cellSize+'px'" @click="selectCell(rowNum,colNum)">
            <div class="info"></div>
          </div>

        </div>

      </div>
    </div>

    <div id="add-unit-window" class="board-item" :bid="battleid" v-show="boardItem=='add-unit'">
      <div class="board-container">

        

      </div>
    </div>

    <div class="loading-screen" v-if="!battle.nombre">
      <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
//import router from '../router/index'

import {mapActions, mapState} from 'vuex'

import app from '../firebase'
import { getDatabase, ref, set, onValue } from "firebase/database";

const db = getDatabase(app);

export default {
  name: 'BattleView',
  components: {
    
  },
  data: function() {
    return {
      gameid: null,
      battleid: null,
      game: {},
      battle: {},
      cellSize: 60,
      isPlayer: false,
      boardItem: 'game-board',
      menu: 'unidades',
      turnoActual: 0,
      selectedCell: {
        row: 0,
        col: 0
      }
    };
  },
  methods: {
    ...mapActions(['getGames','getUserSesion','loadBattleGame']),
    triggerMenu() {
      if(document.getElementById("game-menu").classList.contains("collapsed")) {
        document.getElementById("game-menu").classList.remove("collapsed")
        document.getElementById("game-board").classList.remove("expanded")
      } else {
        document.getElementById("game-menu").classList.add("collapsed")
        document.getElementById("game-board").classList.add("expanded")
      }
    },
    getFaseActualTexto() {
      if(this.turnoActual == 0) {
        return "Fase de Preparación"
      } else if(this.turnoActual > 0) {
        if(this.faseActual == "vaticinacion") {
          return "Fase de Vaticinación"
        } else if(this.faseActual == "accion") {
          return "Fase de Acción"
        }
      }
    },
    loadCellMatrix() {
      onValue(ref(db, 'games/'+this.gameid+'/batallas/'+this.battleid+'/cellMatrix'), (snapshot) => {
        const data = snapshot.val();
        //console.log(data);
        this.cellMatrix = data;
      });
    },
    selectCell(rowNum,colNum) {
      if(this.selectedCell.row == rowNum && this.selectedCell.col == colNum) {
        this.selectedCell = {
          row: 0,
          col: 0
        }
        this.cellMatrix[rowNum][colNum].selected = false;
      } else if(!this.cellMatrix[rowNum][colNum].selected) {
        this.selectedCell = {
          row: rowNum,
          col: colNum
        }
        this.cellMatrix[rowNum][colNum].selected = true;
      } else {
        this.cellMatrix[rowNum][colNum].selected = false;
      }
      this.updateFirebaseCellMatrixWithLocal();
    },
    updateFirebaseCellMatrixWithLocal() {
      set(ref(db, 'games/'+this.gameid+'/batallas/'+this.battleid+'/cellMatrix'), this.cellMatrix);
    },
    changeMenu(m) {
      this.menu = m;
    },
    openAddUnitWindow() {
      if(this.boardItem=='add-unit') {
        this.boardItem='game-board';
      } else {
        this.boardItem='add-unit';
      }
    }
  },
  computed: {
    ...mapState(['games','users','info','user','battleGame'])
  },
  mounted() {
    this.gameid = this.$route.params.gameid;
    this.battleid = this.$route.params.battleid;
    this.getUserSesion();
    this.loadBattleGame(this.gameid);
  },
  watch: {
    user() {
      this.loadBattleGame(this.gameid);
    },
    games() {
      Object.keys(this.games).forEach(gid => {
        if(this.games[gid].id == this.gameid) {
          this.game = this.games[gid];
        }
      });
    },
    game() {
      Object.keys(this.game.batallas).forEach(bid => {
        if(bid == this.battleid) {
          this.battle = this.game.batallas[bid];
        }
      });
    },
    battleGame() {
      this.game = this.battleGame;
      this.loadCellMatrix();
      console.log("otra vez");
    }
  }
}
</script>

<style scoped>
</style>