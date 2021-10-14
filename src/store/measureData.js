import { getDataLogger, getMeasureDataList } from '../api'

const measureData = {
   namespaced: true,
   state: {
      data: Object,
      from: null,
      to: null,
      last: [],
      lastTime: String,
      count: 2,
      dataLogger: null
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
      },

      getCount(state) {
         return state.count
      },

      getUnitList(state) {
         if (state.dataLogger == null) {
            return []
         }
         if (state.dataLogger.unit == "") {
            return []
         }
         return state.dataLogger.unit.split(',')
      },

      getChannelNames(state) {
         if (state.dataLogger == null) {
            return []
         }
         if (state.dataLogger.channelName == "") {
            return []
         }
         return state.dataLogger.channelName.split(',')
      },

      getLastDataTime(state) {
         return state.lastTime
      }
   },
   mutations: {
      setMeasureDataList(state, data) {
         var labels = []
         var datasets = []

         var dataList = data.data.reverse()

         if (dataList.length == 0) return
         let datas = dataList[dataList.length-1].data.split(',')
         state.lastTime = mm_dd_hh_mm_ss(dataList[dataList.length-1].time)
         
         let lastDataList = []
         var saveDataList = []
         for(let i=0; i<datas.length; i++) {

            saveDataList.push({
               name: `CH${i+1}`,
               data: datas[i]
            })

            if(i % state.count == state.count - 1) {
               lastDataList.push({
                  datas: saveDataList
               })
               saveDataList = []
            }
         }

         if (saveDataList.length > 0) {
            lastDataList.push({
               datas: saveDataList
            })
            saveDataList = []
         }

         state.last = lastDataList
         let count = datas.length

         for(let i = 0; i < count; i++) {
            var dataset = null
            if (state.data.datasets.length > 0) {
               dataset = state.data.datasets[i]
            }
            datasets.push(datasetObject(i, [], dataset))
         }

         for (let i = 0; i < dataList.length; i++) {
            let datas = dataList[i].data.split(',')
            for(let j = 0; j < count; j++) {
               datasets[j].data.push(datas[j])
            }
            labels.push(mm_dd_hh_mm_ss(dataList[i].time))
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
      },

      setDataLogger(state, dataLogger) {
         state.dataLogger = dataLogger
      }
   },
   actions: {
      async actionMeasureDataList({commit, state}, dataLoggerId) {
         try {
            const response = await getMeasureDataList(dataLoggerId, state.from, state.to)
            commit('setMeasureDataList', response.data)
            return true
         } catch (err) {
            return err
         }
      },

      actionDataLogger({commit}, dataLoggerId) {
         return getDataLogger(dataLoggerId)
            .then(({ data }) => commit('setDataLogger', data))
            .catch(e => console.log(e))
      }
   }
}

const mm_dd_hh_mm_ss = (format) => {
   const date = new Date(format)
   // const str = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
   const min = fillZero(2, String(date.getMinutes()))
   const sec = fillZero(2, String(date.getSeconds()))
   const str = `${date.getMonth() +1}/${date.getDate()} ${date.getHours()}:${min}:${sec}`
   return str
}

const fillZero = (width, str) => {
   return str.length >= width ? str:new Array(width-str.length+1).join('0')+str;
}

const chartColors = [
   '#00D1B2', 
   '#209CEE', 
   '#FF3860', 
   '#7E57C2', 
   '#FFEB3B', 
   
   '#FF9800', 
   '#00BCD4', 
   '#9E9E9E',
   '#795548',
   '#3F51B5'
]

const datasetObject = (color, datas, dataset) => {
   let data = {
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
      hidden: false,
   //  tension: 0.5,
   //  cubicInterpolationMode: 'default'
   }

   if (dataset != null) {
      data.hidden = dataset.hidden
   }
   return data
}


export default measureData