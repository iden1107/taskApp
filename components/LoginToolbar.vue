<template>
  <v-toolbar-items>
    <v-btn to="/admin/login" text><v-icon>mdi-login</v-icon> ログイン</v-btn>
    <v-btn text to="/admin/register"><v-icon>mdi-account</v-icon>新規登録</v-btn>
  </v-toolbar-items>
</template>

<script>
export default {
  props:["authuser"]
}
</script>

<style>

</style>
