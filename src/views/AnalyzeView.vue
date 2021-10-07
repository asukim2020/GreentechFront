<template>
<div>
  <channel-text-table 
  :data="getLastData"
  :unit="getUnitList"
  :count="getCount"/>
  <!-- <select-period 
  class="hide"
    :from="getFrom"
    :to="getTo"
    @set-from="setFrom"
    @set-to="setTo"
    @submit-click="submit"
  ></select-period>
  <div>
    <line-chart class="hide" :data="getDataList" @reload-icon-click="updateDataList"/>
  </div> -->
  
</div>
</template>

<script>
// import LineChart from '../components/Charts/LineChart'
// import SelectPeriod from '../components/SelectPeriod.vue'
import ChannelTextTable from '../components/ChannelTextTable.vue'
import { onMounted, computed } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import { authErrorHandle } from '../error'
const measureData = 'measureData'

export default {
  components: {
    // LineChart,
    // SelectPeriod,
    ChannelTextTable
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    
    const getUnitList = computed(() => store.getters[`${measureData}/getUnitList`])
    const getCount = computed(() => store.getters[`${measureData}/getCount`])
    const getDataList = computed(() => store.getters[`${measureData}/getMeasureDataList`])
    const getFrom = computed(() => store.getters[`${measureData}/getFrom`])
    const getTo = computed(() => store.getters[`${measureData}/getTo`])
    const getLastData = computed(() => store.getters[`${measureData}/getLastData`])

    const updateDataList = () => {
      let result = store.dispatch(`${measureData}/actionMeasureDataList`, route.params.id)
      authErrorHandle(result, router)
    }

    const updateDataLogger = () => {
      store.dispatch(`${measureData}/actionDataLogger`, route.params.id)
    }

    onMounted(() => {
      updateDataList()
      updateDataLogger()
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
      getUnitList,
      getCount,
      updateDataList,
      getDataList,
      getFrom,
      getTo,
      getLastData,
      setFrom,
      setTo,
      submit
    }
  }
}
</script>

<style scoped>
@import '../assets/css/index.css';

.hide {
    visibility: hidden !important;
}
</style>