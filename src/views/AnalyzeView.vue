<template>
<div>
  <div class="jb-table">
    <div class="jb-table-row" v-for="datas in getLastData" :key="datas">
      <div class="jb-table-cell" v-for="data in datas.datas" :key="data">
        <div class="ch-div">
          <p class="ch-label">{{data.name}}</p>
          <p class="ch-unit">(unit)</p>
        </div>
        <p class="ch-data">{{data.data}}</p>
      </div>
    </div>
  </div>

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
import { onMounted, computed } from 'vue'
import { useStore } from "vuex"
import { useRoute } from 'vue-router'
const measureData = 'measureData'

export default {
  components: {
    // LineChart,
    // SelectPeriod
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    
    const getDataList = computed(() => store.getters[`${measureData}/getMeasureDataList`])
    const getFrom = computed(() => store.getters[`${measureData}/getFrom`])
    const getTo = computed(() => store.getters[`${measureData}/getTo`])
    const getLastData = computed(() => store.getters[`${measureData}/getLastData`])

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

.jb-table {
  border-collapse:separate; 
  border-spacing: 0.5rem 0.5rem;
  display: table;
  width: 100%;
}
.jb-table-row {
  display: table-row;
}
.jb-table-cell {
  display: table-cell;
  height: 100px;
  border: 2px solid #dddddd;
}

.ch-div {
  height: 25px; 
  display: flex; 
  justify-content: space-between; 
  align-items:center;
}

.ch-label {
  margin: 0px;
  padding: 0px;
  position: relative;
  font-size: 12px;
  top: 0px;
  left: 6px;
}

.ch-unit {
  margin: 0px;
  padding: 0px;
  position: relative;
  font-size: 12px;
  top: 0px;
  right: 6px;
}

.ch-data {
  height: 75px;
  margin: 0px;
  padding: 0px;
  text-align: center;
  font-size: 50px;
}
</style>