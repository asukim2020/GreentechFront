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
         .catch(function (error) {
            if (error.response) {
               // The request was made and the server responded with a status code
               // that falls out of the range of 2xx
               console.log(error.response.data);
               console.log(error.response.status);
               console.log(error.response.headers);
            } else if (error.request) {
               // The request was made but no response was received
               // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
               // http.ClientRequest in node.js
               console.log(error.request);
            } else {
               // Something happened in setting up the request that triggered an Error
               console.log('Error', error.message);
            }
            console.log(error.config);
         });
      },
   }
}

export default company