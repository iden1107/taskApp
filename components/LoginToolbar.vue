<template>
  <v-toolbar-items>
    <v-btn text to="/admin/login" >
      <div class="d-sm-flex align-center text-center">
        <v-icon class="mx-auto">mdi-login</v-icon>
        <div class="align-self-center text-caption text-sm-body-1">ログイン</div>
      </div>
    </v-btn>
    <v-btn text to="/admin/register" >
      <div class="d-sm-flex align-center text-center">
        <v-icon class="mx-auto">mdi-account</v-icon>
        <div class="align-self-center text-caption text-sm-body-1">新規登録</div>
      </div>
    </v-btn>
  </v-toolbar-items>
</template>

<style scoped>
.container {
  padding: 0;
}
</style>

<script>
export default {
  props: ["authuser"],
};
</script>

<style>
</style>
