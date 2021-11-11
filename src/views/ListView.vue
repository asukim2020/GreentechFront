<template>
   <div>
      <table>
         <tr>
            <th>id</th>
            <th>name</th>
         </tr>
         <tr v-for="item in getDataLoggerList" 
            :key="item.id"
            v-on:click="showDialog(item)">
            <td>{{ item.id }}</td>
            <td>{{ item.modelName }}</td>
         </tr> 
      </table>

      <select-list-modal 
      v-if="modal.isShow" 
      :header="modal.header"
      :list="modal.selectList"
      @item-click="itemClick"
      @dismiss="dismissAlert"
      >
      </select-list-modal>
   </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import { authErrorHandle } from '../error'
import SelectListModal from '../components/SelectListModal.vue'

const dataLogger = 'dataLogger'

export default {
   components: {
      SelectListModal
   },
   setup () {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()
      
      const modal = reactive({
         isShow: false,
         selectList: ['그래프', '텍스트'],
         seletedItem: Object,
         header: '선택'
      })

      const getDataLoggerList = computed(() => store.getters[`${dataLogger}/getDataLoggerList`])

      const itemClick = (index) => {
         switch(index) {
            case 0:
               router.push(`/graph/${modal.seletedItem.id}`)
               break
            case 1:
               router.push(`/analyze/${modal.seletedItem.id}`)
               break
         }
         localStorage.removeItem('dataLogger')
         localStorage.setItem('dataLogger', JSON.stringify(modal.seletedItem))
         modal.isShow = false
      }

      const showDialog = (item) => {
         modal.seletedItem = item
         modal.isShow = true
      }

      const dismissAlert = () => {
         modal.isShow = false
      }

      const initDataLoggerList = () => {
         let result = store.dispatch(`${dataLogger}/actionDataLoggerList`, route.params.id)
         authErrorHandle(result, router)
      }

      onMounted(() => {
         initDataLoggerList()
      })

      return {
         modal,
         initDataLoggerList,
         getDataLoggerList,
         itemClick,
         showDialog,
         dismissAlert
      }
   }
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th {
   font-weight: bold;
   color: #fff;
   background: #448AFF;
   text-align: center;
}

td {
  text-align: left;
  padding: 8px;
  text-align: center;
  color: #424242;
}

tr:nth-child(even) {
  background-color: #E3F2FD;
}
</style>