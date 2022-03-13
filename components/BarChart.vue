<script>
import axios from 'axios';
import { Bar } from 'vue-chartjs'
import {mapGetters, mapActions } from 'vuex'

export default {
  extends: Bar,
  data(){
    return {
        chartdata: {
            labels: [],
            datasets: [
                {
                label: ['今月'],
                backgroundColor: '#bbbbbb',
                data: []
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxRotation: 0,
                    maxTicksLimit: 35
                  },
                  gridLines: {
                    display:false,
                  },
                },
              ],
              yAxes: [{
                  ticks: {
                    display: true,
                    suggestedMin: 0,
                    suggestedMax: 10,
                      stepSize: 1,
                      beginAtZero: true
                  }
              }]
          },
        }
    }
  },
  computed:{
    ...mapGetters('tasks',['tag','tags','tasksByTag','tasksByDay']),
  },
  methods:{
    ...mapActions('tasks',['createTagAction','toggleUnfinished','taskDeleteAction','getBarChart']),
  },
  async created () {
    await this.getBarChart()
    this.chartdata.labels = Object.keys(this.tasksByDay)
    this.chartdata.datasets[0].data = Object.values(this.tasksByDay)
    this.renderChart(this.chartdata, this.options);
  },
}
</script>
