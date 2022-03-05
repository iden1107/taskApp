export const state = () => ({
  tags:null,
  tasksByTag:null,
})

export const getters = {
  tags:(state) => state.tags,
  tasksByTag: (state) => state.tasksByTag,
}

export const mutations = {
  setTasksByTag(state,res) {
    state.tags = res.tags
    // タグ別に分類する関数
    function groupBy(objectArray, property) {
      return objectArray.reduce(function (acc, obj) {
        let key = obj[property]
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(obj)
        return acc
      }, {})
    }
    // 全てのtasksを上記の関数で分類してstateに値を設定する
    const result = groupBy(res.tasks, 'tags_title')
    state.tasksByTag = result
  },
  setTags(state, res){
    state.tags = res
  }
}

export const actions = {
  async getTasksByTag({ commit },tag_id) {
    const response = await this.$axios
      .$get('api/tags/' + tag_id)
      .catch((err) => {
        console.log(err)
      })
      console.log(response)
    commit('setTasksByTag', response)
  },
  async createTagAction({ commit }, formData) {
    const response = await this.$axios
      .$post('api/tag/create',formData)
      .catch((err) => {
        console.log(err)
      })
    commit('setTags', response)
  },
}
