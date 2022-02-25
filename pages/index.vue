<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
    <p>{{posts[0]}}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  methods:{

  },
  async asyncData({ $axios }) {
			// 取得先のURL
			const url = "https://jsonplaceholder.typicode.com/users";
			// リクエスト（Get）
			const response = await $axios.$get(url);
			// 配列で返ってくるのでJSONにして返却
			return {
				posts: response
			};
		}
}
</script>
