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
const dataLogger = 'dataLogger'

export default {
   setup () {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()
      
      const getDataLoggerList = computed(() => store.getters[`${dataLogger}/getDataLoggerList`])

      const initDataLoggerList = () => {
         store.dispatch(`${dataLogger}/actionDataLoggerList`, route.params.id)
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

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>