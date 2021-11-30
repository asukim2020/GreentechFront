<template>
  <div>
      <table>
         <tr>
            <th>type</th>
            <th>time</th>
         </tr>
         <tr v-for="item in getFileList" 
            :key="item.time"
            v-on:click="itemClick(item)">
            <td>{{ item.type }}</td>
            <td>{{ item.time }}</td>
         </tr> 
      </table>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from "vuex"
import { useRoute, useRouter } from 'vue-router'

const fileList = 'fileList'

export default {
   setup () {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()

      const getFileList = computed(() => store.getters[`${fileList}/getFileList`])

      const itemClick = (item) => {
         router.push({
            name: 'dynamic',
            params: { 
               url: item.url,
            }
         })
      }

      onMounted(() => {
         let dataLoggerId = route.params.id
         store.dispatch(`${fileList}/actionGetFileList`, dataLoggerId)
      })

      return {
         getFileList,
         itemClick
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