import { createStore } from 'vuex'
import router from '../router/index'

import app from '../firebase'
import { getDatabase, ref, onValue } from "firebase/database";
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
              //find user info and add it to the game
              /*listUsers.forEach(user => {
                if(user.id == x.owner) {
                  x.user = user
                }
              });*/
              // Comprobamos si el usuario es jugador, entonces buscamos su personaje en esta partida
              if(usuarioActual.tipo == "jugador") {
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
              }
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
    }
  },
  modules: {
  }
});