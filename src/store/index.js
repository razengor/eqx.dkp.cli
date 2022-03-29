import { createStore } from 'vuex'

import app from '../firebase'
import { getDatabase, ref, onValue } from "firebase/database";

// Get a reference to the database service
const database = getDatabase(app);


export default createStore({
  state: {
    games: [],
    users: []
  },
  mutations: {
    setGames(state, list) {
      state.games = list;
      //console.log(state.games);
    },
    setUsers(state, list) {
      state.users = list;
      //console.log(state.users);
    }
  },
  actions: {
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
          return true;
        });
      });
    }

  },
  modules: {
  }
});