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
    error: ""
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
    }
  },
  actions: {
    iniciarSesion({ commit }, user) {
      const auth = getAuth(app);
      if (user!=null) {
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then((u) => {
          //console.log(u.user);
          commit("setUser", {email: u.user.email, uid: u.user.uid});
          router.push({name: "Index"});
        })
        .catch((error) => {
          console.log(error.message);
          commit("setError",error.message);
        });
      } else {
        signOut(auth)
          .then(()=> {
            console.log("Sesión cerrada satisfactoriamente");
            router.push({name: "Login"});
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },
    getUserSesion({ commit }) {
      if(this.state.user == "") {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (u) => {
          if (u) {
            commit("setUser", {email: u.email, uid: u.uid});
          }
        });
      }
    },
    getGames({ commit }) {
      const list=[];
      const listUsers=[];
      
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
            listUsers.forEach(user => {
              if(user.id == x.owner) {
                x.user = user
              }
            });

            list.push(x);
          });
  
          //cargamos lista de games a mutation
          commit('setGames', list);

          onValue(ref(database,"info"), (snapshot) => {
            var data = snapshot.val();
    
            //cargamos game info a mutation
            commit('setInfo', data);

            return true;
          });
        });
      });
    }
  },
  modules: {
  }
});