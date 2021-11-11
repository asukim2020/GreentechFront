import { login, uploadFcmToken } from '../api'

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
      async actionLogin({commit}, params) {
         try {
            const response = await login(params.id, params.pw)
            console.log(response);
            commit('setCompanyId', response.data.companyId)
            commit('setToken', response.data.jwtToken)
            // console.log(response.data.companyId);
            // console.log(response.data.jwtToken);
            return response.data.companyId
         } catch (err) {
            console.log(err);
            return err
         }
      },

      actionUploadFcmToken({commit}, params) {
         commit
         return uploadFcmToken(params.companyId, params.fcmToken)
            .then(({ data }) => console.log(data))
            .catch(e => console.log(e))
      },
   }
}

export default company