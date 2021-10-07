<template>
   <div>
      <table>
         <tr>
            <th>id</th>
            <th>name</th>
         </tr>
         <tr v-for="item in getDataLoggerList" 
            :key="item.id"
            v-on:click="moveMeasurePage(item.id)">
            <td>{{ item.id }}</td>
            <td>{{ item.modelName }}</td>
         </tr> 
      </table>
   </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import { authErrorHandle } from '../error'
const dataLogger = 'dataLogger'

export default {
   setup () {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()
      
      const getDataLoggerList = computed(() => store.getters[`${dataLogger}/getDataLoggerList`])

      const initDataLoggerList = () => {
         let result = store.dispatch(`${dataLogger}/actionDataLoggerList`, route.params.id)
         authErrorHandle(result, router)
      }

      const moveMeasurePage = (id) => {
         router.push(`/analyze/${id}`)
      }

      onMounted(() => {
         initDataLoggerList()
      })

      return {
         initDataLoggerList,
         getDataLoggerList,
         moveMeasurePage
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