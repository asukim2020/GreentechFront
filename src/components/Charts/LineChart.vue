<template>
  <div class="root">
    <div class="card header">
      <div></div>
      <span class="reload" @click.prevent="reloadIconClick">
        <i class="fas fa-redo-alt"></i>
      </span>
    </div>
    <div style="height: 17.5rem">
      <canvas class="card chart" ref="canvas" />
    </div>
  </div>
</template>

<script>
import { ref, watch, computed, onMounted } from 'vue'
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js'

export default {
  name: 'LineChart',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  emits: ['reload-icon-click'],
  setup (props, {emit}) {
    const canvas = ref(null)

    let chart

    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip
    )

    onMounted(() => {
      chart = new Chart(canvas.value, {
        type: 'line',
        data: props.data,
        options: {
          animation: {
              duration: 0
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              display: true
            },
            x: {
              display: true
            }
          },
          plugins: {
            legend: {
              position: 'top',
              display: true,
              onClick: function (e, legendItem, legend) {
                Chart.defaults.plugins.legend.onClick(e, legendItem, legend)
                let i = legendItem.datasetIndex
                chart.data.datasets[i].hidden = !chart.isDatasetVisible(i)
              },
            }
          }
        }
      })
    })
    
    const chartData = computed(() => props.data)

    watch(chartData, data => {
      if (chart) {
        chart.data = data
        chart.update()
      }
    })

    const reloadIconClick = () => {
      emit('reload-icon-click')
    }

    return {
      canvas,
      reloadIconClick
    }
  }
}
</script>

<style scoped>
.root {
  margin: auto;
  height: 20rem;
  width: 95%;
  overflow: auto;
}
.header {
  padding: 0px;
  display: flex;
  height: 2.5rem;
  border-bottom: 0px;
  border-radius: 0.25rem 0.25rem 0rem 0rem;

  justify-content: space-between;
  align-items:center;
}

.reload {
  width: 10%;
  color: #202020;
  display:flex;
  justify-content:center;
}
i {
  
}
.chart {
  border-radius: 0rem 0rem 0.25rem 0.25rem;
}
</style>