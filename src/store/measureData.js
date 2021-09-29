import { getMeasureDataList } from '../api'

const measureData = {
   namespaced: true,
   state: {
      data: Object,
      from: null,
      to: null,
      last: Object
   },
   getters: {
      getMeasureDataList(state) {
         return state.data
      },

      getFrom(state) {
         return state.from
      },

      getTo(state) {
         return state.to
      },

      getLastData(state) {
         return state.last
      }
   },
   mutations: {
      setMeasureDataList(state, data) {
         var labels = []
         var datasets = []

         console.log(data.data);
         var dataList = data.data.reverse()

         if (dataList.length == 0) return
         let datas = dataList[dataList.length-1].data.split(',')
         state.last = datas
         let count = datas.length

         for(let i = 0; i < count; i++) {
            datasets.push(datasetObject(i, []))
         }

         for (let i = 0; i < dataList.length; i++) {
            let datas = dataList[i].data.split(',')
            for(let j = 0; j < count; j++) {
               datasets[j].data.push(datas[j])
            }
            const format = dataList[i].time
            const date = new Date(format)
            // const str = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            const min = fillZero(2, String(date.getMinutes()))
            const sec = fillZero(2, String(date.getSeconds()))
            const str = `${date.getMonth() +1}.${date.getDate()} ${date.getHours()}:${min}:${sec}`
            labels.push(str)
         }
         state.data = {
            labels: labels,
            datasets: datasets
         }
      },

      setFrom(state, from) {
         state.from = from
      },

      setTo(state, to) {
         state.to = to
      }
   },
   actions: {
      actionMeasureDataList({commit, state}, dataLoggerId) {
         return getMeasureDataList(dataLoggerId, state.from, state.to)
            .then(({ data }) => commit('setMeasureDataList', data))
            .catch(e => console.log(e))
      }
   }
}

const fillZero = (width, str) => {
   return str.length >= width ? str:new Array(width-str.length+1).join('0')+str;
}

const chartColors = [
   '#00D1B2', '#209CEE', '#FF3860'
]

const datasetObject = (color, datas) => {
   return {
      label: `CH${color+1}`,
      fill: false,
      borderColor: chartColors[color],
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      pointBackgroundColor: chartColors[color],
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: chartColors[color],
      pointBorderWidth: 20,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 15,
      pointRadius: 4,
      data: datas,
   //  tension: 0.5,
   //  cubicInterpolationMode: 'default'
   }
}


export default measureData