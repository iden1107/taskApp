<template>
<v-container>
  <v-card  class="mx-auto pt-4" max-width="344">
    <v-card-title class="text-center my-4 mx-auto">ログイン</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="メールアドレス" v-model="email" outlined></v-text-field>
        <v-text-field
          outlined
          label="パスワード"
          v-model="password"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show">
        </v-text-field>
        <v-btn  outlined tile @click="submit" class="my-4">ログイン</v-btn>
      </v-form>
      <p>ゲストユーザー</p>
      <p>・guest@sample.com</p>
      <p>・password</p>
    </v-card-text>
  </v-card>
</v-container>
</template>

<script>
export default {
  // middleware: 'unAuthenticated',
  data() {
    return {
      email: '',
      password: '',
      show: false,
    }
  },
  methods: {
    async submit() {
      await this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password,
      })
      this.$router.push('/tags/all')
    },
  },
}
</script>
