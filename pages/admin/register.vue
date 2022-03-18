<template>
  <v-container>
    <v-card class="mx-auto pt-4" max-width="400">
      <v-card-title class="text-center my-4 mx-auto">新規登録</v-card-title>
      <v-card-text>
        <v-form>
          <ValidationObserver v-slot="{ invalid }">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="お名前"
            >
              <v-text-field
                label="お名前"
                v-model="name"
                outlined
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email"
              name="メールアドレス"
            >
              <v-text-field
                label="メールアドレス"
                v-model="email"
                outlined
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|min:8"
              name="パスワード"
              vid="confirmationId"
            >
              <v-text-field
                outlined
                label="パスワード"
                v-model="password"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                :error-messages="errors"
              >
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|confirmed:confirmationId"
              name="パスワード"
            >
            <v-text-field
              outlined
              label="パスワード(確認用)"
              v-model="ConfirmationPassword"
              :type="show2 ? 'text' : 'password'"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              :error-messages="errors"
            >
            </v-text-field>
            </ValidationProvider>
            <v-btn
              outlined
              tile
              @click="submit"
              class="my-4"
              :disabled="invalid"
              >登録する</v-btn
            >
          </ValidationObserver>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
input {
  border-style: inset;
}
</style>

<script>
export default {
  middleware: 'unAuthenticated',
  data() {
    return {
      name: "",
      email: "",
      password: "",
      ConfirmationPassword: "",
      show: false,
      show2: false,
      value: "",
      confirmation: "",
    };
  },
  methods: {
    async submit() {
      await this.$store.dispatch("auth/register", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      this.$router.push("/admin/login");
    },
  },
};
</script>
