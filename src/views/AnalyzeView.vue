<template>
<div>
  <channel-text-table 
  :data="getLastData"
  :unit="getUnitList"
  :channel="getChannelNames"
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
  <div style="display:table; width: 100%;">
    <p @click="refresh">갱신시간 {{getLastDataTime}}</p>
  </div>
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
    const getChannelNames = computed(() => store.getters[`${measureData}/getChannelNames`])
    const getCount = computed(() => store.getters[`${measureData}/getCount`])
    const getDataList = computed(() => store.getters[`${measureData}/getMeasureDataList`])
    const getFrom = computed(() => store.getters[`${measureData}/getFrom`])
    const getTo = computed(() => store.getters[`${measureData}/getTo`])
    const getLastData = computed(() => store.getters[`${measureData}/getLastData`])
    const getLastDataTime = computed(() => store.getters[`${measureData}/getLastDataTime`])

    const updateDataList = () => {
      let result = store.dispatch(`${measureData}/actionMeasureDataList`, route.params.id)
      authErrorHandle(result, router)
    }

    const updateDataLogger = () => {
      store.dispatch(`${measureData}/actionDataLogger`, route.params.id)
    }

    const refresh = () => {
      router.go()
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
      getChannelNames,
      getCount,
      updateDataList,
      refresh,
      getDataList,
      getFrom,
      getTo,
      getLastData,
      getLastDataTime,
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

p {
  width: 100%;
  height: 1.8rem;
  line-height: 14px;
  margin: 0px;
  padding: 0px;
  text-align: center;
  background-color: #2979FF;
  color: white;
  font-weight: bold;
    display: table-cell;
  vertical-align: middle;
}
</style>