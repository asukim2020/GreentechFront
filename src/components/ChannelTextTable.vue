<template>
   <div class="jb-table">
    <div class="jb-table-row" v-for="(datas, i) in lastData" :key="datas">
      <div class="jb-table-cell" v-for="(data, j) in datas.datas" :key="data">
        <div class="ch-div">
          <p class="ch-label">{{data.name}}</p>
          <!-- TODO: - 2를 넘겨받은 props로 변경 -->
          <p class="ch-unit" v-if="unitList.length > cnt*i + j">{{unitList[cnt*i + j]}}</p>
          <!-- <p class="ch-unit">{{i + j}}</p> -->
        </div>
        <p class="ch-data">{{data.data}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
   name: 'LineChart',
   props: {
      data: null,
      unit: [],
      count: Number,
   },

   setup(props) {
      const lastData = computed({
         get: () => props.data,
      })

      const unitList = computed({
        get: () => props.unit
      })

      const cnt = computed({
        get: () => props.count
      }) 

      return {
         lastData,
         unitList,
         cnt,
      }
   }
}
</script>

<style scoped>
.jb-table {
  border-collapse:separate; 
  border-spacing: 1rem 1rem;
  display: table;
  width: 100%;
}
.jb-table-row {
  display: table-row;
}
.jb-table-cell {
  display: table-cell;
  height: 100px;
  border: 2px solid #82B1FF;
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
  color: #448AFF;
}

.ch-unit {
  margin: 0px;
  padding: 0px;
  position: relative;
  font-size: 12px;
  top: 0px;
  right: 6px;
  color: #448AFF;
}

.ch-data {
  height: 75px;
  margin: 0px;
  padding: 0px;
  text-align: center;
  font-size: 50px;
  color: #2979FF;
}
</style>