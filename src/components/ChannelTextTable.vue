<template>
   <div class="jb-table">
    <div class="jb-table-row" v-for="datas in lastData" :key="datas">
      <div class="jb-table-cell" v-for="data in datas.datas" :key="data">
        <div class="ch-div">
          <p class="ch-label">{{data.name}}</p>
          <p class="ch-unit">(unit)</p>
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
      data: {
         datas: {
            name: String,
            data: String
         },
      }
   },

   setup(props) {
      const lastData = computed({
         get: () => props.data,
      })

      return {
         lastData
      }
   }
}
</script>

<style scoped>
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