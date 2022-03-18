<template>
  <v-container>
    <v-card class="mx-auto pt-4" max-width="400">
      <v-card-title class="text-center my-4 mx-auto">ログイン</v-card-title>
      <v-card-text>
        <v-form>
          <ValidationObserver v-slot="{ invalid }">
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

            <v-btn
              outlined
              tile
              @click="submit"
              class="my-4"
              :disabled="invalid"
              >ログイン</v-btn
            >
          </ValidationObserver>
        </v-form>
        <br>
        <p>ゲストユーザー</p>
        <ul>
          <li>メールアドレス：guest@sample.com</li>
          <li>パスワード：password</li>
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: 'unAuthenticated',
  data() {
    return {
      email: "",
      password: "",
      show: false,
    };
  },
  methods: {
    async submit() {
      await this.$store.dispatch("auth/login", {
        email: this.email,
        password: this.password,
      });
      this.$router.push("/tags/all");
    },
  },
};
</script>
