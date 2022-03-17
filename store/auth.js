export const state = () => ({
  authUser: null,
})

export const getters = {
  authUser:(state) => state.authUser,
}

export const mutations = {
  setAuthUser(state, val) {
    state.authUser = val
  },
}

export const actions = {
  async login({ commit }, { email, password }) {
    await this.$axios.get('/sanctum/csrf-cookie' ).then(async (res) => {
      const response = await this.$axios
        .$post('api/login', { email, password })
        .catch((err) => {
          console.log(err)
        })
      commit('setAuthUser', response)
    })
    console.log('login成功')
  },
  async logout({ commit }) {
    await this.$axios
      .$post('api/logout',)
      .catch((err) => {
        console.log(err)
      })
    commit('setAuthUser', null)
    console.log('logout成功')
  },
  async register({ commit }, { name, email, password }) {
    await this.$axios.get('/sanctum/csrf-cookie').then(async (res) => {
      await this.$axios
        .$post('api/register', { name, email, password })
        .catch((err) => {
          console.log(err)
        })
    })
  },
}
