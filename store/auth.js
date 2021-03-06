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
        .$post('login', { email, password })
        .catch((err) => {
          console.log(err)
        })
      commit('setAuthUser', response)
    })
  },
  async logout({ commit }) {
    await this.$axios
      .$post('logout',)
      .catch((err) => {
        console.log(err)
      })
    commit('setAuthUser', null)
  },
  async register({ commit }, { name, email, password }) {
    await this.$axios.get('/sanctum/csrf-cookie').then(async (res) => {
      await this.$axios
        .$post('register', { name, email, password })
        .catch((err) => {
          console.log(err)
        })
    })
  },
}
