<template>
<div>
  <channel-text-table 
  :data="getLastData"
  :unit="getUnitList"
  :channel="getChannelNames"
  :count="getCount"/>
  <div style="display:table; width: 100%;">
    <p @click="refresh">갱신시간 {{getLastDataTime}}</p>
  </div>
</div>
</template>

<script>

import ChannelTextTable from '../components/ChannelTextTable.vue'
import { onMounted, computed } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from 'vue-router'
import { authErrorHandle } from '../error'
const measureData = 'measureData'

export default {
  components: {
    ChannelTextTable
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    
    const getUnitList = computed(() => store.getters[`${measureData}/getUnitList`])
    const getChannelNames = computed(() => store.getters[`${measureData}/getChannelNames`])
    const getCount = computed(() => store.getters[`${measureData}/getCount`])
    const getLastData = computed(() => store.getters[`${measureData}/getLastData`])
    const getLastDataTime = computed(() => store.getters[`${measureData}/getLastDataTime`])

    const updateDataList = () => {
      let result = store.dispatch(`${measureData}/actionMeasureLastData`, route.params.id)
      authErrorHandle(result, router)
    }

    const updateDataLogger = () => {
      // store.dispatch(`${measureData}/actionDataLogger`, route.params.id)
    }

    const refresh = () => {
      router.go()
    }

    onMounted(() => {
      updateDataList()
      updateDataLogger()
    })

    return {
      getUnitList,
      getChannelNames,
      getCount,
      updateDataList,
      refresh,
      getLastData,
      getLastDataTime,
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