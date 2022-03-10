export const state = () => ({
  tag:null,
  tags:null,
  tasksByTag:null,
  unfinishedTask:0,
})

export const getters = {
  tag:(state) => state.tag,
  tags:(state) => state.tags,
  tasksByTag: (state) => state.tasksByTag,
  unfinishedTask: (state) => state.unfinishedTask,
}

export const mutations = {
  setTasksByTag(state,res) {
    if (!res.tag.length){
      state.tag = 'すべて'
    }else{
      state.tag = res.tag[0].title
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
  }
}


export const actions = {
  async getTasksByTag({ commit },tag_id) {
    const res = await this.$axios
      .$get('api/tags/' + tag_id)
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

}
