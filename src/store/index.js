import { createStore } from 'vuex'

export default createStore({
  state: {
    games: [
        {
            id:1,
            nombre:"Equinox Exilio"
        },
        {
            id:2,
            nombre:"Equinox 02"
        }
    ]
  },
  getters: {
  },
  mutations: {
    setGames(state, games) {
        state.games = games;
    }
  },
  actions: {
  },
  modules: {
  }
})
