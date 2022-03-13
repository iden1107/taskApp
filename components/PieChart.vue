<script>
import axios from 'axios';
import { Pie } from 'vue-chartjs'
import {mapGetters, mapActions } from 'vuex'

export default {
  extends: Pie,
  data(){
    return {
        chartdata: {
            labels: [],
            datasets: [
                {
                // labels: ['Red', 'Green', 'Blue'],
                backgroundColor: [],
                data: [20,20,10]
                }
            ]
        },

    }
  },
  computed:{
    ...mapGetters('tasks',['pieChartData']),
  },
  methods:{
    ...mapActions('tasks',['getPieChart']),
  },
  async created () {
    await this.getPieChart()
    this.chartdata.labels = this.pieChartData.map(obj => obj.tags_title);
    this.chartdata.datasets[0].data = this.pieChartData.map(obj => obj.count);
    this.chartdata.datasets[0].backgroundColor = this.pieChartData.map(obj => obj.color_label);
    this.renderChart(this.chartdata, this.options);
  },
}
</script>
