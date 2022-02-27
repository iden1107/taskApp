<template>
<div>
  <v-card  class="mx-auto pt-4" max-width="344">
    <v-card-title class="text-center my-4 mx-auto">新規登録</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="お名前" v-model="name" outlined></v-text-field>
        <v-text-field label="メールアドレス" v-model="email" outlined></v-text-field>
        <v-text-field
          outlined
          label="パスワード"
          v-model="password"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show">
        </v-text-field>
        <v-text-field
          outlined
          label="パスワード(確認用)"
          v-model="password"
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2">
        </v-text-field>
        <v-btn  outlined tile @click="submit" class="my-4">登録する</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  </div>
</template>

<script>
export default {
  // middleware: 'unAuthenticated',
  data() {
    return {
      name:'',
      email: '',
      password: '',
      show: false,
      show2: false,
    }
  },
  methods: {
    async submit() {
      await this.$store.dispatch('auth/register', {
        name:this.name,
        email: this.email,
        password: this.password,
      })
      this.$router.push('/admin/login')
    },
  },
}
</script>
