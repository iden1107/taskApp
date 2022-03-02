
<template>
  <v-row justify="center">


    <v-col cols="12" md="4">
      <v-card class="logo pa-4 justify-center">
        <v-card-title>タグ</v-card-title>
        <v-simple-table>
          <tbody>
            <tr style="cursor: pointer" >
              <td @click="selectTag('all')" :class="{'active': ($route.params.id === 'all')}">すべて</td>
            </tr>
            <tr v-for="tag in tags" :key="tag.id"  style="cursor: pointer">
              <!-- trタグはlinkにできないためクリックで遷移するメソッドを作った  またstyleでポインターに変更-->
              <td  @click="selectTag(tag.id)" :class="{'active': ($route.params.id == tag.id)}">{{ tag.title }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-col>


    <v-col cols="12"  md="8">
      <v-card class="pa-4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="検索"
          single-line
          hide-details
        ></v-text-field>

        <div v-for="task in tasksByTag" :key="task.id">
          <v-card-title>{{task[0].tags_title}}</v-card-title>
            <v-data-table
              :headers="headers"
              :items="task"
              :search="search"
              hide-default-footer
            ></v-data-table>
        </div>

      </v-card>
    </v-col>

  </v-row>
</template>

<style scoped>
.active{
  color:red;
}
</style>

<script>
import {mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      editData:null,
      search: '',
      headers: [
        {
          text: '状態',
          align: 'start',
          sortable: false,
          value: 'status',
        },
        { text: 'リスト', value: 'title' },
        { text: '期日', value: 'deadline_date' },
      ],
      items: [],
    }
  },
  computed:{
    ...mapGetters('tasks',['tags','tasks','tasksByTag'])

  },
  methods:{
    async selectTag(tag_id){
      this.active = tag_id
      this.$router.push({ path: `/tags/${tag_id}` })
    },
    ...mapActions('tasks',['getAllTasks','getTasksByTag'])
  },
  async created(){
    await this.getTasksByTag(this.$route.params.id)
  }
}

</script>
