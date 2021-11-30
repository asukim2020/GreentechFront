import { getFileList } from '../api'

const fileList = {
   namespaced: true,
   state: {
      list: []
   },
   getters: {
      getFileList(state) {
         return state.list
      },
   },
   mutations: {
      setFileList(state, list) {
         for(let i=0; i<list.length; i++) {
            let index = list[i].time.indexOf(".")
            list[i].time = list[i].time.replaceAll('-', '/').replaceAll('T', ' ').substring(0, index)
         }
         state.list = list
      },
   },
   actions: {
      actionGetFileList({commit}, dataLoggerId) {
         return getFileList(dataLoggerId)
            .then(({ data }) => {
               console.log(data.data);
               commit('setFileList', data.data)
            })
            .catch(e => console.log(e))
      }
   }
}

export default fileList