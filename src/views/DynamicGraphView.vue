<template>
   <div>
      <line-chart 
      :data="getData"
      @reload-icon-click="updateDataList"/>
   </div>
</template>

<script>
import LineChart from '../components/Charts/LineChart'
import { useRoute } from 'vue-router'
import { useStore } from "vuex"
import { onMounted, computed } from 'vue'

const dynamicFile = 'dynamicFile'

export default {
   components: {
    LineChart,
  },
   setup() {
      const store = useStore()
      const route = useRoute()

      const getData = computed(() => store.getters[`${dynamicFile}/getData`])

      onMounted(() => {
         console.log('onMounted');
         console.log(route.params.url);
         store.dispatch(`${dynamicFile}/actionDynamicFile`, route.params.url)
      })

      const updateDataList = () => {
         console.log('update');
         // let result = store.dispatch(`${measureData}/actionMeasureDataList`, route.params.id)
         // authErrorHandle(result, router)
      }

      const getUrl = computed({
         get: () => route.params.url,
      })

      return {
         getUrl,
         getData,
         updateDataList
      }
   }
}
</script>

<style>

</style>