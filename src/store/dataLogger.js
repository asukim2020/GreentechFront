import { getDataLoggers } from '../api'

const dataLogger = {
   namespaced: true,
   state: {
      list: []
   },
   getters: {
      getDataLoggerList(state) {
         return state.list
      }
   },
   mutations: {
      setDataLoggerList(state, list) {
         state.list = list
      }
   },
   actions: {
      actionDataLoggerList({commit}, companyId) {
         return getDataLoggers(companyId)
         .then(({ data }) => commit('setDataLoggerList', data))
         .catch(e => console.log(e.response))
      }
   }
}

export default dataLogger