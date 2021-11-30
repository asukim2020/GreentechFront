import { getDynamicFile } from '../api'

const dynamicFile = {
   namespaced: true,
   state: {
      data: Object
   },
   getters: {
      getData(state) {
         return state.data
      }
   },
   mutations: {
      setData(state, file) {

         let string = file.replaceAll('\n', '').replaceAll('\r', '\n')
         let dataList = string.split('\n')

         var labels = []
         var datasets = []
         var channelCount = 0
         var diff = 0

         var weight = 1
         let count = 10000
         let totalCount = parseInt(dataList.length / count)
         if (totalCount > 1) {
            weight = totalCount
         }

         for (let i=0; i<dataList.length; i = i + weight) {
            var lineStr = dataList[i]

            if (isNaN(lineStr[0])) continue
            let list = lineStr.split(",")

            if (channelCount == 0) {
               var flag = true
               for (let i=0; i<list.length; i++) {
                  var str = list[i]
                  if (!isNaN(str)) {
                     if (flag) {
                        flag = false
                        continue
                     }
                     var dataset = null
                     if (state.data.datasets != undefined) {
                        dataset = state.data.datasets[channelCount]
                     }
                     var isHidden = true
                     if (channelCount == 0) isHidden = false

                     datasets.push(datasetObject(channelCount, [], dataset, isHidden))
                     channelCount = channelCount + 1
                  }
               }

               diff = list.length - channelCount
            }
            for (let i=0; i<list.length; i++) {
               if (i < diff) continue
               var num = list[i]
               datasets[i - diff].data.push(num)
            }

            let timeString = list[0]
            let index = timeString.indexOf(".")
            let time = timeString.replaceAll('-', '/').replaceAll('T', ' ').substring(0, index)
            labels.push(time)
         }

         state.data = {
            labels: labels,
            datasets: datasets
         }
      }
   },
   actions: {
      actionDynamicFile({commit}, url) {
         return getDynamicFile(url)
            .then(({ data }) => {
               commit('setData', data)
            })
            .catch(e => console.log(e))
      }
   }
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

const datasetObject = (color, datas, dataset, isHidden) => {
   let data = {
      label: `CH${color + 1}`,
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
   //  tension: 0.5,
   //  cubicInterpolationMode: 'default'
   }

   if (dataset != null) {
      data.hidden = dataset.hidden
   }
   return data
}


export default dynamicFile