
<template>
  <v-row justify="center">

    <!-- モーダル -->
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <v-card>
        <v-card-title class="grey lighten-2">{{newTask.tag_id}}</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="newTask.title"
              :counter="10"
              label="タイトル"
              required
            ></v-text-field>
            <v-textarea
              v-model="newTask.memo"
              label="メモ"
            ></v-textarea>
            <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="newTask.deadline_date"
            label="期日"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="newTask.deadline_date"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">
            追加
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col cols="12" md="4" >
      <v-card class="logo pa-4 justify-center" style="position:sticky; top: 76px;">
        <v-card-title>タグ</v-card-title>
        <v-simple-table>
          <tbody>
            <tr style="cursor: pointer" >
              <td @click="selectTag('all')" :class="{'active': ($route.params.id === 'all')}" class="font-weight-bold">すべて</td>
            </tr>
            <tr v-for="tag in tags" :key="tag.id"  style="cursor: pointer">
              <!-- trタグはlinkにできないためクリックで遷移するメソッドを作った  またstyleでポインターに変更-->
              <td  @click="selectTag(tag.id)" :class="{'active': ($route.params.id == tag.id)}" class="font-weight-bold">{{ tag.title }}</td>
            </tr>
            <tr v-show="addTagButton">
              <td class="pa-0">
                <v-form @submit.prevent="$refs.textField.blur()">
                  <v-text-field  @blur="createTag" v-model="addTagField.title" ref="textField"></v-text-field>
                </v-form>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-card-actions class="pt-10">
          <v-btn fab @click="addTagButton = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>
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
        <div v-for="(task,key) in tasksByTag" :key="task.id">
          <div class="d-flex">
            <v-card-title class="font-weight-bold">{{key}}</v-card-title>
            <v-spacer></v-spacer>
            <v-btn fab x-small class="mt-5">
              <v-icon @click="openDialog(task[0].tags_id)">mdi-plus</v-icon>
            </v-btn>
          </div>
          <v-data-table
            :headers="headers"
            :items="task"
            :search="search"
            hide-default-footer
          ></v-data-table>
          <v-divider></v-divider>
        </div>
      </v-card>
    </v-col>

  </v-row>
</template>

<style scoped>
.active{
  background-color: #DDDDDD;
}
</style>

<script>
import {mapGetters, mapActions } from 'vuex'
export default {
  name:'tags_id',
  data () {
    return {
      addTagButton :false,
      dialog:false,
      newTask:{title:'',memo:'',tag_id:'',deadline_date:null,},
      addTagField: {
        title:'',
      },
      search: '',
      headers: [
        {
          text: '状態',
          align: 'start',
          sortable: false,
          value: 'status',
        },
        { text: 'タイトル', value: 'title' },
        { text: '期日', value: 'deadline_date' },
      ],
      items: [],
    }
  },
  computed:{
    ...mapGetters('tasks',['tags','tasksByTag']),
    ...mapGetters('auth',['authUser'])

  },
  methods:{
    ...mapActions('tasks',['getAllTasks','getTasksByTag','createTagAction']),
    async selectTag(tag_id){
      this.active = tag_id
      this.$router.push({ path: `/tags/${tag_id}` })
    },
    async createTag(){
      if(this.addTagField.title.trim() == ''){
        this.addTagButton = false
      }else{
        await this.createTagAction(this.addTagField)
        this.addTagField.title = ''
        this.addTagButton = false
      }
    },
    openDialog(arg){
      this.dialog = true
      this.newTask.tag_id = arg
      console.log(this.newTask)
    }
  },
  async created(){
    await this.getTasksByTag(this.$route.params.id)
  }
}

</script>
