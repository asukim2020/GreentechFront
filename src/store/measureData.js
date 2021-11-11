import { getMeasureDataList, getLastDatas } from '../api'
// import dataLogger from './dataLogger'

const measureData = {
   namespaced: true,
   state: {
      data: Object,
      from: null,
      to: null,
      last: [],
      lastTime: String,
      count: 2,
      // dataLogger: null
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

      getUnitList() {
         let dataLogger = JSON.parse(localStorage.getItem('dataLogger'));
         if (dataLogger == null) {
            return []
         }
         if (dataLogger.unit == "") {
            return []
         }
         return dataLogger.unit.split(',')
      },

      getChannelNames() {
         let dataLogger = JSON.parse(localStorage.getItem('dataLogger'));
         if (dataLogger == null) {
            return []
         }
         if (dataLogger.channelName == "") {
            return []
         }
         return dataLogger.channelName.split(',')
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
         let count = datas.length

         let dataLogger = JSON.parse(localStorage.getItem('dataLogger'));
         console.log('dataLogger');
         console.log(dataLogger);
         var channelNames = []
         if (dataLogger != null
            && dataLogger.channelName != "") {
            channelNames = dataLogger.channelName.split(',')
         }

         var units = []
         if (dataLogger != null
            && dataLogger.unit != "") {
            units = dataLogger.unit.split(',')
         }

         for(let i = 0; i < count; i++) {
            var dataset = null
            if (state.data.datasets.length > 0) {
               dataset = state.data.datasets[i]
            }
            var isHidden = false
            if (i == count -1) isHidden = true

            var channelName = `CH${i+1}`
            if (i < channelNames.length) {
               channelName = channelNames[i]
            }

            var unit = ''
            if (i < units.length) {
               unit = units[i]
            }

            datasets.push(datasetObject(i, [], dataset, isHidden, channelName, unit))
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

      // setDataLogger(state, dataLogger) {
      //    state.dataLogger = dataLogger
      // },

      setLast(state, data) {
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

      // actionDataLogger({commit}, dataLoggerId) {
      //    return getDataLogger(dataLoggerId)
      //       .then(({ data }) => commit('setDataLogger', data))
      //       .catch(e => console.log(e))
      // },

      async actionMeasureLastData({commit}, dataLoggerId) {
         try {
            console.log('actionMeasureLastData');
            const response = await getLastDatas(dataLoggerId, 1)
            commit('setLast', response.data)
            return true
         } catch (err) {
            return err
         }
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

const datasetObject = (color, datas, dataset, isHidden, channelName, unit) => {
   let data = {
      label: channelName,
      fill: false,
      borderColor: chartColors[color % 10],
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      backgroundColor: chartColors[color % 10],
      pointBackgroundColor: chartColors[color % 10],
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: chartColors[color % 10],
      pointBorderWidth: 20,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 15,
      pointRadius: 4,
      data: datas,
      hidden: isHidden,
      unit: unit
   //  tension: 0.5,
   //  cubicInterpolationMode: 'default'
   }

   if (dataset != null) {
      data.hidden = dataset.hidden
   }
   return data
}


export default measureData