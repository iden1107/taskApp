import moment from 'moment'

export const state = () => ({
  tag:null,
  tags:null,
  tasksByTag:null,
  tasksByDay:null,
  unfinishedTask:0,
  barWidth:null,
  slideWidth:null,
  pieChartData:null,
})

export const getters = {
  tag:(state) => state.tag,
  tags:(state) => state.tags,
  tasksByTag: (state) => state.tasksByTag,
  tasksByDay: (state) => state.tasksByDay,
  unfinishedTask: (state) => state.unfinishedTask,
  barWidth: (state) => state.barWidth,
  slideWidth: (state) => state.slideWidth,
  pieChartData: (state) => state.pieChartData,
}

export const mutations = {
  setTasksByTag(state,res) {
    if (!res.tag.length){
      state.tag = [{title:'すべて',color_label:null}]
    }else{
      state.tag = res.tag
    }
    state.tags = res.tags
    state.tasksByTag = res.tasks
  },
  setTags(state, res){
    state.tags = res
  },
  countUnfinished(state,res){
    state.unfinishedTask = res.countUnfinished.length
  },
  search(state, res){
    state.filterTask = res
  },
  setBarChart(state, res) {
    // 月初から月末までの日別タスク量オブジェクトを作成(初期値はどの日も0で一旦設定)
    const thisMonthDays = moment().endOf('month').format("D")
    const today = moment().format("D")
    let calendar = {}
    for (let number = 1; number <= thisMonthDays; number++) {
      calendar[number] = 0
    }
    // そのオブジェクトに完了した日付と完了したタスク量("unfinished = true"のカウント数)を上書き
    state.tasksByDay = Object.assign(calendar, res.tasks);
    // グラフの横幅を日数*50pxで設定,描画時に本日が右端になるようにスライドする量を設定
    state.barWidth = (thisMonthDays * 50).toString() + 'px'
    state.slideWidth = (Number(today) + 1 ) * 50
  },

  setPieChart(state,res){
    state.pieChartData = res
  }
}

export const actions = {

// タグ関連
  async createTagAction({ commit }, formData) {
    const newTag = await this.$axios
      .$post('api/tag/create',formData)
      .catch((err) => {
        console.log(err)
    })
    const res = await this.$axios
      .$get('api/tags/' + newTag.id)
      .catch((err) => {
        console.log(err)
    })
    commit('setTasksByTag', res)
    this.$router.push('/tags/' + newTag.id)
  },

  async updateTagAction({ commit }, formData) {
    await this.$axios
      .$post('api/tag/update/' + formData.id, formData)
      .catch((err) => {
        console.log(err)
    })
    const res = await this.$axios
      .$get('api/tags/' + formData.path )
      .catch((err) => {
        console.log(err)
    })
    commit('setTasksByTag', res)
    this.$router.push('/tags/' + formData.id)
  },

  async deleteTag({ commit }, formData) {
    await this.$axios
      .$post('api/tag/tagDelete/' + formData.id)
      .catch((err) => {
        console.log(err)
    })
    this.$router.push('/tags/all')
  },

// タスク関連
  async getTasksByTag({ commit }, tag_id) {
    const res = await this.$axios
      .$get('api/tags/' + tag_id)
      .catch((err) => {
        console.log(err)
      })
      //
      //
      //
      console.log(res)
      // 
    commit('setTasksByTag', res)
    // 未終了のカウント
    const resCount = await this.$axios
      .$get('api/task/countUnfinished')
      .catch((err) => {
        console.log(err)
      })
    commit('countUnfinished', resCount)
  },

  async addTask({ commit }, formData){
    await this.$axios
      .$post('api/task/create', formData)
      .catch((err) => {
        console.log(err)
      })
    const res = await this.$axios
      .$get('api/tags/' + formData.path)
      .catch((err) => {
        console.log(err)
      })
    commit('setTasksByTag', res)
    // 未終了のカウント
    const resCount = await this.$axios
      .$get('api/task/countUnfinished')
      .catch((err) => {
        console.log(err)
      })
    commit('countUnfinished', resCount)
  },

  async updateTask({ commit }, formData) {
    await this.$axios
      .$post('api/task/update/' + formData.id, formData)
      .catch((err) => {
        console.log(err)
      })
    const res = await this.$axios
      .$get('api/tags/' + formData.path)
      .catch((err) => {
        console.log(err)
      })
    commit('setTasksByTag', res)
    // 未終了のカウント
    const resCount = await this.$axios
      .$get('api/task/countUnfinished')
      .catch((err) => {
        console.log(err)
      })
    commit('countUnfinished', resCount)
  },

  async toggleUnfinished({ commit }, formData) {
    await this.$axios
      .$post('api/task/toggleUnfinished/' + formData.id, formData)
      .catch((err) => {
        console.log(err)
      })
    const res = await this.$axios
      .$get('api/tags/' + formData.path)
      .catch((err) => {
        console.log(err)
      })
    commit('setTasksByTag', res)
    // 未終了のカウント
    const resCount = await this.$axios
      .$get('api/task/countUnfinished')
      .catch((err) => {
        console.log(err)
      })
    commit('countUnfinished', resCount)
  },

  async taskDeleteAction({ commit }, formData) {
    await this.$axios
      .$post('api/task/taskDelete/' + formData.id, formData)
      .catch((err) => {
        console.log(err)
      })
    const res = await this.$axios
      .$get('api/tags/' + formData.path)
      .catch((err) => {
        console.log(err)
      })
    commit('setTasksByTag', res)
    // 未終了のカウント
    const resCount = await this.$axios
      .$get('api/task/countUnfinished')
      .catch((err) => {
        console.log(err)
      })
    commit('countUnfinished', resCount)
  },


// グラフ関連
  async getBarChart({ commit }, ) {
    const res = await this.$axios
      .$get('api/chart/bar')
      .catch((err) => {
        console.log(err)
      })
    commit('setBarChart', res)
  },

  async getPieChart({ commit }, ) {
    const res = await this.$axios
      .$get('api/chart/pie')
      .catch((err) => {
        console.log(err)
      })
    commit('setPieChart', res)
  },

}
