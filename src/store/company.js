import { login } from '../api'

const company = {
   namespaced: true,
   state: {
      companyId: String,
      token: String
   },
   getters: {
      getJwtToken(state) {
         return state.token
      }
   },
   mutations: {
      setCompanyId(state, companyId) {
         state.companyId = companyId
      },
      setToken(state, token) {
         localStorage.setItem('user', JSON.stringify(token))
         state.token = token
      }
   },
   actions: {
      actionLogin({commit}, params) {
         console.log('actionLogin');
         return login(params.id, params.pw)
         .then(response => {
            commit('setCompanyId', response.data.companyId)
            commit('setToken', response.data.jwtToken)
            return new Promise(
               (resolve) => {
                  resolve(response.data.companyId)
               }
            )
         })
         .catch(e => console.log(e))
      },
   }
}

export default company