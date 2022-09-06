import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import pagination from './modules/pagination'

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  modules: {
    pagination
  }
})
