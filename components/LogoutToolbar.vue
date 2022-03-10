<template>
  <v-toolbar-items>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>{{authUser.name}}さん
          <v-badge :content="unfinishedTask" color="red" offset-x="-4" v-show="show()">
          </v-badge>
        </v-btn>
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
import {mapGetters, mapActions } from 'vuex'
export default {
  props:["authUser"],
  methods:{
    async logout() {
      await this.$store.dispatch('auth/logout', null)
      this.$router.push('/');
    },
    show(){
      if(this.unfinishedTask > 0){
        return true
      }else{
        return false
      }
    }
  },
  computed:{
    ...mapGetters('tasks',['unfinishedTask'])
  },
}
</script>

<style>

</style>
