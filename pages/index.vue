<template>
  <div>
    <header>
      <div class="tentativeImage">
        <v-container
          class="d-flex align-center justify-center header-container"
        >
          <div class="text-center">
            <h1>タスクアプリ</h1>
            <p class="mt-4">グラフ機能のついたシンプルなタスク管理アプリです</p>
          </div>
        </v-container>
      </div>
    </header>

    <section class="about">
      <v-container class="text-center">
        <h2>このサイトについて</h2>
        <p class="mt-4">このサイトはポートフォリオのデモアプリケーションです</p>
        <p>画像は無料のデザインツール<a href="https://www.design-ac.net/">「デザインAC」</a>より</p>
        <p>SVGロゴはフリーアイコン素材<a href="https://icons8.jp/">「icon8」</a>より</p>
        <p>アイコンは<a href="https://materialdesignicons.com/">「Material Design Icons」</a>より使用しました</p>
      </v-container>
    </section>

    <section class="technology text-center">
      <v-container>
        <h2 class="text-center">使用言語</h2>
        <h3 class="pt-3">フロントエンド</h3>
        <v-row justify="center">
          <v-col cols="6" sm="4">
            <v-img :src="require('@/assets/icons8-html-5.svg')" width="100px" class="mx-auto"></v-img>
            <p>html<br></p>
          </v-col>
          <v-col cols="6" sm="4">
            <v-img :src="require('@/assets/icons8-css3.svg')" width="100px" class="mx-auto"></v-img>
            <p>css<br></p>
          </v-col>
          <v-col cols="6" sm="4">
            <v-img :src="require('@/assets/icons8-javascript.svg')" width="100px" class="mx-auto"></v-img>
            <p>javascript<br></p>
          </v-col>
          <v-col cols="6" sm="4">
            <v-img :src="require('@/assets/icons8-vue-js.svg')" width="100px" class="mx-auto"></v-img>
            <p>Vue<br>v2.6.14</p>
          </v-col>
          <v-col cols="6" sm="4">
            <v-img :src="require('@/assets/icons8-nuxt-js-a-free-and-open-source-web-application-framework-96.png')" width="100px" class="mx-auto"></v-img>
            <p>Nuxt<br>v2.15.8</p>
          </v-col>
          <v-col cols="6" sm="4">
            <v-img :src="require('@/assets/icons8-vuetify.svg')" width="100px" class="mx-auto"></v-img>
            <p>Vuetify<br>v1.12.3</p>
          </v-col>
        </v-row>
        <h3 class="pt-3">バックエンド</h3>
        <v-row>
          <v-spacer></v-spacer>
          <v-col  cols="6" sm="4">
            <v-img :src="require('@/assets/icons8-php-ロゴ.svg')" width="100px" class="mx-auto"></v-img>
            <p>php<br>v8.0</p>
          </v-col>
          <v-col  cols="6" sm="4">
            <v-img :src="require('@/assets/icons8-laravel-is-a-free,-open-source-php-web-framework.-96.png')" width="100px" class="mx-auto"></v-img>
            <p>Laravel<br>v9.2</p>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <h3 class="pt-3">データベース</h3>
        <v-row justify="center">
          <v-col cols="6" sm="4">
            <v-img :src="require('@/assets/icons8-mysql-ロゴ.svg')" width="100px" class="mx-auto"></v-img>
            <p>MySQL<br></p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="feature">
      <v-container class="text-center">
        <h2>特徴</h2>
        <v-row>
          <v-col cols="12" md="6">
            <h3 class="my-3">カラーラベリングと通知</h3>
            <ul class="text-left">
              <li>タグ別でカラーリングすることでタスクの分類を分かりやすく</li>
              <li>また期限の過ぎたタスクをアイコンで通知する機能も追加しました</li>
            </ul>
            <v-img :src="require('@/assets/2197397_s.jpg')" class="mx-auto"></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="my-3">グラフ表示</h3>
            <ul class="text-left">
              <li>今月のタスクをグラフで表示し日別でのタスクが一目で分かる仕様</li>
              <li>タグ別の完了したタスクの割合も表示</li>
            </ul>
            <v-img :src="require('@/assets/23310358_s.jpg')"  class="mx-auto"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<style scoped>
header {
  background-position: center;
  background-size: cover;
  background-image: url("~@/assets/bg.jpg");
  height: 50vh;
}
h2{
  display: inline-block;
  padding: 0 32px;
  border-bottom: 4px solid #BBB;

}
.tentativeImage {
  /* 背景画像の上にrgbaを置いて背景画像のみを透過させる */
  background: rgba(255, 255, 255, 0.3);
  height: 50vh;
}
.container {
  padding-top: 8vh;
  max-width: 900px;
  margin: 0 auto ;
}
.header-container {
  height: 100%;
}
</style>
<script>
export default {
  name: "IndexPage",
};
</script>
