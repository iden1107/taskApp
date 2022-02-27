<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-md-none"/>
      <v-toolbar-title to="/">
        <v-toolbar-items>
          <nuxt-link to="/" class="text-decoration-none black--text font-weight-bold text-md-h5">シンプルタスクアプリ</nuxt-link>
        </v-toolbar-items>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <LoginToolbar v-if="hoge" />
      <LogoutToolbar v-else :auth-user="authUser" />

    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<style>


</style>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: false,
      toolbar:false,
      items: [
        {
          icon: 'mdi-home',
          title: 'ホーム',
          to: '/'
        },
        {
          icon: 'mdi-login',
          title: 'ログイン',
          to: '/admin/login'
        },
        {
          icon: 'mdi-account',
          title: '新規会員登録',
          to: '/admin/register'
        },
      ],
      title: 'タイトル'
    }
  },
  computed:{
    ...mapGetters(
      'auth',['authUser']
    ),
    hoge(){
      return this.authUser ? false : true
    }
  }
}
</script>
