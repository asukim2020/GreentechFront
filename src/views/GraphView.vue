<template>
  <div>
      <select-period 
      class="hide"
      :from="getFrom"
      :to="getTo"
      @set-from="setFrom"
      @set-to="setTo"
      @submit-click="submit"
      ></select-period>
      <div>
         <line-chart class="hide" :data="getDataList" @reload-icon-click="updateDataList"/>
      </div>

      <table>
         <tr>
           <th></th>
           <th v-for="dataset in getDataList.datasets" :key="dataset.label">
             {{ dataset.label }}
           </th>
         </tr>
         <tr v-for="(item, index) in getDataList.labels" 
            :key="item.id">
            <td>{{ item }}</td>
            <td v-for="dataset in getDataList.datasets" :key="dataset.label">
              {{dataset.data[index]}}
            </td>
         </tr> 
      </table>
   </div>
</template>

<script>
import LineChart from '../components/Charts/LineChart'
import SelectPeriod from '../components/SelectPeriod.vue'
import { onMounted, computed } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import { authErrorHandle } from '../error'
const measureData = 'measureData'

export default {
  components: {
    LineChart,
    SelectPeriod,
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    
    const getDataList = computed(() => store.getters[`${measureData}/getMeasureDataList`])
    const getFrom = computed(() => store.getters[`${measureData}/getFrom`])
    const getTo = computed(() => store.getters[`${measureData}/getTo`])

    const updateDataList = () => {
      let result = store.dispatch(`${measureData}/actionMeasureDataList`, route.params.id)
      authErrorHandle(result, router)
    }

    onMounted(() => {
      updateDataList()
    })

    const setFrom = (from) => {
      store.commit(`${measureData}/setFrom`, from)
    }

    const setTo = (to) => {
      store.commit(`${measureData}/setTo`, to)
    }

    const submit = () => {
      updateDataList()
    }

    return {
      updateDataList,
      getDataList,
      getFrom,
      getTo,
      setFrom,
      setTo,
      submit
    }
  }
}
</script>

<style>
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
.hide {
    /* visibility: hidden !important; */
}
</style>