export const actions = {
  async nuxtClientInit({ commit }, { req, app }) {
    await app.$axios
      .$get('/api/user')
      .then((authUser) => {
        commit('auth/setAuthUser', authUser)
      })
      .catch((err) => {
        console.log(err)
        commit('auth/setAuthUser', null)
      })
  },
}
