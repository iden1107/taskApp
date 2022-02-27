<template>
  <v-toolbar-items>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on"><v-icon>mdi-account</v-icon>{{authUser.name}}さん</v-btn>
      </template>
      <v-list class="pa-0">
        <v-list-item >
          <v-btn text @click="logout">ログアウト</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar-items>
</template>

<script>
export default {
  props:["authUser"],
  methods:{
    async logout() {
      await this.$store.dispatch('auth/logout', null)
      this.$router.push('/');
    },
  }
}
</script>

<style>

</style>
