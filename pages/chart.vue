<template>
<v-container>
  <v-row >

    <v-tabs color="#999999"  class="d-sm-none d-md-block mb-4">
      <v-tab nuxt to="/tags/all">タスク一覧</v-tab>
      <v-tab nuxt to="/chart">タスクグラフ</v-tab>
    </v-tabs>

    <v-col cols="12" md="6">
      <v-card >
        <v-card-title>今月の完了タスク数
        </v-card-title>
        <v-card-text>
          <div id="barChartContainer">
            <div :style="{width:barWidth}">
              <BarChart/>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6">
      <v-card >
        <v-card-title>今月のタグ別割合</v-card-title>
        <v-card-text>
          <PieChart/>
        </v-card-text>
      </v-card>
    </v-col>
    
  </v-row>
</v-container>
</template>

<style >
#barChartContainer{
  width: 100%;
  overflow: scroll;
}
#pie-chart{
  max-height: 400px;
  max-width: 400px;
  margin: auto;
}

</style>

<script>
import moment from 'moment'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'chart',
  computed:{
    ...mapGetters('tasks',['barWidth','slideWidth']),
  },
  async mounted(){
    // 描画時に今日の棒グラフが右端になるように親要素から引き算してy軸に動かす量を決める
    // その分だけ親要素をy軸にスクロールさせる
    const y =  this.slideWidth - document.querySelector(".v-card__text").clientWidth
    document.getElementById("barChartContainer").scrollTo( y,0 )
  },
}
</script>
