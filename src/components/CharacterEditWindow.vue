<template>
    <div id="game-card-sheet" :class="editWindow==''?'empty-edit':''">
      <div id="gcs-capa">
        <div id="game-card-sheet-config" class="edit-screen">
          <div class="gcs-nombre-raza">
            <div class="profile-pic">
              <img :src="getBaseUrl()+'/assets/img/profiles/profile_'+char.nombre.toLowerCase()+'.jpg'" />
            </div>
            <input class="nombre" type="text" name="nombre" v-model="charToEdit.nombre">

            <button id="gcs-editar-raza" class="raza edit-button-box" title="EDITAR RAZA" @click="openVentanaEdicion('raza')">
              {{charToEdit.raza}}
            </button>
          </div>

          <div class="gcs-sub-info">
            <div>
              <h3 class="edad">EDAD</h3>
              <input class="edad" type="text" name="edad" v-model="charToEdit.edad">
            </div>
            <div>
              <h3 class="altura">ALTURA</h3>
              <input class="altura" type="text" name="altura" v-model="charToEdit.altura">
            </div>
            <div>
              <h3 class="peso">PESO</h3>
              <input class="peso" type="text" name="peso" v-model="charToEdit.peso">
            </div>
            <div>
              <h3 class="elemento">ELEMENTO</h3>
              <input class="elemento" type="text" name="elemento" v-model="charToEdit.elemento">
            </div>
            <div v-if="!isPlayer">
              <h3 class="grupo">GRUPO</h3>
              <input class="grupo" type="text" name="grupo" v-model="charToEdit.grupo">
            </div>
          </div>

          <button id="gcs-editar-clase" class="gcs-clase-nivel edit-button-box" title="EDITAR CLASE" @click="openVentanaEdicion('clase')">
              {{charToEdit.clase + ' NIVEL ' + charToEdit.nivel}}
          </button>
          <button id="gcs-editar-magias" class="gcs-magias-conjuros edit-button-box" title="EDITAR MAGIAS" @click="openVentanaEdicion('magias')">
              {{"MAGIAS & CONJUROS"}}
          </button>

          <div class="gcs-container">
            <button id="gcs-editar-tipos" class="gcs-tipos-unidad edit-button-box" title="EDITAR TIPOS" @click="openVentanaEdicion('iconos')">
              <p>TIPOS DE UNIDAD</p>

              <img class="type" v-for="unitType in charToEdit.unitTypes"
                :key="charToEdit.nombre+'_'+unitType"
                :src="getBaseUrl()+'/assets/img/ico_'+unitType.toLowerCase()+'.png'"
                :title="unitType.toUpperCase()" :alt="unitType.toUpperCase()" />
              <img v-if="charToEdit.unitTypes==null || (charToEdit.unitTypes!=null && charToEdit.unitTypes.length==0)"
                class="type"
                src="../assets/img/ico_.png"
                title="X" alt="X" />
            </button>

            <button id="gcs-editar-roles" class="gcs-roles-unidad edit-button-box" title="EDITAR ROLES" @click="openVentanaEdicion('iconos')">
              <p>ROLES</p>

              <img class="role" v-for="unitRole in charToEdit.unitRoles"
                :key="charToEdit.nombre+'_'+unitRole"
                :src="getBaseUrl()+'/assets/img/ico_'+unitRole.toLowerCase()+'.png'"
                :title="unitRole.toUpperCase()" :alt="unitRole.toUpperCase()" />
              <img v-if="charToEdit.unitRoles==null || (charToEdit.unitRoles!=null && charToEdit.unitRoles.length==0)"
                class="role"
                src="../assets/img/ico_.png"
                title="X" alt="X" />
            </button>
          </div>

          <div class="gcs-stats">
            <button id="gcs-editar-ficha" class="edit-button-box" title="EDITAR FICHA" @click="openVentanaEdicion('ficha')">
              <p>ESTADÍSTICAS Y FICHA</p>
              <div v-for="(value,stat) in charToEdit.stats" :key="charToEdit.nombre+'_'+stat" :class="'stat '+stat">
                <img :src="getBaseUrl()+'/assets/img/ico_'+stat+'.png'" :title="stat" :alt="stat" />
                <p>{{value}}</p>
              </div>
            </button>
            <button id="gcs-editar-apuntes" class="edit-button-box" title="EDITAR APUNTES" @click="openVentanaEdicion('apuntes')">
              ANOTACIONES
            </button>
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
            
            <button id="gcs-editar-inventario" class="edit-button-box" title="EDITAR INVENTARIO" @click="openVentanaEdicion('inventario')">
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
            <h4>ESTADÍSTICAS</h4>
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

          <!-- EDICIÓN DE CLASE -->
          <div id="game-card-sheet-class" class="edit-screen" v-if="editWindow=='clase'">
            <div class="gcsc-clase-descripcion">
              <div class="gcsc-clase">
                <h2>CLASE</h2>
                <div class="selects">
                  <select class="clase" name="clase" v-model="charToEdit.clase" @click="busquedaClase = charToEdit.clase.toUpperCase()">
                    <option value="DEFAULT">DEFAULT</option>
                    <option v-for="(val,clase) in info.clases" :key="'op-'+clase"
                     :value="clase.toUpperCase()">
                     {{clase.toUpperCase()}}
                    </option>
                  </select>
                  <select class="nivel" name="nivel" v-model="charToEdit.nivel">
                    <option value="0">0</option>
                    <option v-for="index in 10" :key="'op_'+index"
                     :value="index">
                     {{index}}
                    </option>
                  </select>
                </div>
                <div class="content" v-if="charToEdit.clase.toLowerCase()!='default'">
                  <p><b>ESTADÍSTICAS</b></p>
                  <span v-for="(value,name) in info.clases[charToEdit.clase.toLowerCase()].estadisticas" :key="'est-'+name">
                    {{name.toUpperCase()+' '+value}}
                  </span>
                </div>
              </div>
              <div class="gcsc-descripcion">
                <h2>{{charToEdit.clase.toUpperCase()}}</h2>
                <div class="content">
                  <p v-if="charToEdit.clase.toLowerCase()!='default'">
                    {{info.clases[charToEdit.clase.toLowerCase()].desc}}
                  </p>
                  <p v-if="charToEdit.clase.toLowerCase()=='default'">
                    Selecciona una clase para obtener más información.
                  </p>
                </div>
              </div>
            </div>
            <div class="gcsc-talentos">
              <div class="gcsc-talentos-disponibles">
                <h2>TALENTOS DISPONIBLES</h2>
                <input class="search" type="text" placeholder="Buscar por nombre o clase" v-model="busquedaClase">

                <div class="content">
                  <div v-for="(clase, cName) in info.clases" :key="'grt-'+cName">
                    <div v-for="(talento, tName) in clase.talentos" :key="'tn-'+tName"
                     :data-search="tName.toUpperCase()" :class="talentoActualName==tName?'selected':''"
                     v-show="cName.toUpperCase().indexOf(busquedaClase.toUpperCase()) > -1 |
                     tName.toUpperCase().indexOf(busquedaClase.toUpperCase()) > -1 |
                     talento.desc.toUpperCase().indexOf(busquedaClase.toUpperCase()) > -1"
                     @click="changeTalentoActual(tName,talento,cName)">
                      <b><u>{{tName.toUpperCase() + ':'}}</u></b>
                      <br>
                      {{(talento.desc.length>203)?talento.desc.slice(0,200)+'...':talento.desc}}
                    </div>
                  </div>
                </div>
              </div>

              <div class="gcsc-talentos-actuales">
                <h2>TALENTOS ACTUALES</h2>
                Máx:<span>{{charToEdit.nivel}}</span>
                <div class="content">
                  <div v-for="(talento, tName) in getTalentos()" :key="'tna-'+tName"
                   :class="talentoActualName==tName?'selected':''" @click="changeTalentoActual(tName,talento,talento.cName)">
                    <b><u>{{tName.toUpperCase() + ':'}}</u></b>
                    <br>
                    {{(talento.desc.length>203)?talento.desc.slice(0,200)+'...':talento.desc}}
                  </div>
                </div>
              </div>

              <div class="gcsc-talento-seleccionado" v-show="talentoActualName != ''">
                <h2>{{talentoActualName.toUpperCase()}}</h2>
                <p :class="talentoActualClase.toUpperCase()!=charToEdit.clase.toUpperCase()?'unmatched':''">
                  {{'-CLASE: '+talentoActualClase.toUpperCase()}}
                </p>

                <p>-REQUERIMIENTO DE NIVEL: CUALQUIERA</p>

                <p>-VALORES: ···</p>

                <p>{{talentoActual.desc}}</p>

                <!-- botón de añadir/eliminar talento -->
                <button id="gcsc-talento-button" :class="getTalentos()[talentoActualName]?'delete-talento':'add-talento'"
                 @click="checkTalento(talentoActualName)">
                  {{getTalentos()[talentoActualName]?'ELIMINAR':'AÑADIR' + ' TALENTO'}}
                </button>
              </div>
            </div>
          </div>

          <!-- EDICIÓN DE MAGIAS -->
          <div id="game-card-sheet-magics" class="edit-screen" v-if="editWindow=='magias'">
            <div class="gcsm-magias">
              <div class="gcsm-magias-disponibles">
                <h2>MAGIAS DISPONIBLES</h2>
                <input class="search" type="text" placeholder="Buscar por magia o conjuro">
                <div class="content"></div>
              </div>

              <div class="gcsm-magias-actuales">
                <h2>MAGIAS ACTUALES</h2>
                <div class="content"></div>
              </div>

              <div class="gcsm-magia-seleccionada">
                <h2>MAGIA SELECCIONADA</h2>
              </div>
            </div>
          </div>

          <!-- EDICIÓN DE ROLES Y TIPOS -->
          <div id="game-card-sheet-icons" class="edit-screen" v-if="editWindow=='iconos'">
            <div class="gcsi-tipos">
              <h2>TIPOS DE UNIDAD</h2>
              <div class="gcsi-tipos-disponibles">
                <h3>TIPOS DISPONIBLES</h3>

                <select class="tipos-disponibles" v-model="tipoActual">
                  <option value="">...</option>
                  <option v-for="(tipo, tName) in info.tipos" :key="'opti-'+tipo"
                   :value="tName">
                    {{tipo}}
                  </option>
                </select>

                <div class="content" v-if="tipoActual!=''">
                  <img :src="getBaseUrl()+'/assets/img/ico_'+tipoActual+'.png'"/>
                  <p>{{info.tipos[tipoActual]}}</p>
                  <button class="add-icon" @click="addTipo">
                    AÑADIR
                  </button>
                </div>
              </div>

              <div class="gcsi-botones">
                <p>
                  Actualizar según mi clase
                  <button class="round-button" @click="updateTypeByClase"><img src="../assets/img/ico_refresh.png"/></button>
                </p>
                <p>
                  Actualizar según mi raza
                  <button class="round-button" @click="updateTypeByRaza"><img src="../assets/img/ico_refresh.png"/></button>
                </p>
              </div>

              <div class="gcsi-tipos-actuales">
                <h3>TIPOS ACTUALES</h3>
                <div class="content">
                  <div v-for="(tipo) in charToEdit.unitTypes" :key="'ta_'+tipo"
                   @click="removeTipo(tipo)">
                    <img :src="getBaseUrl()+'/assets/img/ico_'+tipo+'.png'" :title="info.tipos[tipo]" />
                  </div>
                </div>
              </div>
            </div>

            <div class="gcsi-roles">
              <h2>ROLES DE UNIDAD</h2>
              <div class="gcsi-roles-disponibles">
                <h3>ROLES DISPONIBLES</h3>

                <select class="roles-disponibles" v-model="rolActual">
                  <option value="">...</option>
                  <option v-for="(rol, rName) in info.roles" :key="'opri-'+rol"
                   :value="rName">
                    {{rol}}
                  </option>
                </select>

                <div class="content" v-if="rolActual!=''">
                  <img :src="getBaseUrl()+'/assets/img/ico_'+rolActual+'.png'"/>
                  <p>{{info.roles[rolActual]}}</p>
                  <button class="add-icon" @click="addRol">
                    AÑADIR
                  </button>
                </div>
              </div>

              <div class="gcsi-botones">
                <p>
                  Actualizar según mi clase
                  <button class="round-button" @click="updateRoleByClase"><img src="../assets/img/ico_refresh.png"/></button>
                </p>
              </div>

              <div class="gcsi-roles-actuales">
                <h3>ROLES ACTUALES</h3>
                <div class="content">
                  <div v-for="(rol) in charToEdit.unitRoles" :key="'ra_'+rol"
                   @click="removeRol(rol)">
                    <img :src="getBaseUrl()+'/assets/img/ico_'+rol+'.png'" :title="info.roles[rol]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- EDICIÓN DE INVENTARIO Y CAPITAL -->
          <div id="game-card-sheet-objects" class="edit-screen" v-if="editWindow=='inventario'">
            <div class="gcso-inventario-equipo" v-show="!isEditingObject">
              <div class="gcso-inventario">
                <h2>INVENTARIO</h2>
                <div class="content">
                  <div v-for="(itemId) in getInventario('inventario')" :key="'item-i-'+itemId" :title="this.charToEdit.inventario[itemId].nombre"
                   :class="itemId == this.objectToEditId ? 'selected':''" @click="loadExistingItem(this.charToEdit.inventario[itemId],itemId)">
                    <img :src="getBaseUrl()+'/assets/img/ico_'+this.charToEdit.inventario[itemId].tipo+'.png'" />
                    <span class="item-name">{{cutItemName(this.charToEdit.inventario[itemId].nombre)}}</span>
                    <span class="item-quantity">
                      {{(this.charToEdit.inventario[itemId].cantidad?this.charToEdit.inventario[itemId].cantidad:'1')}}
                    </span>
                  </div>
                </div>
              </div>
              <div class="gcso-transportado">
                <h2>TRANSPORTADO</h2>
                <div class="content">
                  <div v-for="(itemId) in getInventario('transportado')" :key="'item-i-'+itemId" :title="this.charToEdit.inventario[itemId].nombre"
                   :class="itemId == this.objectToEditId ? 'selected':''" @click="loadExistingItem(this.charToEdit.inventario[itemId],itemId)">
                    <img :src="getBaseUrl()+'/assets/img/ico_'+this.charToEdit.inventario[itemId].tipo+'.png'" />
                    <span class="item-name">{{cutItemName(this.charToEdit.inventario[itemId].nombre)}}</span>
                    <span class="item-quantity">
                      {{(this.charToEdit.inventario[itemId].cantidad?this.charToEdit.inventario[itemId].cantidad:'1')}}
                    </span>
                  </div>
                </div>
              </div>
              <div class="gcso-equipo">
                <h2>EQUIPADO</h2>
                <div class="content">
                  <div v-for="(itemId) in getInventario('equipado')" :key="'item-i-'+itemId" :title="this.charToEdit.inventario[itemId].nombre"
                   :class="itemId == this.objectToEditId ? 'selected':''" @click="loadExistingItem(this.charToEdit.inventario[itemId],itemId)">
                    <img :src="getBaseUrl()+'/assets/img/ico_'+this.charToEdit.inventario[itemId].tipo+'.png'" />
                    <span class="item-name">{{cutItemName(this.charToEdit.inventario[itemId].nombre)}}</span>
                    <span class="item-quantity">
                      {{(this.charToEdit.inventario[itemId].cantidad?this.charToEdit.inventario[itemId].cantidad:'1')}}
                    </span>
                  </div>
                </div>
              </div>
              <div class="container">
                <button class="add-new-object" @click="isEditingObject = true;">AÑADIR OBJETO</button>
              </div>
              <div class="gcso-oro">
                <h2>CAPITAL</h2>
                <div class="money">
                  <div class="coin gold"><input v-model="capitalToEdit.oro" type="text" name="oro"></div>
                  <div class="coin silver"><input v-model="capitalToEdit.plata" type="text" name="plata"></div>
                  <div class="coin copper"><input v-model="capitalToEdit.cobre" type="text" name="cobre"></div>
                </div>
              </div>
            </div>

            <div class="gcso-edicion" v-show="isEditingObject">
              <h2>{{objectToEditId==null?'AÑADIR OBJETO':'EDITAR OBJETO'}}</h2>
              <div class="lista-search" v-show="objectToEditId==null">
                <input class="search" placeholder="Buscar por nombre o tipo" v-model="busquedaObjeto">
                <div class="lista-objetos">
                    <div class="t1">ARSENAL</div>
                    <div v-for="(grupo,gName) in info.objetos.arsenal" :key="'go-'+gName">
                      <div class="t2">{{gName.toUpperCase()}}</div>
                      <div v-for="(item,iName) in grupo" :key="'io-'+iName" class="selectable"
                       @click="loadObjectPlantilla(item,'equipable')"
                       v-show="(iName.toUpperCase().indexOf(busquedaObjeto.toUpperCase())>-1) ||
                       (item.nombre.toUpperCase().indexOf(busquedaObjeto.toUpperCase())>-1)">
                        {{item.nombre.toUpperCase()}}
                      </div>
                    </div>
                    
                    <div class="t1">CONSUMIBLE</div>
                    <div v-for="(item,iName) in info.objetos.consumibles" :key="'io-'+iName" class="selectable"
                     @click="loadObjectPlantilla(item,'consumible')"
                     v-show="(iName.toUpperCase().indexOf(busquedaObjeto.toUpperCase())>-1)">
                      {{item.nombre.toUpperCase()}}
                    </div>
                </div>
              </div>

              <div class="nombre-tipo" :style="objectToEditId!=null?'width: 100%':''">
                <input type="text" class="nombre-objeto" placeholder="Nombre del objeto" v-model="objetoToEdit.nombre">
                <input class="cantidad-objeto" placeholder="Cant." v-model="objetoToEdit.cantidad">
                <div class="caja-tipo">
                  <p>TIPO:</p>
                  <select class="tipo" v-model="objetoToEdit.tipo">
                    <option value="miscelanea">MISCELÁNEA</option>
                    <option value="equipable">EQUIPABLE</option>
                    <option value="consumible">CONSUMIBLE</option>
                    <!-- TIPOS EXTRA -->
                    <option value="sword">ESPADA</option>
                    <option value="rapier">ESTOQUE</option>
                    <option value="saber">SABLE</option>
                    <option value="dagger">DAGA</option>
                    <option value="axe">HACHA</option>
                    <option value="spear">LANZA</option>
                    <option value="mace">MAZA</option>
                    <option value="hammer">MARTILLO</option>
                    <option value="fist">PUÑO</option>
                    <option value="glove">GUANTE</option>
                    <option value="katana">KATANA</option>
                    <option value="kunai">KUNAI</option>
                    <option value="boomerang">BUMERANG</option>

                    <option value="sling">SLINGA</option>
                    <option value="gun">PISTOLA</option>
                    <option value="bow">ARCO</option>
                    <option value="crossbow">BALLESTA</option>
                    <option value="ammo">MUNICIÓN</option>

                    <option value="helmet">YELMO</option>
                    <option value="armor">ARMADURA</option>
                    <option value="shield">ESCUDO</option>

                    <option value="jewel">JOYA</option>
                    <option value="food">COMIDA</option>
                    <option value="mineral">MINERAL</option>
                    <option value="clothes">ROPA</option>
                    <option value="tool">HERRAMIENTA</option>
                    <option value="book">LIBRO</option>
                    <option value="scroll">PERGAMINO</option>

                  </select>
                </div>
                <div class="caja-inventory-type">
                  <p>UBICACIÓN:</p>
                  <select class="inventory-type" v-model="objetoToEdit.inventorySide">
                    <option value="inventario">INVENTARIO</option>
                    <option value="transportado">TRANSPORTADO</option>
                    <option value="equipado">EQUIPADO</option>

                  </select>
                </div>
                <div class="estadisticas">
                  <p>ESTADÍSTICAS</p>
                  <div class="content">
                    <div v-for="(stat, index) in estadisticasToEdit" :key="'s-'+stat.name+'-'+index" class="estadistica">
                      <button class="round-button remove-estadistica" @click="newEstadisticaName=stat.name;addNewEstadistica()">-</button>

                      <span>{{estadisticasToEdit[index].name}}</span>

                      <input class="num" v-model="estadisticasToEdit[index].value">
                    </div>
                    <div class="estadistica estadistica-select">
                      <select v-model="newEstadisticaName">
                        <option value="">seleccionar estadística</option>
                        <option value="daño">daño</option>
                        <option value="armadura">armadura</option>
                        <option value="vida">vida</option>
                        <option value="mana">mana</option>
                        <option value="energia">energia</option>
                        <!-- atributos -->
                        <option value="agilidad">agilidad</option>
                        <option value="fuerza">fuerza</option>
                        <option value="resistencia">resistencia</option>
                        <option value="inteligencia">inteligencia</option>
                        <option value="manipulacion">manipulacion</option>
                        <option value="velo">velo</option>
                        <option value="astucia">astucia</option>
                        <option value="destreza">destreza</option>
                        <option value="sensitividad">sensitividad</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="descripcion-caracteristicas">
                <p>{{'Descripción & Características'}}</p>
                <textarea class="descripcion" v-model="objetoToEdit.desc" />
                <!--
                <p>Requerimientos</p>
                <textarea class="requerimientos" v-model="objetoToEdit.requerimientos" />
                -->
              </div>

              <input class="peso" v-model="objetoToEdit.peso">

              <div class="button-container">
                <button class="add-object" @click="addObject">
                  {{objectToEditId==null?'CREAR NUEVO OBJETO':'GUARDAR OBJETO EXISTENTE'}}
                </button>
                <button class="remove-object" @click="removeObject" v-if="objectToEditId!=null">
                  ELIMINAR OBJETO
                </button>
              </div>
            </div>
          </div>

          <!-- EDICIÓN APUNTES -->
          <div id="game-card-sheet-notes" class="edit-screen" v-if="editWindow=='apuntes'">
            <div class="gcsn-container">
              <h2>ANOTACIONES</h2>
              <textarea class="gcsn-apuntes" v-model="charToEdit.apuntes" />
            </div>
          </div>

          <!-- Botón de ir atrás -->
          <button class="go-back" v-if="editWindow!=''" @click="goBack">
            ATRÁS
          </button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CharacterEditWindow',
  props: ["char","charToEditId","info","isPlayer"],
  components: {},
  data () {
    return {
      // información del personaje que está siendo editado
      charToEdit: {},
      // array del dinero a editar de un personaje, separada de "charToEdit" por cuestiones a la hora de vaciar arrays
      capitalToEdit: {},
      // Ventana de edición abierta en estos momentos. Un valor vacío equivale a ninguna
      // - "ficha" = Ventana de edición de habilidades, atributos y stats
      // - "raza" = Ventana de edición de raza y habilidades raciales
      // - "iconos" = Ventana de edición de roles y tipos de unidad
      // - "clase" = Ventana de edición de clase y talentos
      // - "magias" = Ventana de edición de magias y conjuros. Esta ventana es un W.I.P.
      // - "inventario" = Ventana de edición de inventario. Añadir, eliminar y editar objetos
      editWindow: "",
      // valor de la "search bar" para buscar talentos
      busquedaClase: "",
      // información del talento seleccionado para añadir o eliminar
      talentoActual: {},
      // nombre del talento seleccionado
      talentoActualName: "",
      // clase a la que pertenece el talento seleccionado
      talentoActualClase: "",
      // tipo seleccionado en el select para añadir
      tipoActual: "",
      // rol seleccionado en el select para añadir
      rolActual: "",
      // valor de la "search bar" para buscar plantillas de objetos
      busquedaObjeto: "",
      // id del objeto que está siendo editado, si va a ser un objeto nuevo este valor es null
      objectToEditId: null,
      // el objeto que está siendo editado, ya sea nuevo o no
      objetoToEdit: {
        nombre: "",
        cantidad: "0",
        desc: "",
        requerimientos: "",
        peso: "0",
        tipo: "miscelanea",
        inventorySide: "inventario",
        estadisticas: []
      },
      // array de las estadisticas a editar de un objeto, separada de "objetoToEdit" por cuestiones a la hora de vaciar arrays
      estadisticasToEdit: [],
      // valor del select para añadir/eliminar nueva estadistica de un objeto
      newEstadisticaName: "",
      // variable para controlar la visibilidad del modal de edición (o creación) de objeto
      isEditingObject: false
    }
  },
  methods: {
    getBaseUrl() {
      return window.location.origin;
    },
    // Mandamos al componente raiz la información del personaje a ser guardado
    saveChar() {
      // mandamos la info en una array para mantener la ID del personaje
      var temporal = {charToEdit:this.charToEdit, id:this.charToEditId};
      // actualizamos el capital
      temporal.charToEdit.capital = this.capitalToEdit;
      //nos aseguramos de que los arrays no estén vacíos
      if(!temporal.charToEdit.unitRoles)
        temporal.charToEdit.unitRoles = []
      if(!temporal.charToEdit.unitTypes)
        temporal.charToEdit.unitTypes = []
      if(!temporal.charToEdit.talentos)
        temporal.charToEdit.talentos = []
      if(!temporal.charToEdit.capacidades)
        temporal.charToEdit.capacidades = []
      
      this.$emit('saveChar', temporal);
    },
    // Abrimos o cerramos una ventana de edición según el valor pasado
    openVentanaEdicion(ventana) {
      if(this.editWindow == ventana) {
        this.editWindow = '';
      } else {
        this.editWindow = ventana;
      }
    },
    // Recogemos las capacidades raciales en una función para tratar con los valores null/undefined
    getCapacidades() {
      var capacidades = {};
      if(this.charToEdit.capacidades)
      Object.keys(this.charToEdit.capacidades).forEach(obj => {
        let name = this.charToEdit.capacidades[obj];
        capacidades[name.toLowerCase()] = true;
      });
      return capacidades;
    },
    // Añadimos o eliminamos la capacidad racial clicada al array de capacidades
    checkCapacidad(capName) {
      // comprobación de si es undefined
      if(!this.charToEdit.capacidades) {
        this.charToEdit.capacidades = []
      }
      // si la capacidad clicada ya existe la borramos del array
      if(this.getCapacidades()[capName.toLowerCase()]) {
        // para borrar del array creamos uno de 0 sin esa capacidad, porque javascript es precioso
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
    },
    // Cambiamos el talento mostrado como "Talento Actual"
    changeTalentoActual(tName, talento, clase) {
      // si clicamos sobre el mismo, lo quitamos
      if(this.talentoActualName == tName) {
        this.talentoActualName = "";
        this.talentoActual = {};
        this.talentoActualClase = "";
      // si clicamos sobre otro cargamos esa info
      } else {
        this.talentoActualName = tName;
        this.talentoActual = talento;
        this.talentoActualClase = clase;
      }
    },
    // Recogemos los talentos en una función para tratar los valores null/undefined
    getTalentos() {
      var talentos = {};
      if(this.charToEdit.talentos)
      Object.keys(this.charToEdit.talentos).forEach(obj => {
        let name = this.charToEdit.talentos[obj];
        Object.keys(this.info.clases).forEach(clase => {
          Object.keys(this.info.clases[clase].talentos).forEach(talento => {
            if(name.toLowerCase() == talento.toLowerCase()) {
              talentos[name.toLowerCase()] = this.info.clases[clase].talentos[talento];
              talentos[name.toLowerCase()].cName = clase;
            }
          });
        });
      });
      return talentos;
    },
    // Añadimos o eliminamos el talento clicado
    checkTalento(tName) {
      // arreglamos el undefined
      if(!this.charToEdit.talentos) {
        this.charToEdit.talentos = []
      }
      if(this.getTalentos()[this.talentoActualName]) {
        var temporal = [];
        Object.keys(this.charToEdit.talentos).forEach(obj => {
          let name = this.charToEdit.talentos[obj].toLowerCase();
          if(name != tName.toLowerCase()) {
            temporal.push(name);
          }
        });
        this.charToEdit.talentos = temporal;
      } else {
        this.charToEdit.talentos.push(tName.toLowerCase());
      }
    },
    // Añadimos un tipo de unidad, sólo si no existía ya
    addTipo() {
      if(!this.charToEdit.unitTypes)
      this.charToEdit.unitTypes = []
      var exists = false;
      Object.keys(this.charToEdit.unitTypes).forEach(type => {
        let tipo = this.charToEdit.unitTypes[type];
        if(tipo==this.tipoActual) {
          exists = true;
        }
      });
      if(!exists) {
        this.charToEdit.unitTypes.push(this.tipoActual);
      }
    },
    // Añadimos un rol de unidad, sólo si no existía ya
    addRol() {
      if(!this.charToEdit.unitRoles)
      this.charToEdit.unitRoles = []
      var exists = false;
      Object.keys(this.charToEdit.unitRoles).forEach(rol => {
        let role = this.charToEdit.unitRoles[rol];
        if(role==this.rolActual) {
          exists = true;
        }
      });
      if(!exists) {
        this.charToEdit.unitRoles.push(this.rolActual);
      }
    },
    // Eliminamos el tipo ya existente al clicarle encima
    removeTipo(tipo) {
      var temporal = [];
      Object.keys(this.charToEdit.unitTypes).forEach(obj => {
        let name = this.charToEdit.unitTypes[obj];
        if(name != tipo) {
          temporal.push(name);
        }
      });
      this.charToEdit.unitTypes = temporal;
    },
    // Eliminamos el rol ya existente al clicarle encima
    removeRol(rol) {
      var temporal = [];
      Object.keys(this.charToEdit.unitRoles).forEach(obj => {
        let name = this.charToEdit.unitRoles[obj];
        if(name != rol) {
          temporal.push(name);
        }
      });
      this.charToEdit.unitRoles = temporal;
    },
    // Cargamos un objeto de la lista de plantillas
    loadObjectPlantilla(item,tipo) {
      this.objectToEditId = null;
      this.objetoToEdit.nombre = item.nombre;
      this.objetoToEdit.cantidad = 1;
      this.objetoToEdit.desc = item.desc;
      this.objetoToEdit.requerimientos = item.requerimientos;
      this.objetoToEdit.peso = item.peso;
      this.objetoToEdit.tipo = tipo;
      this.objetoToEdit.inventorySide = "inventario";
      this.objetoToEdit.estadisticas = item.estadisticas;
      this.estadisticasToEdit = [];
      Object.keys(item.estadisticas).forEach(stat => {
        this.estadisticasToEdit.push({name:stat,value:item.estadisticas[stat]});
      });
    },
    // Añadimos o eliminamos una estadística nueva al objeto en edición
    addNewEstadistica() {
      if( ( null==this.getEstadisticaFromEdit(this.newEstadisticaName) ) && ( this.newEstadisticaName != "" ) ) {
        this.estadisticasToEdit.push({
          name: this.newEstadisticaName,
          value: 1
        });
      } else {
        // si el stat que queremos añadir ya existe, entonces lo borramos de la lista
        var newStats = [];
        Object.keys(this.estadisticasToEdit).forEach(num => {
          var stat = {name: this.estadisticasToEdit[num].name, value: this.estadisticasToEdit[num].value};
          if(stat.name != this.newEstadisticaName) {
            newStats.push(stat);
          }
        });
        this.estadisticasToEdit = newStats;
      }
      this.newEstadisticaName = "";
      // actualizamos las stats del objeto editado
      this.updateObjectToEditEstadisticas();
    },
    // Recogemos el valor de una sola estadistica (name)
    getEstadisticaFromEdit(name) {
      var result = null;
      Object.keys(this.estadisticasToEdit).forEach(num => {
        if(this.estadisticasToEdit[num].name == name) {
          result = this.estadisticasToEdit[num];
        }
      });
      return result;
    },
    // Actualizamos las estadísticas de "objectToEdit.estadisticas" con "estadistiasToEdit"
    updateObjectToEditEstadisticas() {
      var temporal = [];
      Object.keys(this.estadisticasToEdit).forEach(num => {
        temporal[this.estadisticasToEdit[num].name] = this.estadisticasToEdit[num].value;
      });
      this.objetoToEdit.estadisticas = temporal;
    },
    // Guardamos la info del objeto en edición, si es nuevo se crea uno nuevo
    addObject() {
      // si no tenemos nombre de objeto ni lo creamos
      if(this.objetoToEdit.nombre && this.objetoToEdit.nombre!="") {
        var num
        if(this.objectToEditId == null) {
          this.charToEdit.inventario.push({});
          num = this.charToEdit.inventario.length -1;
          
        } else {
          num = this.objectToEditId;
        }
        this.charToEdit.inventario[num] = {
          nombre: this.objetoToEdit.nombre,
          cantidad: this.objetoToEdit.cantidad<1?1:this.objetoToEdit.cantidad,
          desc: this.objetoToEdit.desc?this.objetoToEdit.desc:"",
          requerimientos: this.objetoToEdit.requerimientos?this.objetoToEdit.requerimientos:"",
          peso: this.objetoToEdit.peso?this.objetoToEdit.peso:0,
          tipo: this.objetoToEdit.tipo?this.objetoToEdit.tipo:"miscelanea",
          inventorySide: this.objetoToEdit.inventorySide?this.objetoToEdit.inventorySide:'inventario',
          estadisticas: this.transformEstadisticas(this.estadisticasToEdit)
        };
        this.emptyEditingObject();
      } else {
        console.error("EL OBJETO A CREAR/EDITAR REQUIERE DE UN NOMBRE CON UN MÍNIMO DE UN CARACTER");
      }
    },
    // Eliminamos el objeto en edición
    removeObject() {
      if(this.objectToEditId != null) {
        if(confirm("¿Estás seguro de que quieres eliminar el objeto '"+this.objetoToEdit.nombre+"'?")) {
          var invTemporal = [];
          Object.keys(this.charToEdit.inventario).forEach(oId => {
            if(oId != this.objectToEditId) {
              let o = this.charToEdit.inventario[oId];
              invTemporal.push({
                nombre: o.nombre,
                cantidad: o.cantidad,
                desc: o.desc?o.desc:"",
                requerimientos: o.requerimientos?o.requerimientos:"",
                peso: o.peso?o.peso:0,
                tipo: o.tipo?o.tipo:"miscelanea",
                inventorySide: o.inventorySide?o.inventorySide:"inventario",
                estadisticas: o.estadisticas?o.estadisticas:[]
              });
            }
          });
          this.charToEdit.inventario = invTemporal;
          // vaciamos el objeto en edición al final
          this.emptyEditingObject();
        }
      } else {
        console.error("INTENTANDO ELIMINAR OBJETO SIN ID");
      }
    },
    loadExistingItem(item, itemId) {
      if(this.objectToEditId != itemId) {
        this.isEditingObject = true;
        this.objectToEditId = itemId;
        this.objetoToEdit = {
          nombre: item.nombre,
          cantidad: item.cantidad?item.cantidad:1,
          desc: item.desc,
          requerimientos: item.requerimientos,
          peso: item.peso,
          tipo: item.tipo,
          inventorySide: item.inventorySide,
          estadisticas: item.estadisticas
        }
        this.estadisticasToEdit = [];
        if(item.estadisticas)
        Object.keys(item.estadisticas).forEach(stat => {
          this.estadisticasToEdit.push({name:stat,value:item.estadisticas[stat]});
        });
      // si el id es el mismo "deseleccionamos" el objeto, cargamos info vacía para un objeto nuevo
      } else {
        this.emptyEditingObject();
      }
    },
    emptyEditingObject() {
      this.isEditingObject = false;
      this.objectToEditId = null;
      this.objetoToEdit.nombre = "";
      this.objetoToEdit.cantidad = 1;
      this.objetoToEdit.desc = "";
      this.objetoToEdit.requerimientos = "";
      this.objetoToEdit.peso = 0;
      this.objetoToEdit.tipo = "";
      this.objetoToEdit.estadisticas = [];
      this.estadisticasToEdit = [];
      // también reseteamos la info del select de nueva estadistica
      this.newEstadisticaName = "";
    },
    transformEstadisticas(stats) {
      var result = [];
      Object.keys(stats).forEach(num => {
        result[stats[num].name] = stats[num].value;
      });
      return result;
    },
    updateTypeByClase() {
      if(!this.charToEdit.unitTypes)
        this.charToEdit.unitTypes = []
      Object.keys(this.info.clases).forEach(claseName => {
        if(claseName.toLowerCase() == this.charToEdit.clase.toLowerCase()) {
          if(this.info.clases[claseName].tipos)
            Object.keys(this.info.clases[claseName].tipos).forEach(tipoName => {
              var tipoInfo = this.info.clases[claseName].tipos[tipoName];
              var exists = false;
              Object.keys(this.charToEdit.unitTypes).forEach(type => {
                let tipo = this.charToEdit.unitTypes[type];
                if(tipo.toLowerCase()==tipoInfo.toLowerCase()) {
                  exists = true;
                }
              });
              if(!exists) {
                this.charToEdit.unitTypes.push(tipoInfo);
              }
            });
        }
      });
    },
    updateTypeByRaza() {
      if(!this.charToEdit.unitTypes)
        this.charToEdit.unitTypes = []
      Object.keys(this.info.razas).forEach(razaName => {
        if(razaName.toLowerCase() == this.charToEdit.raza.toLowerCase()) {
          if(this.info.razas[razaName].tipos)
            Object.keys(this.info.razas[razaName].tipos).forEach(tipoName => {
              var tipoInfo = this.info.razas[razaName].tipos[tipoName];
              var exists = false;
              Object.keys(this.charToEdit.unitTypes).forEach(type => {
                let tipo = this.charToEdit.unitTypes[type];
                if(tipo.toLowerCase()==tipoInfo.toLowerCase()) {
                  exists = true;
                }
              });
              if(!exists) {
                this.charToEdit.unitTypes.push(tipoInfo);
              }
            });
        }
      });
    },
    updateRoleByClase() {
      if(!this.charToEdit.unitRoles)
        this.charToEdit.unitRoles = []
      Object.keys(this.info.clases).forEach(claseName => {
        if(claseName.toLowerCase() == this.charToEdit.clase.toLowerCase()) {
          if(this.info.clases[claseName].roles)
            Object.keys(this.info.clases[claseName].roles).forEach(rolName => {
              var rolInfo = this.info.clases[claseName].roles[rolName];
              var exists = false;
              Object.keys(this.charToEdit.unitRoles).forEach(role => {
                let rol = this.charToEdit.unitRoles[role];
                if(rol.toLowerCase()==rolInfo.toLowerCase()) {
                  exists = true;
                }
              });
              if(!exists) {
                this.charToEdit.unitRoles.push(rolInfo);
              }
            });
        }
      });
    },
    getInventario(invSide) {
      if(!this.charToEdit.inventario)
        this.charToEdit.inventario = [];
      var inventoryResult = [];
      Object.keys(this.charToEdit.inventario).forEach(itemId => {
        if(!this.charToEdit.inventario[itemId].inventorySide)
          this.charToEdit.inventario[itemId].inventorySide = "inventario";
        
        if(this.charToEdit.inventario[itemId].inventorySide == invSide)
          inventoryResult.push(itemId);
      });
      return inventoryResult;
    },
    cutItemName(fullName) {
      fullName = fullName + "";
      if(fullName.length > 9) {
        return fullName.slice(0,6)+'...';
      } else {
        return fullName;
      }
    },
    goBack() {
      if(this.isEditingObject) {
        this.emptyEditingObject();
      } else {
        this.editWindow = '';
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
    this.charToEdit.clase = this.charToEdit.clase.toUpperCase();
    this.busquedaClase = this.char.clase.toUpperCase();
    if(this.charToEdit.inventario==null)
      this.charToEdit.inventario=[];
    if(this.charToEdit.talentos==null)
      this.charToEdit.talentos=[];
    if(this.charToEdit.capacidades==null)
      this.charToEdit.capacidades=[];
  },
  watch: {
    newEstadisticaName() {
      this.addNewEstadistica();
    }
  }
}
</script>

<style scoped>

</style>