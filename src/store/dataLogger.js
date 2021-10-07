import { getDataLoggers } from '../api'

const dataLogger = {
   namespaced: true,
   state: {
      list: [],
   },
   getters: {
      getDataLoggerList(state) {
         return state.list
      },
   },
   mutations: {
      setDataLoggerList(state, list) {
         state.list = list
      },
   },
   actions: {
      async actionDataLoggerList({commit}, companyId) {
         try {
            const response = await getDataLoggers(companyId)
            commit('setDataLoggerList', response.data)
            console.log(response.data);
            return true
         } catch (err) {
            return err
         }
      }
   }
}

export default dataLogger