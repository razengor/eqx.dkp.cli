import { createStore } from 'vuex'

import app from '../firebase'
import { getDatabase, ref, onValue } from "firebase/database";

// Get a reference to the database service
const database = getDatabase(app);


export default createStore({
  state: {
    games: []
  },
  mutations: {
    setGames(state, list) {
        state.games = list;
        console.log(state.games);
    }
  },
  actions: {
    getGames({ commit }) {
      const list=[];

      onValue(ref(database,"games"), (snapshot) => {
        var data = snapshot.val();
        // vaciamos
        for(var i=list.length -1; i>=0; i--) {
          list.splice(i,1);
        }
        Object.keys(data).forEach(gameId => {
          let x = data[gameId];
          x.id = gameId;
          list.push(x);
        })

        //cargamos lista de games a mutation
        commit('setGames', list);
        return list;
      });
    }
  },
  modules: {
  }
});