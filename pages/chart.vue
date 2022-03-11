<template>
  <v-row >
    <v-col cols="12" md="6">
      <v-card >
        <v-card-title>タスク</v-card-title>
        <v-card-text>
          <div id="chartContainer">
            <div :style="{width:barWidth}">
              <LineChart/>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card >
        <v-card-title>タスク</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<style >
#chartContainer{
  width: 100%;
  overflow: scroll;
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
  methods:{
    ...mapActions('tasks',['getTasksByDay']),
  },
  async mounted(){
    // 描画時に今日の棒グラフが右端になるように親要素から引き算してy軸に動かす量を決める
    // その分だけ親要素をy軸にスクロールさせる
    await this.getTasksByDay()
    const y =  this.slideWidth - document.querySelector(".v-card__text").clientWidth
    document.getElementById("chartContainer").scrollTo( y,0 )
  },
}
</script>
