import { createStore } from 'vuex'
import router from '../router/index'

import app from '../firebase'
import { getDatabase, ref, onValue, push, set, child } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";


// Get a reference to the database service
const database = getDatabase(app);


export default createStore({
  state: {
    games: [],
    users: [],
    info: {},
    user: "",
    error: "",
    characters: []
  },
  mutations: {
    setGames(state, list) {
      state.games = list;
      //console.log(state.games);
    },
    setUsers(state, list) {
      state.users = list;
      //console.log(state.users);
    },
    setInfo(state, info) {
      state.info = info;
      //console.log(state.info);
    },
    setUser(state, user) {
      state.user = user;
      //console.log(state.user);
    },
    setError(state, error) {
      state.error = error;
      //console.log(state.error);
    },
    setCharacters(state, characters) {
      state.characters = characters;
    }
  },
  actions: {
    iniciarSesion({ commit, dispatch }, user) {
      const auth = getAuth(app);
      if (user!=null) {
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then((u) => {
          onValue(ref(database,"users"), (snapshot) => {
            var data = snapshot.val();
            Object.keys(data).forEach(userId => {
              let x = data[userId];
              x.id = userId;
              if(x.id == u.user.uid) {
                commit("setUser", {email: u.user.email, uid: u.user.uid, tipo: x.tipo});
                dispatch('getGames');
                router.push({name: "Index"});
              }
            });
          });
          //commit("setUser", {email: u.user.email, uid: u.user.uid});
          //dispatch('getGames');
          //console.log(this.state.characters);
        })
        .catch((error) => {
          console.log(error.message);
          commit("setError",error.message);
        });
      } else {
        signOut(auth)
          .then(()=> {
            //vaciamos las variables para evitar errores raros
            commit("setUser", "");
            commit("setCharacters", []);
            commit("setGames", []);
            console.log("Sesión cerrada satisfactoriamente");
            router.push({name: "Login"});
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
      return true;
    },
    getUserSesion({ commit, dispatch }) {
      const auth = getAuth(app);
      onAuthStateChanged(auth, (u) => {
        if (u) {
          onValue(ref(database,"users"), (snapshot) => {
            var data = snapshot.val();
            Object.keys(data).forEach(userId => {
              let x = data[userId];
              x.id = userId;
              if(x.id == u.uid) {
                if(this.state.user == "") {
                  commit("setUser", {email: u.email, uid: u.uid, tipo: x.tipo});
                }
                dispatch('getGames');
                return {email: u.email, uid: u.uid, tipo: x.tipo};
              }
            });
          });
        }
      });
    },
    getGames({ commit }) {
      const list=[];
      const listUsers=[];
      var playerCharacter = [];
      if(this.state.user!="") {
        //asignamos user a algo que sea más fácil de llamar
        const usuarioActual = this.state.user;
        //buscamos users en la base de datos
        onValue(ref(database,"users"), (snapshot) => {
          var data = snapshot.val();
          // vaciamos
          for(var i=listUsers.length -1; i>=0; i--) {
            listUsers.splice(i,1);
          }
          Object.keys(data).forEach(gameId => {
            let x = data[gameId];
            x.id = gameId;
            listUsers.push(x);
          });
  
          //cargamos lista de users a mutation
          commit('setUsers', listUsers);
          
          //buscamos games en la base de datos
          onValue(ref(database,"games"), (snapshot) => {
            var data = snapshot.val();
            // vaciamos
            for(var i=list.length -1; i>=0; i--) {
              list.splice(i,1);
            }
            Object.keys(data).forEach(gameId => {
              let x = data[gameId];
              x.id = gameId;
              // Comprobamos si el usuario tiene algún personaje en esta partida, sólo si existen personajes en esa partida
              if(x.characters)
              Object.keys(x.characters).forEach(cid => {
                if(x.characters[cid].player == usuarioActual.uid) {
                  //añadimos ese personaje a la lista
                  playerCharacter.push(x.characters[cid])
                  //y le añadimos gameId y gameName a ese character, y el propio id del character
                  playerCharacter[playerCharacter.length -1].gameId = gameId;
                  playerCharacter[playerCharacter.length -1].gameName = x.name;
                  playerCharacter[playerCharacter.length -1].cId = cid;
                }
              });
              // SI el usuario es ADMIN, o MASTER/JUGADOR de esta partida, la añadimos a la lista
              if(usuarioActual.tipo == "admin" || (usuarioActual.tipo=="master" && usuarioActual.uid == x.owner)) {
                list.push(x);
              }
            });
    
            //cargamos lista de games a mutation
            commit('setGames', list);

            if(playerCharacter.length > 0) {
                commit('setCharacters',playerCharacter);
            }
  
            onValue(ref(database,"info"), (snapshot) => {
              var data = snapshot.val();
      
              //cargamos game info a mutation
              commit('setInfo', data);
  
              return true;
            });
          });
        });
      } else {
        console.error("NO TENEMOS USUARIO AL CARGAR PARTIDAS");
      }
    },
    createGame({ dispatch },gameName) {
      if(this.state.user!="") {
        const newGameKey = push(child(ref(database), 'games')).key;
        var newGame = {
          name: gameName,
          characters: [],
          date: '01/01/2022',
          lastDate: '01/01/2022',
          owner: this.state.user.uid,
          invitedPlayers: [],
          players: [],
          version: "1.0"
        };
        set(ref(database, "games/"+newGameKey), newGame);
        dispatch('getGames');
      }
    },
    createChar({ dispatch },gameId) {
      if(this.state.user!="" && gameId) {
        const newCharKey = push(child(ref(database), 'games/'+gameId+'/characters')).key;
        var newChar = {
          nombre: "DEFAULT",
          advanced: false,
          altura: "0",
          edad: "0",
          elemento: "0",
          grupo: "General",
          clase: "default",
          iniciativa: "0",
          movilidad: "0",
          nivel: "1",
          peso: "0",
          player: "",
          raza: "HUMANO",
          vision: "0",
          stats: {
            "vida": 0,
            "mana": 0,
            "energia": 0
          },
          currentStats: {
            "vida": 0,
            "mana": 0,
            "energia": 0
          },
          atributos: {
            "agilidad": 0,
            "astucia": 0,
            "destreza": 0,
            "fuerza": 0,
            "inteliencia": 0,
            "manipulacion": 0,
            "resistencia": 0,
            "sensitividad": 0,
            "velo": 0
          },
          habilidades : {
            c1 : {
              "actuar" : "0",
              "atletismo" : "0",
              "burocracia" : "0",
              "equitacion" : "0",
              "instinto" : "0",
              "instruir" : "0",
              "inventiva" : "0",
              "mineria" : "0",
              "natacion" : "0",
              "persuasion" : "0",
              "pilotar" : "0",
              "seguridad" : "0",
              "sociologia" : "0"
            },
            c2 : {
              "arcano" : "0",
              "armas distancia" : "0",
              "armas ligeras" : "0",
              "armas pesadas" : "0",
              "artes marciales" : "0",
              "determinacion" : "0",
              "esquivar" : "0",
              "lanzamiento" : "0",
              "presencia" : "0",
              "prestidigitacion" : "0",
              "ritual" : "0",
              "sigilo" : "0",
              "voluntad" : "0"
            },
            c3 : {
              "alquimia" : "0",
              "artesania" : "0",
              "biologia" : "0",
              "botanica" : "0",
              "cocina" : "0",
              "costura" : "0",
              "entomologia" : "0",
              "forja" : "0",
              "ingenieria" : "0",
              "medicina" : "0",
              "misticismo" : "0",
              "pesca" : "0",
              "quimica" : "0"
            }
          }
        };
        set(ref(database, 'games/'+gameId+"/characters/"+newCharKey), newChar);
        dispatch('getGames');
      }
    }
  },
  modules: {
  }
});