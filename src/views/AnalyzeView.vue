<template>
<div>
  <select-period 
    :from="getFrom"
    :to="getTo"
    @set-from="setFrom"
    @set-to="setTo"
    @submit-click="submit"
  ></select-period>
  <div>
    <line-chart :data="getDataList" @reload-icon-click="updateDataList"/>
  </div>
</div>
</template>

<script>
import LineChart from '../components/Charts/LineChart'
import SelectPeriod from '../components/SelectPeriod.vue'
import { onMounted, computed } from 'vue'
import { useStore } from "vuex"
import { useRoute } from 'vue-router'
const measureData = 'measureData'

export default {
  components: {
    LineChart,
    SelectPeriod
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    
    const getDataList = computed(() => store.getters[`${measureData}/getMeasureDataList`])
    const getFrom = computed(() => store.getters[`${measureData}/getFrom`])
    const getTo = computed(() => store.getters[`${measureData}/getTo`])

    const updateDataList = () => {
      store.dispatch(`${measureData}/actionMeasureDataList`, route.params.id)
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

<style scoped>
@import '../assets/css/index.css'
</style>